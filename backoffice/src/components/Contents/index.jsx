import classNames from 'classnames/bind';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../Header';
import Footer from '../Footer';

import style from './style.module.scss';

const classnames = classNames.bind(style);

function Contents({ children }) {
  return (
    <Container fluid className={classnames('min-vh-100 position-relative', style.container)}>
      <Header />

      <Row className="pt-8">
        <Col>{children}</Col>
      </Row>

      <Footer className="pb-8" />
    </Container>
  );
}

export default Contents;
