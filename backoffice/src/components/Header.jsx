import {
  faArrowRight,
  faBars,
  faCalendarDay,
  faCircleUser,
  faInbox,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Form,
  OverlayTrigger,
  Popover,
  ToggleButton,
  ToggleButtonGroup,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap';

function Header() {
  return (
    <header className="header">
      <Navbar className="justify-content-between">
        <Navbar.Toggle />

        <Navbar.Collapse className="justify-content-end">
          <Form className="d-none d-sm-flex justify-content-center">
            <Form.Control type="search" placeholder="Search" className="mb-0 search-query" aria-label="Search" />

            <button type="button" className="btn btn-link">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </Form>

          <div className="vr mx-4" />

          <Nav navbar className="gap-2">
            <Nav.Item>
              <NavDropdown title={<i className="glyphicon glyphicon-comment" />} align="end">
                <NavDropdown.Item>
                  <div className="message d-flex align-items-center">
                    <img src="img/1.png" alt="" className="me-3" />

                    <div className="details">
                      <div className="sender">Jane Hew</div>
                      <div className="text">Hey, John! How is it going? ...</div>
                    </div>
                  </div>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <div className="message d-flex align-items-center">
                    <img src="img/2.png" alt="" className="me-3" />

                    <div className="details">
                      <div className="sender">Alies Rumiancaŭ</div>
                      <div className="text">I'll definitely buy this template</div>
                    </div>
                  </div>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <div className="message d-flex align-items-center">
                    <img src="img/3.png" alt="" className="me-3" />

                    <div className="details">
                      <div className="sender">Michał Rumiancaŭ</div>
                      <div className="text">Is it really Lore ipsum? Lore ...</div>
                    </div>
                  </div>
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item className="text-align-center">
                  See all messages <FontAwesomeIcon icon={faArrowRight} />
                </NavDropdown.Item>
              </NavDropdown>
            </Nav.Item>

            <Nav.Item>
              <NavDropdown title={<i className="glyphicon glyphicon-globe" />} align="end">
                <NavDropdown.Item>한국어</NavDropdown.Item>

                <NavDropdown.Item>日本語</NavDropdown.Item>

                <NavDropdown.Item>English</NavDropdown.Item>
              </NavDropdown>
            </Nav.Item>

            <div className="vr mx-2" />

            <Nav.Item>
              <NavDropdown title={<i className="glyphicon glyphicon-user" />} align="end">
                <NavDropdown.Item>
                  <FontAwesomeIcon icon={faCircleUser} className="me-2" />
                  Philip Daineka
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <i className="glyphicon glyphicon-user me-2" />
                  Profile
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <FontAwesomeIcon icon={faCalendarDay} className="me-2" />
                  Calendar
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <FontAwesomeIcon icon={faInbox} className="me-2" />
                  Inbox
                </NavDropdown.Item>
              </NavDropdown>
            </Nav.Item>

            <Nav.Item className="d-none d-sm-block">
              <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={
                  <Popover>
                    <Popover.Body>
                      <div className="setting">
                        <div>Sidebar on the</div>

                        <ToggleButtonGroup type="radio" name="options" defaultValue="left">
                          <ToggleButton id="tbg-radio-1" variant="secondary" size="sm" value="left">
                            Left
                          </ToggleButton>
                          <ToggleButton id="tbg-radio-2" variant="secondary" size="sm" value="right">
                            Right
                          </ToggleButton>
                        </ToggleButtonGroup>
                      </div>

                      <div className="setting">
                        <div>Sidebar</div>

                        <ToggleButtonGroup type="radio" name="options" defaultValue="show">
                          <ToggleButton id="tbg-radio-3" variant="secondary" size="sm" value="show">
                            Show
                          </ToggleButton>
                          <ToggleButton id="tbg-radio-4" variant="secondary" size="sm" value="hide">
                            Hide
                          </ToggleButton>
                        </ToggleButtonGroup>
                      </div>
                    </Popover.Body>
                  </Popover>
                }
              >
                <Nav.Link>
                  <i className="glyphicon glyphicon-cog" />
                </Nav.Link>
              </OverlayTrigger>
            </Nav.Item>

            <Nav.Item className="d-block d-sm-none">
              <Nav.Link>
                <FontAwesomeIcon icon={faBars} />
              </Nav.Link>
            </Nav.Item>

            <Nav.Item className="d-none d-sm-block">
              <Nav.Link>
                <i className="glyphicon glyphicon-off"></i>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default Header;
