import { useRouter } from "next/router";
import { useEffect, useCallback } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  perPage: number;
}

export const Pagination = ({
  currentPage,
  totalPages,
  perPage,
}: PaginationProps) => {
  const router = useRouter();

  const handlePageChange = useCallback(
    (newPage: number) => {
      const currentQuery = { ...router.query };
      currentQuery.page = newPage.toString();

      router.push({
        pathname: router.pathname,
        query: currentQuery,
      });
    },
    [router]
  );

  useEffect(() => {
    if (totalPages < perPage) {
      handlePageChange(1);
    }
  }, [totalPages, perPage]);

  const displayPages = 5;
  const halfDisplayPages = Math.floor(displayPages / 2);
  let startPage = currentPage - halfDisplayPages;
  if (startPage < 1) {
    startPage = 1;
  }

  let endPage = startPage + displayPages - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - displayPages + 1, 1);
  }

  return (
    <div className="flex gap-x-1 rounded-lg items-center">
      {currentPage > 1 && (
        <div
          onClick={() => handlePageChange(currentPage - 1)}
          className="bg-indigo-700 group px-4 py-2 rounded-lg text-white cursor-pointer flex justify-center items-center duration-150 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className="duration-150 transition-all group-hover:-translate-x-4"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.25 12C20.25 12.4142 19.9142 12.75 19.5 12.75L6.31066 12.75L11.7803 18.2197C12.0732 18.5126 12.0732 18.9874 11.7803 19.2803C11.4874 19.5732 11.0126 19.5732 10.7197 19.2803L3.96967 12.5303C3.67678 12.2374 3.67678 11.7626 3.96967 11.4697L10.7197 4.71967C11.0126 4.42678 11.4874 4.42678 11.7803 4.71967C12.0732 5.01256 12.0732 5.48744 11.7803 5.78033L6.31066 11.25L19.5 11.25C19.9142 11.25 20.25 11.5858 20.25 12Z"
              fill="currentColor"
            />
          </svg>
        </div>
      )}
      {totalPages > perPage
        ? Array.from({ length: displayPages }, (_, i) => startPage + i).map(
            (pageNumber) => (
              <div
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`${
                  currentPage === pageNumber
                    ? "bg-indigo-700 px-4 py-2 rounded-lg text-white cursor-pointer"
                    : "px-4 py-2 rounded-lg text-slate-300 cursor-pointer"
                }  duration-150 transition-all`}
              >
                {pageNumber}
              </div>
            )
          )
        : ""}

      {currentPage < totalPages && (
        <div
          onClick={() => handlePageChange(currentPage + 1)}
          className="bg-indigo-700 px-4 group py-2 rounded-lg text-white cursor-pointer flex justify-center items-center duration-150 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className="duration-150 transition-all group-hover:translate-x-4"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.75 12C3.75 11.5858 4.08579 11.25 4.5 11.25L17.6893 11.25L12.2197 5.78033C11.9268 5.48744 11.9268 5.01256 12.2197 4.71967C12.5126 4.42678 12.9874 4.42678 13.2803 4.71967L20.0303 11.4697C20.3232 11.7626 20.3232 12.2374 20.0303 12.5303L13.2803 19.2803C12.9874 19.5732 12.5126 19.5732 12.2197 19.2803C11.9268 18.9874 11.9268 18.5126 12.2197 18.2197L17.6893 12.75L4.5 12.75C4.08579 12.75 3.75 12.4142 3.75 12Z"
              fill="currentColor"
            />
          </svg>
        </div>
      )}
    </div>
  );
};
