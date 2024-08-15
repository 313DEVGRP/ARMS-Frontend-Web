import { useEffect, useState } from 'react';
import { Container, Row, Col, InputGroup, Button, Form } from 'react-bootstrap';

import HyperMig from '@/assets/logo.png';
import Widget from '@/components/Widget';
import DonutChart from './DonutChart';

const CURRENT_DATE = new Date();
const END_DATE = new Date(
  CURRENT_DATE.getFullYear() + 1,
  CURRENT_DATE.getMonth(),
  CURRENT_DATE.getDate(),
  CURRENT_DATE.getHours(),
  CURRENT_DATE.getMinutes(),
);

function ComingSoon() {
  const [time, setTime] = useState(END_DATE.getTime() - CURRENT_DATE.getTime());

  const remainingHours = Math.floor(time / 1000 / 60 / 60);
  const remainingMinutes = Math.floor(time / 1000 / 60);
  const remainingSeconds = Math.floor(time / 1000);

  const days = Math.floor(time / 1000 / 60 / 60 / 24);
  const hours = remainingHours - days * 24;
  const minutes = remainingMinutes - remainingHours * 60;
  const seconds = remainingSeconds - remainingMinutes * 60;

  useEffect(() => {
    const timer = setTimeout(() => setTime((prevTime) => prevTime - 100), 100);
    if (time <= 0) clearTimeout(timer);

    return () => clearTimeout(timer);
  }, [time]);

  return (
    <Container fluid>
      <Widget>
        <Row>
          <Col sm={12} className="d-flex flex-column align-items-center">
            <h1>
              <img src={HyperMig} className="d-block" alt="HyperMig" />
            </h1>

            <h2 className="mb-12 text-info">Our Website Is Almost Ready..</h2>

            <h3>Time Left Untile Launching</h3>
          </Col>
        </Row>

        <Row className="my-12">
          <Col xs={12} className="mx-auto d-flex flex-wrap text-center">
            <Row>
              <Col xs={12} sm={12} md={6} lg={3} className="position-relative">
                <div className="position-absolute top-50 start-50 translate-middle">
                  <h4>Days</h4>
                  <span style={{ fontSize: '50px' }}>{days}</span>
                </div>

                <DonutChart data={[(days / 365) * 100, ((365 - days) / 365) * 100]} />
              </Col>

              <Col xs={12} sm={12} md={6} lg={3} className="position-relative">
                <div className="position-absolute top-50 start-50 translate-middle">
                  <h4>Hours</h4>
                  <span style={{ fontSize: '50px' }}>{hours}</span>
                </div>

                <DonutChart data={[(hours / 24) * 100, ((24 - hours) / 24) * 100]} />
              </Col>

              <Col xs={12} sm={12} md={6} lg={3} className="position-relative">
                <div className="position-absolute top-50 start-50 translate-middle">
                  <h4>Minutes</h4>
                  <span style={{ fontSize: '50px' }}>{minutes}</span>
                </div>

                <DonutChart data={[(minutes / 60) * 100, ((60 - minutes) / 60) * 100]} />
              </Col>

              <Col xs={12} sm={12} md={6} lg={3} className="position-relative">
                <div className="position-absolute top-50 start-50 translate-middle">
                  <h4>Seconds</h4>
                  <span style={{ fontSize: '50px' }}>{seconds}</span>
                </div>

                <DonutChart data={[(seconds / 60) * 100, ((60 - seconds) / 60) * 100]} />
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col sm={8} className="mx-auto">
            <InputGroup>
              <Form.Control placeholder="Enter your email id" aria-label="Enter your email id" />
              <Button variant="primary">subscribe</Button>
            </InputGroup>
          </Col>
        </Row>
      </Widget>
    </Container>
  );
}

export default ComingSoon;
