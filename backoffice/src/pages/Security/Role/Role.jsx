import PageHeader from '@/components/PageHeader';
import Widget from '@/components/Widget';

import RoleList from './Tabs/List';

function Role() {
  return (
    <>
      <PageHeader steps={['Security', 'Role']} />

      <Widget>
        <Widget.Header title="Role" />
        <Widget.Body description="Desc" helpTo="#">
          <RoleList />
        </Widget.Body>
      </Widget>
    </>
  );
}

export default Role;
