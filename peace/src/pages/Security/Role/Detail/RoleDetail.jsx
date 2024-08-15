import { Tab, Tabs } from 'react-bootstrap';

import PageHeader from '@/components/PageHeader';
import Widget from '@/components/Widget';
import Table from '@/components/Table';

import Attributes from '@/pages/Security/Group/Detail/Attributes';
import { users } from '@/pages/Security/User/mock';
import { columns } from '@/pages/Security/User/User';
import DetailTab from './DetailTab';
import { useParams } from 'react-router-dom';

function RoleDetail() {
  const { roleName } = useParams();

  return (
    <>
      <PageHeader steps={['Security', 'Role', roleName]} />

      <Widget>
        <Widget.Header title={roleName} />
        <Widget.Body>
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
        </Widget.Body>
      </Widget>
    </>
  );
}

export default RoleDetail;
