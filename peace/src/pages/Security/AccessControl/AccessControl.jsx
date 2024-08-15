import PageHeader from '@/components/PageHeader';
import Widget from '@/components/Widget';
import Table from '@/components/Table';
import { users } from '../User/mock';
import { Link } from 'react-router-dom';
import { Form, Stack } from 'react-bootstrap';

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
    cell: ({ row }) => (
      <Stack direction="horizontal" gap={3}>
        {['Discovery', 'Assessment', 'Migration', 'Infra 담당자', 'DB 담당자', 'Application 담당자', '관리자'].map(
          (role) => (
            <Stack key={`${role}-${row.original.id}`} className="flex-nowrap px-2 py-1 bg-secondary rounded-1">
              <Form.Check label={role} id={`${role}-${row.original.id}`} />
            </Stack>
          ),
        )}
      </Stack>
    ),
  },
];

function AccessControl() {
  return (
    <>
      <PageHeader steps={['Security', 'Access Control']} />

      <Widget>
        <Widget.Header title="Access Control" />
        <Widget.Body description="Desc" helpTo="#">
          <Table data={users} columns={columns} />
        </Widget.Body>
      </Widget>
    </>
  );
}

export default AccessControl;
