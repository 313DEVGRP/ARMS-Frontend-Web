import { Button, Col, Form, InputGroup, Row, Stack } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAsterisk, faPlusCircle, faTrashCan } from '@fortawesome/free-solid-svg-icons';

function Attributes() {
  return (
    <Stack gap={4}>
      <Form>
        <Stack gap={4}>
          <InputGroup>
            <InputGroup.Text>
              Key <FontAwesomeIcon icon={faAsterisk} className="text-danger ms-2" />
            </InputGroup.Text>
            <Form.Control />
            <InputGroup.Text>Value</InputGroup.Text>
            <Form.Control />
            <Button variant="danger">
              Delete <FontAwesomeIcon icon={faTrashCan} />
            </Button>
          </InputGroup>
        </Stack>
      </Form>

      <Row>
        <Col>
          <Button variant="primary">
            Add <FontAwesomeIcon icon={faPlusCircle} />
          </Button>
        </Col>
      </Row>
    </Stack>
  );
}

export default Attributes;
