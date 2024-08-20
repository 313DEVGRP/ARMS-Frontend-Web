import PageHeader from '@/components/PageHeader';
import Widget from '@/components/Widget';
import { Row, Col, Container } from 'react-bootstrap';
import { assigned, available } from './mock';
import Tree from '@/components/Tree';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Group() {
  return (
    <>
      <PageHeader steps={['Security', 'Group']} />

      <Widget>
        <Widget.Header title="Group" />
        <Widget.Body description="Desc" helpTo="#">
          <Container fluid="sm">
            <Row className="mb-4">
              <Col md={12}>
                <h4>Realm Roles</h4>

                <Tree
                  treeList={available.map((role) => ({
                    id: role.id,
                    data: <Link to={role.data}>{role.data}</Link>,
                    children: assigned.map((assignedRole) => ({
                      id: assignedRole.id,
                      data: <Link to={assignedRole.data}>{assignedRole.data}</Link>,
                    })),
                  }))}
                  types={{ drive: { title: 'Group', icon: <FontAwesomeIcon icon={faUserGroup} className="me-2" /> } }}
                />
              </Col>
            </Row>
          </Container>
        </Widget.Body>
      </Widget>
    </>
  );
}

export default Group;
