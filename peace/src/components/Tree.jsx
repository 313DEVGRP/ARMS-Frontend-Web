import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { Button, ListGroup } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTree, faFile, faFolder, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

function TreeItem({ treeData, types }) {
  const [isOpen, setIsOpen] = useState(true);

  if (treeData.children) {
    return (
      <ListGroup.Item as="li">
        <Button variant="link" size="sm" className="p-0 me-2" onClick={() => setIsOpen((prevState) => !prevState)}>
          <FontAwesomeIcon icon={isOpen ? faFolderOpen : faFolder} />
        </Button>
        {treeData.data}

        <ListGroup as="ul" variant="flush" className={isOpen ? 'd-block' : 'd-none'}>
          {treeData.children.map((children) => (
            <TreeItem key={uuidv4()} treeData={children} types={types} />
          ))}
        </ListGroup>
      </ListGroup.Item>
    );
  }

  return (
    <ListGroup.Item as="li">
      {treeData.icon ?? types.file.icon}
      {treeData.data}
    </ListGroup.Item>
  );
}

TreeItem.propTypes = {
  treeData: PropTypes.object.isRequired,
  types: PropTypes.object.isRequired,
};

function Tree({ treeList, types = { drive: {}, folder: {}, file: {} } }) {
  const typeProps = {
    drive: { ...{ title: 'Root', icon: <FontAwesomeIcon icon={faTree} className="me-2" /> }, ...types.drive },
    folder: { ...{ icon: <FontAwesomeIcon icon={faFolder} className="me-2" /> }, ...types.folder },
    file: { ...{ icon: <FontAwesomeIcon icon={faFile} className="me-2" /> }, ...types.file },
  };

  return (
    <ListGroup as="ul" variant="flush">
      <ListGroup.Item>
        {typeProps.drive.icon}
        {typeProps.drive.title}

        <ListGroup as="ul" variant="flush">
          {treeList.map((treeData) => (
            <TreeItem key={uuidv4()} treeData={treeData} types={typeProps} />
          ))}
        </ListGroup>
      </ListGroup.Item>
    </ListGroup>
  );
}

Tree.propTypes = {
  treeList: PropTypes.array.isRequired,
  types: PropTypes.object,
};

export default Tree;
