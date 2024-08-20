import { Nav, Navbar, ProgressBar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faClose, faCubes } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  return (
    <Navbar className="flex-column sidebar d-xs-none">
      <ul className="side-nav">
        <Nav className="flex-column" as="li">
          <Navbar.Text>
            <FontAwesomeIcon icon={faCubes} className="me-2" />
            System
          </Navbar.Text>

          <ul>
            <Nav.Item as="li">
              <Nav.Link href="/controltower/template.html?page=systeminfo">System Info</Nav.Link>
            </Nav.Item>

            <Nav.Item as="li">
              <Nav.Link href="/controltower/template.html?page=invoiceBilling">Invoice Billing</Nav.Link>
            </Nav.Item>

            <Nav.Item as="li">
              <Nav.Link href="/controltower/template.html?page=logging">Audit & Logging</Nav.Link>
            </Nav.Item>
          </ul>
        </Nav>

        <Nav className="flex-column" as="li">
          <Navbar.Text>
            <FontAwesomeIcon icon={faCubes} className="me-2" />
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
            <FontAwesomeIcon icon={faCubes} className="me-2" />
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

        <Nav className="flex-column sidebar-labels" as="li">
          <Navbar.Text className="d-flex justify-content-between">
            Labels
            <i className="glyphicon glyphicon-plus fs-6" />
          </Navbar.Text>

          <ul>
            <Nav.Item as="li">
              <Nav.Link href="#">
                <FontAwesomeIcon icon={faCircle} size="sm" className="text-data me-2" />
                <span>데이터 ( data )</span>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item as="li">
              <Nav.Link href="#">
                <FontAwesomeIcon icon={faCircle} size="sm" className="text-selected me-2" />
                <span>선택된 ( selected )</span>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item as="li">
              <Nav.Link href="#">
                <FontAwesomeIcon icon={faCircle} size="sm" className="text-warning me-2" />
                <span>유틸 ( util )</span>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item as="li">
              <Nav.Link href="#">
                <FontAwesomeIcon icon={faCircle} size="sm" className="text-primary me-2" />
                <span>신규 ( insert )</span>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item as="li">
              <Nav.Link href="#">
                <FontAwesomeIcon icon={faCircle} size="sm" className="text-success me-2" />
                <span>수정 ( update )</span>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item as="li">
              <Nav.Link href="#">
                <FontAwesomeIcon icon={faCircle} size="sm" className="text-danger me-2" />
                <span>삭제 ( delete )</span>
              </Nav.Link>
            </Nav.Item>
          </ul>
        </Nav>

        <Nav className="flex-column sidebar-alerts" as="li">
          <Navbar.Text>Projects</Navbar.Text>

          <div className="alert">
            <span className="d-flex justify-content-between align-items-center">
              Sales Report <FontAwesomeIcon icon={faClose} />
            </span>

            <ProgressBar now={15} />

            <small>Calculating x-axis bias... 65%</small>
          </div>
        </Nav>
      </ul>
    </Navbar>
  );
}

export default Sidebar;
