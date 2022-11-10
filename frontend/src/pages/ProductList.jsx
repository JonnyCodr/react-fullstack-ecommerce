import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {ListGroup} from "react-bootstrap";
import SortOptionsComponent from "../components/SortOptionsComponent";
import PriceFilterComponent from "../components/filterQueryResultOptions/PriceFilterComponent";
import RatingFilterComponent from "../components/filterQueryResultOptions/RatingFilterComponent";
import CategoryFilterComponent from "../components/filterQueryResultOptions/CategoryFilterComponent";
import PaginationComponent from "../components/PaginationComponent";
import AttributesFilterComponent from "../components/filterQueryResultOptions/AttributesFilterComponent";
import Button from "react-bootstrap/Button";
import ProductForListComponent from "../components/ProductForListComponent";

const ProductList = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item className='mb-3 mt-3'><SortOptionsComponent /></ListGroup.Item>
            <ListGroup.Item>Filter<br /><PriceFilterComponent /></ListGroup.Item>
            <ListGroup.Item><RatingFilterComponent /></ListGroup.Item>
            <ListGroup.Item><CategoryFilterComponent /></ListGroup.Item>
            <ListGroup.Item>
              <AttributesFilterComponent />
            </ListGroup.Item>
            <ListGroup.Item>
              <Button variant="primary">Filter</Button>
              <Button variant="danger">Reset Filters</Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={9}>
          {Array.from({length: 5}).map((_, i) => (
          <ProductForListComponent key={i} images={['games','monitors','tablets','games','monitors']} idx={i}/>
          ))}
          <PaginationComponent />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductList;
