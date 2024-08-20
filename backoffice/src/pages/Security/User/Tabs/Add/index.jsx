import { faker } from '@faker-js/faker';
import { Form, InputGroup, Stack } from 'react-bootstrap';
import Select from 'react-select';

import { faGift } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { makeMockData } from '@/utils/makeMockData';

const options = makeMockData(() => {
  const department = faker.commerce.department();

  return {
    value: department.toLowerCase(),
    label: department,
  };
}, 20);

function AddUser() {
  return (
    <Form>
      <Stack gap={4}>
        <InputGroup>
          <Form.Label column>Full Name</Form.Label>

          <InputGroup.Text>
            <FontAwesomeIcon icon={faGift} />
          </InputGroup.Text>

          <Form.Control placeholder="First Name" />
          <Form.Control placeholder="Last Name" />
        </InputGroup>

        <InputGroup>
          <Form.Label column>ID</Form.Label>
          <InputGroup.Text>
            <FontAwesomeIcon icon={faGift} />
          </InputGroup.Text>
          <Form.Control readOnly />
        </InputGroup>

        <InputGroup>
          <Form.Label column>Username</Form.Label>
          <InputGroup.Text>
            <FontAwesomeIcon icon={faGift} />
          </InputGroup.Text>
          <Form.Control readOnly />
        </InputGroup>

        <InputGroup>
          <Form.Label column>Email</Form.Label>
          <InputGroup.Text>
            <FontAwesomeIcon icon={faGift} />
          </InputGroup.Text>
          <Form.Control />
        </InputGroup>

        <InputGroup>
          <Form.Label column>Phone Number</Form.Label>
          <InputGroup.Text>
            <FontAwesomeIcon icon={faGift} />
          </InputGroup.Text>
          <Form.Control />
        </InputGroup>

        <InputGroup>
          <Form.Label column>Department</Form.Label>
          <InputGroup.Text>
            <FontAwesomeIcon icon={faGift} />
          </InputGroup.Text>
          <Select options={options} className="form-select basic-multi-select" classNamePrefix="select" />
        </InputGroup>
      </Stack>
    </Form>
  );
}

export default AddUser;
