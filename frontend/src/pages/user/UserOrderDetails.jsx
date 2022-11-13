import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Alert, Form, ListGroup} from "react-bootstrap";
import CartItem from "../../components/CartItem";
import Button from "react-bootstrap/Button";

const UserOrderDetails = () => {
  return (
    <Container fluid>
      <Row className='mt-4'>
        <h1>Order Details</h1>
        <Col md={8}>
          <br/>
          <Row>
            <Col md={6}>
              <h2>Shipping</h2>
              <b>Name</b>: Kenny McCormick<br/>
              <b>Address</b>: 1 1st St. South Park, CO 80001<br/>
              <b>Phone</b>: (303) 777-4444<br/>
            </Col>
            <Col md={6}>
              <h2>Payment Method</h2>
              <Form.Select disabled={false}>
                <option value="pp">PayPal</option>
                <option value="cod">Cash on Delivery (Delivery may be delayed)</option>
              </Form.Select>
            </Col>
            <Row>
              <Col>
                <Alert variant={'danger'}>
                  Not Delivered
                </Alert>
              </Col>
              <Col>
                <Alert variant={'success'}>
                  Paid Date 2022-12-01
                </Alert>
              </Col>
            </Row>
          </Row>
          <br/>
          <h2>Order Items</h2>
          <ListGroup variant={'flush'}>
            {
              Array.from({length:3}).map((item, i) => (
                <CartItem key={i} />
              ))
            }
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>Order Summary</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Items Price (after tax)
            </ListGroup.Item>
            <ListGroup.Item>
              Shipping: <span className='fw-bold'>included</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Tax: <span className='fw-bold'>included</span>
            </ListGroup.Item>
            <ListGroup.Item className='text-danger'>
              Total Price: <span className='fw-bold'>$999</span>
            </ListGroup.Item>
            <ListGroup.Item className='text-danger'>
              <div className="d-grid gap-2">
                <Button size='lg' variant='danger' type='button'>Pay for the order</Button>
              </div>
            </ListGroup.Item>

          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default UserOrderDetails;
