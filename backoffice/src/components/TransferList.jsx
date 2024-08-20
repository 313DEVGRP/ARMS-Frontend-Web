import { useState } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLeft } from '@fortawesome/free-solid-svg-icons';

function TransferList({ available, assigned }) {
  const [availableList, setAvailableList] = useState(available);
  const [assignedList, setAssignedList] = useState(assigned);

  const filteredList = (selectedItem, setState) => {
    setState((list) => list.filter((item) => item.id !== selectedItem.id));
  };
  const appendList = (selectedItem, setState) => {
    setState((list) => [...list, selectedItem]);
  };

  return (
    <Row className="align-items-center">
      <Col xs={5}>
        <h5>Available Roles</h5>

        <ListGroup as="ul" variant="flush" className="overflow-y-auto height-300 bg-body bg-opacity-25">
          {availableList.map((item) => (
            <ListGroup.Item
              action
              as="li"
              key={item.id}
              onClick={() => {
                filteredList(item, setAvailableList);
                appendList(item, setAssignedList);
              }}
            >
              {item.data}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>

      <Col xs={2} className="text-center">
        <FontAwesomeIcon icon={faRightLeft} />
      </Col>

      <Col xs={5}>
        <h5>Assigned Roles</h5>

        <ListGroup as="ul" variant="flush" className="overflow-y-auto height-300 bg-body bg-opacity-25">
          {assignedList.map((item) => (
            <ListGroup.Item
              action
              as="li"
              key={item.id}
              onClick={() => {
                appendList(item, setAvailableList);
                filteredList(item, setAssignedList);
              }}
            >
              {item.data}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    </Row>
  );
}

export default TransferList;
