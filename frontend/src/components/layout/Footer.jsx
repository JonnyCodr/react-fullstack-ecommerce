import React from 'react';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Footer = () => {
  return (
    <footer>
      <Container fluid >
        <Row className={'mt-5'}>
          <Col className={'bg-dark text-white text-center py-5'}>Copyright &copy; Best Online Shop</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
