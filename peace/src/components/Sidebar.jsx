import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubes } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  return (
    <Navbar className="flex-column sidebar d-xs-none">
      <ul className="side-nav">
        <Nav className="flex-column" as="li">
          <Navbar.Text>
            <FontAwesomeIcon icon={faCubes} className="fs-lg me-2" />
            System
          </Navbar.Text>

          <ul>
            <Nav.Item as="li">
              <Nav.Link href="/controltower/template.html?page=systeminfo">System Info</Nav.Link>
            </Nav.Item>

            <Nav.Item as="li">
              <Nav.Link href="/controltower/template.html?page=billing">Billing</Nav.Link>
            </Nav.Item>

            <Nav.Item as="li">
              <Nav.Link href="/controltower/template.html?page=logging">Audit & Logging</Nav.Link>
            </Nav.Item>
          </ul>
        </Nav>

        <Nav className="flex-column" as="li">
          <Navbar.Text>
            <FontAwesomeIcon icon={faCubes} className="fs-lg me-2" />
            Discovery
          </Navbar.Text>

          <ul>
            <Nav.Item as="li">
              <Nav.Link href="/controltower/template.html?page=generalconfig">Schdule Config</Nav.Link>
            </Nav.Item>

            <Nav.Item as="li">
              <Nav.Link href="/controltower/template.html?page=commandconfig">Command Config</Nav.Link>
            </Nav.Item>
          </ul>
        </Nav>

        <Nav className="flex-column" as="li">
          <Navbar.Text>
            <FontAwesomeIcon icon={faCubes} className="fs-lg me-2" />
            Security
          </Navbar.Text>

          <ul>
            <Nav.Item as="li">
              <NavLink to="/security/user" className="nav-link">
                User
              </NavLink>
            </Nav.Item>

            <Nav.Item as="li">
              <NavLink to="/security/role" className="nav-link">
                Role
              </NavLink>
            </Nav.Item>

            <Nav.Item as="li">
              <NavLink to="/security/access" className="nav-link">
                Access Control
              </NavLink>
            </Nav.Item>
          </ul>
        </Nav>
      </ul>
    </Navbar>
  );
}

export default Sidebar;
