import { v4 as uuidv4 } from 'uuid';

import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

function PageHeader({ steps }) {
  const [title] = steps;

  return (
    <header>
      <h3 className="fs-4 clearfix">
        {title}

        {steps.slice(1).map((step) => {
          return (
            <small key={uuidv4()} className="ms-2">
              {step}
            </small>
          );
        })}

        <Breadcrumb className="float-end">
          <li className="breadcrumb-item">
            <Link to="/">
              <FontAwesomeIcon icon={faHouse} className="me-1" />
              Home
            </Link>
          </li>

          {steps.map((step, stepIdx) => {
            if (stepIdx >= steps.length) {
              return (
                <li key={uuidv4()} className="breadcrumb-item active">
                  {step}
                </li>
              );
            }

            return (
              <li key={uuidv4()} className="breadcrumb-item">
                {step}
              </li>
            );
          })}
        </Breadcrumb>
      </h3>
    </header>
  );
}

export default PageHeader;
