import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {Alert, ListGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {LinkContainer} from "react-router-bootstrap";
import CartItem from "../components/CartItem";


const Cart = () => {
  return (
    <Container fluid>
      <Row className={'mt-4'}>
        <Col  md={8}>
          <h1>Shopping Cart</h1>
          <ListGroup variant='flush'>
            {
              Array.from({length: 3}).map((item, i) => (
                  <CartItem item={{image: {path: '/images/tablets-category.png'}, name: 'Product name', price: 10, count: 10, quantity: 10}} key={i}/>
              ))
            }
          </ListGroup>
          <Alert variant={'info'}>Your Cart Is Empty</Alert>
        </Col>
        <Col  md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>Subtotal (2 items)</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Price: <span className={'fw-bold'}>$987</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <LinkContainer to='/user/cart-details'>
              <Button type={'button'}>Proceed to checkout</Button>
              </LinkContainer>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
