import { createColumnHelper } from '@tanstack/react-table';

import { Button, ButtonGroup, Form } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import Table from '@/components/Table';
import { attributes } from './mock';

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.accessor('key', {
    header: 'Key',
    cell: ({ getValue, row, table }) => {
      if (row.index + 1 >= table.getRowCount()) {
        return <Form.Control defaultValue={getValue()} />;
      }

      return getValue();
    },
    enableSorting: false,
  }),
  columnHelper.accessor('value', {
    header: 'Value',
    cell: (value) => <Form.Control defaultValue={value.getValue()} />,
    enableSorting: false,
  }),
  columnHelper.accessor('', {
    header: 'Actions',
    cell: ({ row, table }) => {
      if (row.index + 1 >= table.getRowCount()) {
        return (
          <ButtonGroup>
            <Button variant="secondary" size="sm">
              Add <FontAwesomeIcon icon={faPlusCircle} />
            </Button>
          </ButtonGroup>
        );
      }

      return (
        <ButtonGroup>
          <Button variant="secondary" size="sm">
            Delete <FontAwesomeIcon icon={faTrashCan} />
          </Button>
        </ButtonGroup>
      );
    },
    enableSorting: false,
  }),
];

function Attributes() {
  return <Table data={attributes} columns={columns} className="table-editable" />;
}

export default Attributes;
