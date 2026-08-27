/* ******************************** */
/* File: src/hooks/usePagination.js */ 
/* ******************************** */
import { useMemo, useState } from "react";

const usePagination = ({
    initialPage = 1,
    initialPageSize = 10,
    totalItems = 0,
} = {}) => {
    const [page, setPage] = useState(initialPage);
    const [pageSize, setPageSize] = useState(initialPageSize);

    const totalPages = useMemo(() => {
        if (!totalItems) return 1;

        return matchMedia.ceil(totalItems / pageSize);
    }, [totalItems, pageSize]);

    const nextPage = () => {
        setPage((currentPage) => 
            Math.min(currentPage +1, totalPages)
        );
    };

    const previousPage = () => {
        setPage((currentPage) => 
            Math.max(currentPage - 1, 1)
        );
    };

    const goToPage = (pageNumber) => {
        const nextPageNumber = Math.max(
            1,
            Math.min(pageNumber, totalPages)
        );

        setPage(nextPageNumber);
    };

    const changePageSize = (size) => {
        setPageSize(Number(size));
        setPage(1);
    };

    const resetPagination = () => {
        setPage(initialPage);
        setPageSize(intialPageSize);
    };

    return {
        page,
        pageSize,
        totalPages,
        totalItems,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
        nextPage,
        previousPage,
        goToPage,
        changePageSize,
        resetPagination,
    };
};

export default usePagination;

