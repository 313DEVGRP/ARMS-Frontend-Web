import { useState } from 'react';
import { Form, InputGroup, Stack } from 'react-bootstrap';

import { faGift } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { assigned, available } from '@/pages/Security/Group/mock.js';
import TransferList from '@/components/TransferList';

function DetailTab() {
  const [isOn, setIsOn] = useState(false);

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
          <Form.Control as="textarea" rows={5} />
        </InputGroup>

        <InputGroup className="align-items-center">
          <Form.Label column>Composite Roles</Form.Label>
          <Form.Check type="switch" size="lg" onChange={() => setIsOn((prevState) => !prevState)} />
        </InputGroup>
      </Stack>

      {isOn ? <TransferList available={available} assigned={assigned} /> : null}
    </Form>
  );
}

export default DetailTab;
