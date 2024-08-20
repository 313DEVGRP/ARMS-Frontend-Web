import { Tabs, Tab } from 'react-bootstrap';

import PageHeader from '@/components/PageHeader';
import Widget from '@/components/Widget';

import UserList from './Tabs/List';
import AddUser from './Tabs/Add';
import InviteUser from './Tabs/Invite';

function User() {
  return (
    <>
      <PageHeader steps={['Security', 'User']} />

      <Widget>
        <Widget.Header title="User" />
        <Widget.Body description="Desc" helpTo="#">
          <Tabs variant="tabs" defaultActiveKey="list">
            <Tab eventKey="list" title="List Users">
              <UserList />
            </Tab>

            <Tab eventKey="add" title="Add User">
              <AddUser />
            </Tab>

            <Tab eventKey="invite" title="Invite Users">
              <InviteUser />
            </Tab>
          </Tabs>
        </Widget.Body>
      </Widget>
    </>
  );
}

export default User;
