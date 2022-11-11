import {useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {Alert, Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";

const Register = () => {

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
          <h1>Register</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className={'mb-3'} controlId="validationCustom01">
                <Form.Label>Your name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter Your name"
                  name='name'
                />
                <Form.Control.Feedback type='invalid'>Please Enter your name</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className={'mb-3'} controlId="FormBasicLastName">
                <Form.Label>Your last name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your last name"
                  name='lastName'
                />
                <Form.Control.Feedback type='invalid'>Please Enter your last name</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className={'mb-3'} controlId="FormBasicEmail">
                <Form.Label>Your email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter your email"
                  name='email'
                />
                <Form.Control.Feedback type='invalid'>Please Enter your email</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className={'mb-3'} controlId="FormBasicPassword">
                <Form.Label>Your password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Enter your password"
                  name='password'
                  minLength={6}
                  onChange={onChange}
                />
                <Form.Control.Feedback type='invalid'>Please Enter a valid password</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className={'mb-3'} controlId="FormBasicPassword">
                <Form.Label>Confirm your password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Confirm your password"
                  name='confirmPassword'
                  minLength={6}
                  onChange={onChange}
                />
                <Form.Control.Feedback type='invalid'>Both passwords should match</Form.Control.Feedback>
              </Form.Group>

            <Row className={'pb-2'}>
              <Col>
                Do you already have an account?
                <Link to='/login'> Login </Link>
              </Col>
            </Row>
            <Button type="submit">
              <Spinner
                as='span'
                animation='border'
                size='sm'
                role='status'
                aria-hidden='true'
              />
              {' '}Submit
            </Button>
            <Alert show={true} variant={'danger'}>User with that email already exists</Alert>
            <Alert show={true} variant={'info'}>User created</Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
