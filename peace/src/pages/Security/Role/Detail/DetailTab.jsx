import Widget from '@/components/Widget';
import { useState } from 'react';
import { Col, Container, Form, ListGroup, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { assigned, available, effective } from '@/pages/Security/Group/mock.js';

function DetailTab() {
  const { roleName } = useParams();
  const [isOn, setIsOn] = useState(false);

  const [availableRoles, setAvailableRoles] = useState(available);
  const [assignedRoles, setAssignedRoles] = useState(assigned);

  const filteredRole = (selectedRole, setRoles) => {
    setRoles((roles) => roles.filter((role) => role.id !== selectedRole.id));
  };
  const appendRole = (selectedRole, setRoles) => {
    setRoles((roles) => [...roles, selectedRole]);
  };

  return (
    <>
      <Container fluid="sm" className="mt-4">
        <Row className="mb-4">
          <Col md={2}>
            <h4 className="text-align-right">Role Name</h4>
          </Col>

          <Col md={8}>
            <Form>
              <Form.Control placeholder="Role Name" defaultValue={roleName} />
            </Form>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={2}>
            <h4 className="text-align-right">Description</h4>
          </Col>

          <Col md={8}>
            <Form>
              <Form.Control as="textarea" rows={5} defaultValue={`\${${roleName}}`} />
            </Form>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={2}>
            <h4 className="text-align-right">Composite Roles</h4>
          </Col>

          <Col>
            <Form>
              <Form.Check type="switch" size="lg" onChange={() => setIsOn((prevState) => !prevState)} />
            </Form>
          </Col>
        </Row>
      </Container>

      {isOn ? (
        <Container fluid="sm" className="mt-4">
          <Row className="mb-4">
            <Col>
              <h3>Composite Roles</h3>
            </Col>
          </Row>

          <Row>
            <Col>
              <h4>Available Roles</h4>

              <ListGroup
                as="ul"
                variant="flush"
                className="overflow-y-auto"
                style={{ height: '300px', backgroundColor: 'rgba(51, 51, 51, 0.425)' }}
              >
                {availableRoles.map((role) => (
                  <ListGroup.Item
                    action
                    as="li"
                    key={role.id}
                    onClick={() => {
                      filteredRole(role, setAvailableRoles);
                      appendRole(role, setAssignedRoles);
                    }}
                  >
                    {role.data}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>

            <Col>
              <h4>Assigned Roles</h4>

              <ListGroup
                as="ul"
                variant="flush"
                className="overflow-y-auto"
                style={{ height: '300px', backgroundColor: 'rgba(51, 51, 51, 0.425)' }}
              >
                {assignedRoles.map((role) => (
                  <ListGroup.Item
                    action
                    as="li"
                    key={role.id}
                    onClick={() => {
                      appendRole(role, setAvailableRoles);
                      filteredRole(role, setAssignedRoles);
                    }}
                  >
                    {role.data}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      ) : null}
    </>
  );
}

export default DetailTab;
