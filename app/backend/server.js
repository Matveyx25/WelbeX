const { Client } = require('pg')

const http = require("http");
const url = require('url');
const host = 'localhost';
const port = 8000;

const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*', /* @dev First, read about security */
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
}

const client = new Client({
    user: 'test',
    host: 'localhost',
    database: 'matveystepanov',
    password: '12345',
    port: 5432,
})
client.connect()

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

const requestListener = function (req, res) {
    res.writeHead(200, headers);

    let page = 0;
    const queryObject = url.parse(req.url, true).query;
    let filterColumn = null;
    let filterCondition = null;
    let filterValue = null;

    if(typeof queryObject == "object"){
        if(queryObject.page) page = queryObject.page
        if(queryObject.filterColumn) filterColumn = queryObject.filterColumn
        if(queryObject.filterCondition) filterCondition = queryObject.filterCondition
        if(queryObject.filterValue) filterValue = queryObject.filterValue
    }

    const allowedColumns = ["name", "amount", "distance"]
    const allowedConditions = ["=", "<", ">", 'like']
    if(filterColumn && filterCondition && filterValue){
        if(!allowedColumns.includes(filterColumn)) {//проверка на совместимые значения
            res.writeHead(400)
            res.end(JSON.stringify({error: 'unsupported filter column'}));
            return 
        }
        if(!allowedConditions.includes(filterCondition)){//проверка на совместимые значения
            res.writeHead(400)
            res.end(JSON.stringify({error: 'unsupported filter condition'}));
            return 
        }
        if(filterColumn == 'name'){//проверка для условия содержит
            if(filterCondition == 'like'){
                filterValue = `'%${filterValue}%'`
            }else{
                filterValue = `'${filterValue}'`
            }
        }else{
            if(!isNumeric(filterValue)){
                res.writeHead(400)
                res.end(JSON.stringify({error: 'unsupported filter value'}));
                return 
            }
        }
    }

    const offset = page*5;
    const query = (filterColumn && filterCondition && filterValue) ? 
    `SELECT * FROM test where ${filterColumn} ${filterCondition} ${filterValue} limit 5 offset ${offset}` :
    `SELECT * FROM test limit 5 offset ${offset}`

    console.log(query);

    client.query(query, (err, resClient) => {
        if(err){
            res.end(JSON.stringify({error: err.message}));
        }else{
            client.query('SELECT count(*) FROM test', (errCount, resCount) => {
                if(errCount){
                    res.end(JSON.stringify({errorCount: errCount.message}));
                }else{
                    console.log(resClient);
                    res.end(JSON.stringify({data: resClient.rows, pages: Math.ceil(resCount.rows[0].count/5)}));
                }
            })
        }
    })
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

process.on('SIGINT', () => {
    server.close(() => {
        console.info('GRACEFULL shutdown.');  
        client.end()
    })
});