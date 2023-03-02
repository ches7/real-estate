import React from "react";
import "./Pagination.css"

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage, minPageNumberLimit, maxPageNumberLimit, pageNumberLimit, handleNext, handlePrev }) => {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++){
        pageNumbers.push(i);
    }

//     let pageIncrement = null;
//   if (pageNumbers.length > maxPageNumberLimit) {
//     pageIncrement = <li className="page-item"><button className="page-link link-dark" onClick={handleNext}>&hellip;</button></li>;
//   }

//   let pageDecrement = null;
//   if (minPageNumberLimit >= 1) {
//     pageDecrement = <li className="page-item"><button className="page-link link-dark" onClick={handlePrev}>&hellip;</button></li>;
//   }

    
    const renderPageNumbers = pageNumbers.map((number) => {
        if (number < maxPageNumberLimit+1 && number > minPageNumberLimit){
            return (
                <li key={number} className="page-item">
                        <button onClick={() => {paginate(number)}} className={currentPage == number ? "page-link link-dark bg-dark text-white" : "page-link link-dark"}>
                            {number}
                        </button>
                </li>
            );
        } else {
            return null
        }
    });


    if(totalPosts === 0){
        return;
    }

    return (
        <div className="d-flex justify-content-center">
        <nav>
            <ul className="pagination">
                <li className="page-item"><button className="page-link link-dark" onClick={handlePrev}
                disabled={currentPage == pageNumbers[0]?true:false}
                >Prev</button></li>
                {/* {pageDecrement} */}
                {renderPageNumbers}
                {/* {pageIncrement} */}
                <li className="page-item"><button className="page-link link-dark" onClick={handleNext}
                disabled={currentPage == pageNumbers[pageNumbers.length - 1]?true:false}
                >Next</button></li>
            </ul>
        </nav>
        </div>
    )
}

export default Pagination;