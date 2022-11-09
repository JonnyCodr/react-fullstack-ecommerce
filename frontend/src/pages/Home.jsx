import React from 'react';
import ProductCarousel from "../components/layout/ProductCarousel";
import CategoryCard from "../components/CategoryCard";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

const Home = () => {
  const productCategories = [
    'Tablets',
    'Monitors',
    'Games',
    'Printers',
    'Software',
    'Cameras',
    'Books',
    'Videos',
  ];

  return (
    <>
      <ProductCarousel />
      <Container>
      <Row xs={1} md={2} className="g-4 mt-5">
      {
        productCategories.map((category, index) => (
          <CategoryCard category={category} idx={index} key={index} />
        ))
      }
      </Row>
      </Container>
    </>
  );
};

export default Home;
