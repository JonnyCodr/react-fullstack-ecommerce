import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {Image, ListGroup} from "react-bootstrap";
import {Rating} from "react-simple-star-rating";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import AddedToCartToast from "../components/AddedToCartToast";

const ProductDetails = () => {
  return (
    <Container>
      <AddedToCartToast />
      <Row className="mt-5">
        <Col md={4}>
          <Image fluid src="/images/games-category.png" />
          <Image fluid src="/images/monitors-category.png" />
          <Image fluid src="/images/tablets-category.png" />
          <Image fluid src="/images/games-category.png" />
        </Col>
        <Col md={8}>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item><h1>Product Name</h1></ListGroup.Item>
                <ListGroup.Item>
                  <Rating readonly size={20} initialValue={4} /> (1)
                </ListGroup.Item>
                <ListGroup.Item>Price <span className='fw-bold'>$345</span></ListGroup.Item>
                <ListGroup.Item>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Asperiores aut autem facere harum nemo nobis nostrum odio sapiente suscipit ullam!
                  Aliquid asperiores dolorem eaque eligendi fugiat ipsum labore officia repellendus?</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <ListGroup>
                <ListGroup.Item>Status: in stock</ListGroup.Item>
                <ListGroup.Item>Price: <span className={'fw-bold'}>$345</span></ListGroup.Item>
                <ListGroup.Item>
                  Quantity:
                  <Form.Select size="lg" aria-label="Default select example">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </Form.Select>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button variant="danger">Add to cart</Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col className="mt-5">
              <h5>REVIEWS</h5>
              <ListGroup variant="flush">
                {
                  Array.from({length: 10}).map((item, i) => (
                    <ListGroup.Item key={i}>
                      John Doe <br/>
                      <Rating readonly size={20} initialValue={3} />
                      <br/>
                      20-09-2001 <br/>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet animi assumenda, blanditiis excepturi illum
                      laboriosam nihil quibusdam quo repellat voluptas. Consectetur debitis est numquam rerum?
                    </ListGroup.Item>
                  ))
                }
              </ListGroup>
            </Col>
          </Row>
          <hr />
          <Alert variant="danger">Login first to write a review</Alert>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1">
              <Form.Label>Write your review</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Select aria-label="Default select example">
              <option>Your rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Select>
            <Button variant="primary" className={'mb-3 mt-3'}>Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
