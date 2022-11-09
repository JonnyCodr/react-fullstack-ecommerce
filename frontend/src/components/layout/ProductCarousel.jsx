import Carousel from 'react-bootstrap/Carousel';
import {LinkContainer} from "react-router-bootstrap";

const ProductCarousel = () => {

  const cursorPtr = {
    cursor: 'pointer'
  }

  return (
    <Carousel>
      <Carousel.Item>
        <img
          crossOrigin='anonymous'
          className="d-block w-100"
          style={{ height: '300px', objectFit: 'cover' }}
          src="/images/carousel/carousel-1.png"
          alt="First slide"
        />
        <Carousel.Caption>
          <LinkContainer style={cursorPtr} to='/product-details'>
            <h3>Best Selling Laptops</h3>
          </LinkContainer>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{ height: '300px', objectFit: 'cover' }}
          src="/images/carousel/carousel-2.png"
          alt="Second slide"
        />

        <Carousel.Caption>
          <LinkContainer style={cursorPtr} to='/product-details'>
            <h3>Best Selling Books</h3>
          </LinkContainer>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{ height: '300px', objectFit: 'cover' }}
          src="/images/carousel/carousel-3.png"
          alt="Third slide"
        />

        <Carousel.Caption>
          <LinkContainer style={cursorPtr} to='/product-details'>
            <h3>Best Selling Cameras</h3>
          </LinkContainer>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default ProductCarousel;
