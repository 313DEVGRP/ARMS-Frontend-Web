import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

function WidgetBody({ description, helpTo, children }) {
  return (
    <div className="body">
      <hr className="gradient_bottom_border" />

      <blockquote className="blockquote mb-3">
        {description}
        <Link to={helpTo} className="help">
          Help
          <FontAwesomeIcon icon={faQuestion} className="ms-1" />
        </Link>
      </blockquote>
      {children}
    </div>
  );
}

export default WidgetBody;
