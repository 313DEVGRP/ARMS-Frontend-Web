import { v4 as uuidv4 } from 'uuid';

import { createColumnHelper } from '@tanstack/react-table';

import { Form } from 'react-bootstrap';

import PageHeader from '@/components/PageHeader';
import Widget from '@/components/Widget';
import Table from '@/components/Table';
import { users } from '@/pages/Security/User/mock';
import { roles } from '@/pages/Security/Role/mock';
import { columns as userColumns } from '@/pages/Security/User/Tabs/List';
import { columns as roleColumns } from '@/pages/Security/Role/Tabs/List';

const columnHelper = createColumnHelper();

export const acessColumns = [
  columnHelper.group({
    id: uuidv4(),
    columns: [
      columnHelper.accessor('view', {
        header: 'View',
        cell: () => <Form.Check />,
        enableSorting: false,
      }),
    ],
  }),
  columnHelper.group({
    header: 'Discovery',
    columns: [
      columnHelper.accessor('status', {
        header: 'Status',
        cell: () => <Form.Check />,
        enableSorting: false,
      }),
      columnHelper.accessor('host', {
        header: 'Host',
        cell: () => <Form.Check />,
        enableSorting: false,
      }),
      columnHelper.accessor('d_application', {
        header: 'Application',
        cell: () => <Form.Check />,
        enableSorting: false,
      }),
      columnHelper.accessor('d_database', {
        header: 'Database',
        cell: () => <Form.Check />,
        enableSorting: false,
      }),
      columnHelper.accessor('interface', {
        header: 'Interface',
        cell: () => <Form.Check />,
        enableSorting: false,
      }),
    ],
  }),
  columnHelper.group({
    header: 'Assessment',
    columns: [
      columnHelper.accessor('service', {
        header: 'Service 분류 분석',
        cell: () => <Form.Check />,
        enableSorting: false,
      }),
      columnHelper.accessor('interview', {
        header: 'Interview 질의 분석',
        cell: () => <Form.Check />,
        enableSorting: false,
      }),
      columnHelper.accessor('a_application', {
        header: 'Application 종합 진단',
        cell: () => <Form.Check />,
        enableSorting: false,
      }),
      columnHelper.accessor('a_database', {
        header: 'Database 종합 진단',
        cell: () => <Form.Check />,
        enableSorting: false,
      }),
      columnHelper.accessor('migration', {
        header: 'Migration 전략 수립',
        cell: () => <Form.Check />,
        enableSorting: false,
      }),
    ],
  }),
  columnHelper.group({
    header: 'Migration',
    columns: [
      columnHelper.accessor('wave', {
        header: '차수 관리',
        cell: () => <Form.Check />,
        enableSorting: false,
      }),
      columnHelper.accessor('man_month', {
        header: '공수 산정',
        cell: () => <Form.Check />,
        enableSorting: false,
      }),
    ],
  }),
];

function AccessControl() {
  return (
    <>
      <PageHeader steps={['Security', 'Access Control']} />

      <Widget>
        <Widget.Header title="User" />
        <Widget.Body description="HyperMig의 유저별 권한을 확인하고 수정합니다." helpTo="#">
          <Table
            data={users}
            columns={[
              columnHelper.group({
                id: uuidv4(),
                columns: userColumns,
              }),
              ...acessColumns,
            ]}
          />
        </Widget.Body>
      </Widget>

      <Widget>
        <Widget.Header title="Role" />
        <Widget.Body description="HyperMig의 Role별 권한을 확인하고 수정합니다." helpTo="#">
          <Table
            data={roles}
            columns={[
              columnHelper.group({
                id: uuidv4(),
                columns: roleColumns,
              }),
              ...acessColumns,
            ]}
          />
        </Widget.Body>
      </Widget>
    </>
  );
}

export default AccessControl;
