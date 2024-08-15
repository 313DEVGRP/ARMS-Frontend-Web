import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Alert as BAlert, CloseButton } from 'react-bootstrap';

function Alert() {
  return (
    <BAlert variant="secondary" className="me-3">
      <FontAwesomeIcon icon={faCircleInfo} />
      Check out Light Blue
      <BAlert.Link href="#" className="mx-2">
        settings
      </BAlert.Link>
      on the right!
      <CloseButton className="ms-2" />
    </BAlert>
  );
}

export default Alert;
