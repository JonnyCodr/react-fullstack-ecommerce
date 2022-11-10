import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";

const AddedToCartToast = () => {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert show={show} variant="success" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <Button variant={"success"}>Go Back</Button>{' '}
        <Link to='/cart'>
          <Button variant={"danger"}>Go to cart</Button>
        </Link>
      </Alert>
    );
  }
  return <Button onClick={() => setShow(true)}>Show Alert</Button>;
};

export default AddedToCartToast;
