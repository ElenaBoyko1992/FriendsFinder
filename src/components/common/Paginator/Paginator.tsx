import React, {useState} from "react";
import s from "./Paginator.module.css";
import leftArrow from "../../../assets/images/left-arrow-svgrepo-com.svg";
import leftGreyArrow from "../../../assets/images/left-gray-arrow-svgrepo-com.svg";
import rightArrow from "../../../assets/images/right-arrow-svgrepo-com.svg";
import rightGreyArrow from "../../../assets/images/right-gray-arrow-svgrepo-com.svg";

const Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize}: PaginatorType) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    return (
        <div className={s.paginatorWrapper}>
            <div className={s.paginator}>
                <button onClick={() => {
                    setPortionNumber(portionNumber - 1)
                }} className={s.button}><img src={portionNumber > 1 ? leftArrow : leftGreyArrow} alt=""/></button>

                {pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map((p) => {
                        return <span key={p}
                                     className={(currentPage === p) ? `${s.selectedPage} ${s.pageNumber}` : s.pageNumber}
                                     onClick={() => {
                                         onPageChanged(p)
                                     }}> {p} </span>
                    })
                }

                <button onClick={() => {
                    setPortionNumber(portionNumber + 1)
                }} className={s.button}><img src={portionCount > portionNumber ? rightArrow : rightGreyArrow} alt=""/>
                </button>
            </div>
        </div>

    )
}

export default Paginator

//types
type PaginatorType = {
    totalItemsCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    currentPage: number
    portionSize: number
}