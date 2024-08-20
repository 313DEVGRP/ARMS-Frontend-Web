import { Row, Col, ListGroup, Container, Form } from 'react-bootstrap';
import { assigned, available, effective } from '../mock';
import { useState } from 'react';

function RoleMapping() {
  const [availableRoles, setAvailableRoles] = useState(available);
  const [assignedRoles, setAssignedRoles] = useState(assigned);
  const [effectiveRoles, setEffectiveRoles] = useState(effective);

  const filteredRole = (selectedRole, setRoles) => {
    setRoles((roles) => roles.filter((role) => role.id !== selectedRole.id));
  };
  const appendRole = (selectedRole, setRoles) => {
    setRoles((roles) => [...roles, selectedRole]);
  };

  return (
    <Container fluid="sm" className="mt-4">
      <Row className="mb-4">
        <Col md={1}>
          <h4>Realm Roles</h4>
        </Col>

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
                  appendRole(role, setEffectiveRoles);
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
                  filteredRole(role, setEffectiveRoles);
                }}
              >
                {role.data}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col>
          <h4>Effective Roles</h4>

          <ListGroup
            as="ul"
            variant="flush"
            className="overflow-y-auto"
            style={{ height: '300px', backgroundColor: 'rgba(51, 51, 51, 0.425)' }}
          >
            {effectiveRoles.map((role) => (
              <ListGroup.Item action as="li" key={role.id}>
                {role.data}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>

      <Row>
        <Col md={1}>
          <h4>Client Roles</h4>
        </Col>

        <Col>
          <Form.Select defaultValue="" className="text-reset">
            <option value="" disabled className="d-none ">
              Select a client...
            </option>
            {availableRoles.map((role) => (
              <option value={role.id} key={role.id}>
                {role.data}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
    </Container>
  );
}

export default RoleMapping;
