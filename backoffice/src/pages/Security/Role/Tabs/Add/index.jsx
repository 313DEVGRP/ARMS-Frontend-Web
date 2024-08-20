import { Form, InputGroup, Stack } from 'react-bootstrap';

import { faGift } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AddRole() {
  return (
    <Form>
      <Stack gap={4}>
        <InputGroup>
          <Form.Label column>Role Name</Form.Label>
          <InputGroup.Text>
            <FontAwesomeIcon icon={faGift} />
          </InputGroup.Text>
          <Form.Control placeholder="Role Name" />
        </InputGroup>

        <InputGroup>
          <Form.Label column>Description</Form.Label>
          <InputGroup.Text>
            <FontAwesomeIcon icon={faGift} />
          </InputGroup.Text>
          <Form.Control as="textarea" rows={20} />
        </InputGroup>
      </Stack>
    </Form>
  );
}

export default AddRole;
