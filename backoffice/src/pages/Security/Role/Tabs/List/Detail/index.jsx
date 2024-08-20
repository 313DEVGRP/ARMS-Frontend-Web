import { Tab, Tabs } from 'react-bootstrap';

import Table from '@/components/Table';
import Attributes from '@/components/Attributes';

import { users } from '@/pages/Security/User/mock';
import { columns } from '@/pages/Security/User/Tabs/List';
import DetailTab from './DetailTab';

function RoleDetail() {
  return (
    <Tabs variant="tabs" defaultActiveKey="details">
      <Tab eventKey="details" title="Details">
        <DetailTab />
      </Tab>

      <Tab eventKey="attributes" title="Attributes">
        <Attributes />
      </Tab>

      <Tab eventKey="members" title="Members">
        <Table data={users} columns={columns} />
      </Tab>
    </Tabs>
  );
}

export default RoleDetail;
