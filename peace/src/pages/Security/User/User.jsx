import PageHeader from '@/components/PageHeader';
import Widget from '@/components/Widget';
import Table from '@/components/Table';

import { users } from './mock';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

export const columns = [
  {
    header: 'ID',
    accessorKey: 'username',
    cell: ({ id, getValue }) => (
      <Link key={id} to="#">
        {getValue()}
      </Link>
    ),
  },
  {
    header: '성명',
    accessorKey: 'name',
  },
  {
    header: '부서',
    accessorKey: 'department',
  },
  {
    header: '연락처',
    accessorKey: 'phone',
  },
  {
    header: 'Email',
    accessorKey: 'email',
  },
  {
    header: '권한',
    accessorKey: 'role',
  },
  {
    header: 'Actions',
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

function User() {
  return (
    <>
      <PageHeader steps={['Security', 'User']} />

      <Widget>
        <Widget.Header title="User" />
        <Widget.Body description="Desc" helpTo="#">
          <Table data={users} columns={columns} />
        </Widget.Body>
      </Widget>
    </>
  );
}

export default User;
