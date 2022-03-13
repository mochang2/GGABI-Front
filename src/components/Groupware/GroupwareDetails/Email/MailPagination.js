import React from "react"

import Pagination from "react-js-pagination"

// https://cotak.tistory.com/112 참고하기
// https://velog.io/@ksh4820/React-Pagination-%EA%B5%AC%ED%98%84 참고하기

const MailPagination = (props) => {

  return (
    <Pagination activePage={props.mailPage} itemsCountPerPage={props.itemsCountPerPage} 
    totalItemsCount={props.totalItemsCount} pageRangeDisplayed={9} 
    prevPageText={"‹"} nextPageText={"›"} onChange={props.handleMailPageChange} />
  )
}

export default MailPagination