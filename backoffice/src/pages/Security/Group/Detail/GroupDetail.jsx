import { Col, Form, InputGroup, Row, Tab, Tabs } from 'react-bootstrap';

import PageHeader from '@/components/PageHeader';
import Widget from '@/components/Widget';
import Table from '@/components/Table';
import RoleMapping from './RoleMapping';
import { users } from '@/pages/Security/User/mock';
import { columns } from '@/pages/Security/User/User';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import Attributes from './Attributes';
import { useParams } from 'react-router-dom';

function GroupDetail() {
  const { groupName } = useParams();

  return (
    <>
      <PageHeader steps={['Security', 'Group', groupName]} />

      <Widget>
        <Widget.Header title={groupName} />
        <Widget.Body>
          <Tabs variant="tabs" defaultActiveKey="settings">
            <Tab eventKey="settings" title="Settings">
              <Row>
                <Col md={8}>
                  <InputGroup>
                    <InputGroup.Text>
                      Name
                      <FontAwesomeIcon icon={faAsterisk} className="ms-2 text-danger" />
                    </InputGroup.Text>
                    <Form.Control placeholder="Group Name" aria-label="Group Name" defaultValue={groupName} />
                  </InputGroup>
                </Col>
              </Row>
            </Tab>

            <Tab eventKey="attributes" title="Attributes">
              <Attributes />
            </Tab>

            <Tab eventKey="mapping" title="Role Mappings">
              <RoleMapping />
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

export default GroupDetail;
