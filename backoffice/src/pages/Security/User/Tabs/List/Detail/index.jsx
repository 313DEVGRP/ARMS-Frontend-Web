import { Tab, Tabs } from 'react-bootstrap';

import DetailTab from './DetailTab';
import Attributes from '@/components/Attributes';
import CredentialTab from './CredentialTab';
import RoleMappingTab from './RoleMappingTab';

function UserDetail() {
  return (
    <Tabs variant="tabs" defaultActiveKey="details">
      <Tab eventKey="details" title="Details">
        <DetailTab />
      </Tab>

      <Tab eventKey="attributes" title="Attributes">
        <Attributes />
      </Tab>

      <Tab eventKey="credentials" title="Credentials">
        <CredentialTab />
      </Tab>

      <Tab eventKey="role_mappings" title="Role Mappings">
        <RoleMappingTab />
      </Tab>

      <Tab eventKey="consents" title="Consents">
        <h5>Consents</h5>
      </Tab>

      <Tab eventKey="sessions" title="Sessions">
        <h5>Sessions</h5>
      </Tab>
    </Tabs>
  );
}

export default UserDetail;
