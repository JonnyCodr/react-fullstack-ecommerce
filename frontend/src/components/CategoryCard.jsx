import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {LinkContainer} from 'react-router-bootstrap';

const CategoryCard = ({ category, idx }) => {
  const images = [
    '/images/tablets-category.png',
    '/images/monitors-category.png',
    '/images/games-category.png',
  ]

  return (
    <Card>
      <Card.Img crossOrigin='anonymous' variant="top" src={images[idx]} />
      <Card.Body>
        <Card.Title>{ category }</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <LinkContainer to={`/product-list`}>
          <Button variant="primary">go to {category}</Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};

export default CategoryCard;