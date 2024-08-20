import { Card, Col, Row } from 'react-bootstrap';

import { createColumnHelper } from '@tanstack/react-table';

import Table from '@/components/Table';

import { users } from '../../mock';
import UserDetail from './Detail';

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.accessor('username', {
    header: 'ID',
  }),
  columnHelper.accessor('name', {
    header: '성명',
  }),
  columnHelper.accessor('department', {
    header: '부서',
  }),
  columnHelper.accessor('phone', {
    header: '연락처',
  }),
  columnHelper.accessor('email', {
    header: 'Email',
  }),
];

function UserList() {
  return (
    <Row>
      <Col xs={12} sm={6} md={5}>
        <Card body>
          <Table data={users} columns={columns} />
        </Card>
      </Col>

      <Col xs={12} sm={6} md={7}>
        <UserDetail />
      </Col>
    </Row>
  );
}

export default UserList;
