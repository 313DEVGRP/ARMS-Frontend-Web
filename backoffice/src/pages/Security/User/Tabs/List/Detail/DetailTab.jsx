import { faBan, faCircleCheck, faGift } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, InputGroup, Stack, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import Select from 'react-select';

const options = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AS', label: 'American Samoa' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'DC', label: 'District Of Columbia' },
  { value: 'FM', label: 'Federated States Of Micronesia' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'GU', label: 'Guam' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MH', label: 'Marshall Islands' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'MP', label: 'Northern Mariana Islands' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PW', label: 'Palau' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'PR', label: 'Puerto Rico' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VI', label: 'Virgin Islands' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
];

function DetailTab() {
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
          <Form.Label column>Created At</Form.Label>
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
          <Form.Control />
        </InputGroup>

        <InputGroup>
          <Form.Label column>User Enabled</Form.Label>
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

        <InputGroup>
          <Form.Label column>Email Verified</Form.Label>
          <InputGroup.Text>
            <FontAwesomeIcon icon={faGift} />
          </InputGroup.Text>

          <ToggleButtonGroup type="radio" name="options" defaultValue={3}>
            <ToggleButton id="tbg-radio-active2" variant="outline-primary" value={3}>
              <FontAwesomeIcon icon={faCircleCheck} /> Active
            </ToggleButton>
            <ToggleButton id="tbg-radio-block2" variant="outline-danger" value={4}>
              <FontAwesomeIcon icon={faBan} /> Block
            </ToggleButton>
          </ToggleButtonGroup>
        </InputGroup>

        <InputGroup>
          <Form.Label column>Required User Actions</Form.Label>
          <InputGroup.Text>
            <FontAwesomeIcon icon={faGift} />
          </InputGroup.Text>
          <Select isMulti options={options} className="form-select basic-multi-select" classNamePrefix="select" />
        </InputGroup>
      </Stack>
    </Form>
  );
}

export default DetailTab;
