import axios from "axios";

const instance = axios.create({
    baseURL: 'http://welbex.parasource.tech'// base url
})

export const tablesAPI = {
    getTables(page) {//get all rows from api
        return instance.get(`/?page=${page}`)
    },
    getFiltered(page, column, condition, value){
        return instance.get(`/?page=${page}&filterColumn=${column}&filterCondition=${condition}&filterValue=${value}`)
    }
}