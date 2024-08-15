import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronLeft, faChevronRight, faMaximize } from '@fortawesome/free-solid-svg-icons';

function WidgetHeader({ title }) {
  return (
    <header>
      <h4 className="fs-4">{title}</h4>

      <div className="widget-controls">
        <Button size="sm" variant="link">
          <FontAwesomeIcon icon={faChevronLeft} />
        </Button>

        <Button size="sm" variant="link">
          <FontAwesomeIcon icon={faChevronDown} />
        </Button>

        <Button size="sm" variant="link">
          <FontAwesomeIcon icon={faChevronRight} />
        </Button>

        <Button size="sm" variant="link">
          <FontAwesomeIcon icon={faMaximize} />
        </Button>
      </div>
    </header>
  );
}

export default WidgetHeader;
