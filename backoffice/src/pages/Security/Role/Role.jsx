import PageHeader from '@/components/PageHeader';
import Widget from '@/components/Widget';

import { Tab, Tabs } from 'react-bootstrap';
import RoleList from './Tabs/List';
import AddRole from './Tabs/Add';

function Role() {
  return (
    <>
      <PageHeader steps={['Security', 'Role']} />

      <Widget>
        <Widget.Header title="Role" />
        <Widget.Body description="Desc" helpTo="#">
          <Tabs variant="tabs" defaultActiveKey="list">
            <Tab eventKey="list" title="List Roles">
              <RoleList />
            </Tab>

            <Tab eventKey="add" title="Add Role">
              <AddRole />
            </Tab>
          </Tabs>
        </Widget.Body>
      </Widget>
    </>
  );
}

export default Role;
