import { Button, Form, InputGroup, Stack, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

import { faBan, faCircleCheck, faGift } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CredentialTab() {
  return (
    <Form>
      <Stack gap={4}>
        <InputGroup>
          <Form.Label column>Password</Form.Label>
          <InputGroup.Text>
            <FontAwesomeIcon icon={faGift} />
          </InputGroup.Text>
          <Form.Control />
        </InputGroup>

        <InputGroup>
          <Form.Label column>Password Confirm</Form.Label>
          <InputGroup.Text>
            <FontAwesomeIcon icon={faGift} />
          </InputGroup.Text>
          <Form.Control />
        </InputGroup>

        <InputGroup>
          <Form.Label column>Temporary</Form.Label>

          <InputGroup.Text>
            <FontAwesomeIcon icon={faGift} />
          </InputGroup.Text>

          <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
            <ToggleButton id="tbg-radio-active1" variant="outline-primary" value={1}>
              <FontAwesomeIcon icon={faCircleCheck} /> Active
            </ToggleButton>
            <ToggleButton id="tbg-radio-block1" variant="outline-danger" value={2}>
              <FontAwesomeIcon icon={faBan} /> Block
            </ToggleButton>
          </ToggleButtonGroup>
        </InputGroup>
      </Stack>

      <Button variant="primary" type="submit" className="mt-4">
        Reset Password
      </Button>
    </Form>
  );
}

export default CredentialTab;
