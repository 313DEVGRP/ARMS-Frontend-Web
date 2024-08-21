import PageHeader from '@/components/PageHeader';
import Widget from '@/components/Widget';

import UserList from './Tabs/List';

function User() {
  return (
    <>
      <PageHeader steps={['Security', 'User']} />

      <Widget>
        <Widget.Header title="User" />
        <Widget.Body description="Desc" helpTo="#">
          <UserList />
        </Widget.Body>
      </Widget>
    </>
  );
}

export default User;
