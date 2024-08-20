import { Button, Form, InputGroup, Stack } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaste, faGift } from '@fortawesome/free-solid-svg-icons';

function InviteUser() {
  return (
    <Stack gap={6}>
      <InputGroup>
        <Form.Label column>Invitation Link</Form.Label>

        <InputGroup.Text>
          <FontAwesomeIcon icon={faGift} />
        </InputGroup.Text>

        <Form.Control readOnly value="http://mad-stg.megazone.com/mad/template.html?page=dashboard" />
        <Button variant="warning">
          <FontAwesomeIcon icon={faPaste} />
        </Button>
      </InputGroup>

      <Form>
        <Stack gap={2}>
          <InputGroup>
            <Form.Label column>Email To</Form.Label>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faGift} />
            </InputGroup.Text>
            <Form.Control />
          </InputGroup>

          <InputGroup>
            <Form.Label column>Message</Form.Label>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faGift} />
            </InputGroup.Text>
            <Form.Control as="textarea" rows={20} />
          </InputGroup>
        </Stack>

        <Button variant="primary" type="sybmit" className="mt-4">
          Send
        </Button>
      </Form>
    </Stack>
  );
}

export default InviteUser;
