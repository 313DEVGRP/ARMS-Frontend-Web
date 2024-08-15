import classNames from 'classnames/bind';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../Header';
import Footer from '../Footer';

import style from './style.module.scss';

const classnames = classNames.bind(style);

function Contents({ children }) {
  return (
    <Container fluid className={classnames('px-5 min-vh-100 position-relative', style.container)}>
      <Header />

      <Row className="py-5">
        <Col>{children}</Col>
      </Row>
      <Footer />
    </Container>
  );
}

export default Contents;
