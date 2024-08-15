import PageHeader from '@/components/PageHeader';
import Widget from '@/components/Widget';
import Table from '@/components/Table';

import { roles } from './mock';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const columns = [
  {
    header: 'Role Name',
    accessorKey: 'roleName',
    cell: ({ id, getValue }) => (
      <Link key={id} to={getValue()}>
        {getValue()}
      </Link>
    ),
  },
  {
    header: 'Composite',
    accessorKey: 'composite',
  },
  {
    header: 'Description',
    accessorKey: 'description',
  },
  {
    header: 'Actions',
    size: 80,
    cell: () => (
      <ButtonGroup>
        <Button variant="success" size="sm">
          <FontAwesomeIcon icon={faPenToSquare} />
        </Button>
        <Button variant="danger" size="sm">
          <FontAwesomeIcon icon={faTrashCan} />
        </Button>
      </ButtonGroup>
    ),
  },
];

function Role() {
  return (
    <>
      <PageHeader steps={['Security', 'Role']} />

      <Widget>
        <Widget.Header title="Role" />
        <Widget.Body description="Desc" helpTo="#">
          <Table data={roles} columns={columns} />
        </Widget.Body>
      </Widget>
    </>
  );
}

export default Role;
