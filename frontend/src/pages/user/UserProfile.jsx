import React, {useState} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Alert} from "react-bootstrap";
import Container from "react-bootstrap/Container";

const UserProfile = () => {
  const [validated, setValidated] = useState(false)

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const onChange = () => {
    const password = document.querySelector('input[name=password]')
    const confirmPassword = document.querySelector('input[name=confirmPassword]')

    if (confirmPassword.value === password.value) {
      confirmPassword.setCustomValidity('')
    } else {
      confirmPassword.setCustomValidity('Passwords do not match')
    }
  }


  return (
    <Container>
      <Row className={'mt-5 justify-content-md-center'}>
        <Col md={6}>
          <h1>User Profile</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className={'mb-3'} controlId="validationCustom01">
              <Form.Label>Your first name</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue="Kenny"
                name='name'
              />
              <Form.Control.Feedback type='invalid'>Please Enter your name</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className={'mb-3'} controlId="FormBasicLastName">
              <Form.Label>Your last name</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue="McCormick"
                name='lastName'
              />
              <Form.Control.Feedback type='invalid'>Please Enter your last name</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className={'mb-3'} controlId="FormBasicEmail">
              <Form.Label>Your email</Form.Label>
              <Form.Control
                type="email"
                value="kenny@mailinator.com"
                name='email'
              />
            </Form.Group>
            <Form.Group className={'mb-3'} controlId="FormBasicPhone">
              <Form.Label>Your Phone Number</Form.Label>
              <Form.Control
                name='phone'
                type="text"
                placeholder="enter your phone number"
                defaultValue=''
              />
            </Form.Group>
            <Form.Group className={'mb-3'} controlId="FormBasicAddress">
              <Form.Label>Your Address</Form.Label>
              <Form.Control
                name='address'
                type="text"
                placeholder="enter your street name and house number"
                defaultValue=''
              />
            </Form.Group>
            <Form.Group className={'mb-3'} controlId="FormBasicCountry">
              <Form.Label>Your Country</Form.Label>
              <Form.Control
                name='country'
                type="text"
                placeholder="enter your country"
                defaultValue=''
              />
            </Form.Group>
            <Form.Group className={'mb-3'} controlId="FormBasicZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control
                name='zip'
                type="text"
                placeholder="enter your zip code"
                defaultValue=''
              />
            </Form.Group>
            <Form.Group className={'mb-3'} controlId="FormBasicCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                name='city'
                type="text"
                placeholder="enter your city"
                defaultValue=''
              />
            </Form.Group>
            <Form.Group className={'mb-3'} controlId="FormBasicState">
              <Form.Label>State</Form.Label>
              <Form.Control
                name='city'
                type="text"
                placeholder="enter your state"
                defaultValue=''
              />
            </Form.Group>







            <Form.Group className={'mb-3'} controlId="FormBasicPassword">
              <Form.Label>Your password</Form.Label>
              <Form.Control
                required
                type="password"
                defaultValue="Enter your password"
                name='password'
                minLength={6}
                onChange={onChange}
              />
              <Form.Control.Feedback type='invalid'>Please Enter a valid password</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className={'mb-3'} controlId="FormBasicPasswordConfirm">
              <Form.Label>Confirm your password</Form.Label>
              <Form.Control
                required
                type="password"
                defaultValue="Confirm your password"
                name='confirmPassword'
                minLength={6}
                onChange={onChange}
              />
              <Form.Control.Feedback type='invalid'>Both passwords should match</Form.Control.Feedback>
            </Form.Group>

            <Button variant='primary' type="submit">
              Update
            </Button>
            <Alert show={true} variant={'danger'}>User with that email already exists</Alert>
            <Alert show={true} variant={'info'}>User created</Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
