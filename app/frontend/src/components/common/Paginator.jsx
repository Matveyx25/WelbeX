import React from 'react'

export const Paginator = ({pages, page, pressHandler}) => {
    let pagesArr = [];
    for (let i = 1; i <= pages; i++) {
        pagesArr.push(i);
    }

  return (
    <div className="pagination-wrapper">
        <ul>
            {pagesArr.map((_, index) => (
                <li key={index} onClick={() => pressHandler(index)} className={page === index ? 'active' : ''}>{index + 1}</li>
            ))}
        </ul>
    </div>
  )
}
