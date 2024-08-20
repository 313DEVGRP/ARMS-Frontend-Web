import { createColumnHelper } from '@tanstack/react-table';

import Table from '@/components/Table';

import { roles } from '../../mock';
import { Card, Col, Row } from 'react-bootstrap';
import RoleDetail from './Detail';

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.accessor('roleName', {
    header: 'Role Name',
  }),
  columnHelper.accessor('composite', {
    header: 'Composite',
  }),
  columnHelper.accessor('description', {
    header: 'Description',
  }),
];

function RoleList() {
  return (
    <Row>
      <Col xs={12} sm={6} md={5}>
        <Card body>
          <Table data={roles} columns={columns} />
        </Card>
      </Col>

      <Col xs={12} sm={6} md={7}>
        <RoleDetail />
      </Col>
    </Row>
  );
}

export default RoleList;
