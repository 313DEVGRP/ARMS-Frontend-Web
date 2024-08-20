import { useCallback, useMemo, useState } from 'react';
import { getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';

function useTable(data, columns) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: { pagination },
  });

  const getPaginationProps = useCallback(
    (onClick, ...props) => ({
      pageIndex: table.getState().pagination.pageIndex,
      pageCount: table.getPageCount(),
      incrementPage: table.nextPage,
      canNextPage: table.getCanNextPage(),
      decrementPage: table.previousPage,
      canPrevPage: table.getCanPreviousPage(),
      onClick: (page) => {
        onClick && onClick();
        table.setPageIndex(page);
      },
      ...props,
    }),
    [table.nextPage, table.previousPage, pagination],
  );

  return useMemo(
    () => ({
      table,
      getPaginationProps,
    }),
    [table, getPaginationProps],
  );
}

export default useTable;
