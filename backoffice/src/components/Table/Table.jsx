import { Table as BTable, Form, Stack } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

import { flexRender } from '@tanstack/react-table';
import Pagination from '@/components/Pagination';
import useTable from './useTable';

function Table({ data, columns, className }) {
  const { table, getPaginationProps } = useTable(data, columns);

  return (
    <Stack gap={2}>
      <Stack direction="horizontal" gap={4}>
        <Form.Select
          size="sm"
          className="width-100"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={uuidv4()} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </Form.Select>

        <Form.Control className="ms-auto mb-0 width-150" size="sm" type="search" placeholder="Search..." />
      </Stack>

      <BTable striped="columns" hover responsive className={className}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const sortIcon =
                  {
                    asc: 'sorting_asc',
                    desc: 'sorting_desc',
                  }[header.column.getIsSorted()] ?? 'sorting';

                return (
                  <th
                    className={header.column.getCanSort() ? `pe-6 ${sortIcon}` : ''}
                    key={header.id}
                    colSpan={header.colSpan}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={cell.column.className}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </BTable>

      <Stack direction="horizontal" className="justify-content-between align-items-center">
        <div>
          {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} -{' '}
          {Math.min(
            table.getState().pagination.pageIndex * table.getState().pagination.pageSize +
              table.getState().pagination.pageSize,
            table.getRowCount(),
          )}{' '}
          of {table.getRowCount().toLocaleString('ko-KR')}
        </div>

        <Pagination {...getPaginationProps()} />
      </Stack>
    </Stack>
  );
}

export default Table;
