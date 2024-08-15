import Table from '@/components/Table';
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { attributes } from './mock';

export const columns = [
  {
    header: 'Key',
    accessorKey: 'key',
    cell: ({ getValue, row, table }) => {
      if (row.index + 1 >= table.getRowCount()) {
        return <Form.Control defaultValue={getValue()} />;
      }

      return getValue();
    },
  },
  {
    header: 'Value',
    accessorKey: 'value',
    cell: (value) => <Form.Control defaultValue={value.getValue()} />,
  },
  {
    header: 'Actions',
    cell: ({ row, table }) => {
      if (row.index + 1 >= table.getRowCount()) {
        return (
          <ButtonGroup>
            <Button variant="primary" size="sm">
              <FontAwesomeIcon icon={faPlusCircle} />
            </Button>
          </ButtonGroup>
        );
      }

      return (
        <ButtonGroup>
          <Button variant="danger" size="sm">
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
        </ButtonGroup>
      );
    },
  },
];

function Attributes() {
  return <Table data={attributes} columns={columns} className="table-editable" />;
}

export default Attributes;
