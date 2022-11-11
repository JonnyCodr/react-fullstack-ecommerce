import {useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {Alert, Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";

const Login = () => {

  const [validated, setValidated] = useState(false)

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };


  return (
    <Container>
      <Row className={'mt-5 justify-content-md-center'}>
        <Col md={6}>
          <h1>Login</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
              />
              <Form.Control.Feedback type='invalid'>Please Enter a valid password</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className={'mb-3'} controlId="FormBasicCheckBox">
              <Form.Check
                type="checkbox"
                name='doNotLogout'
                label='Do not log out'
              />
              <Form.Control.Feedback type='invalid'>Please Enter a valid password</Form.Control.Feedback>
            </Form.Group>

            <Row className={'pb-2'}>
              <Col>
                Don't you have an account?
                <Link to='/register'> Register </Link>
              </Col>
            </Row>
            <Button variant='primary' type="submit">
              <Spinner
                as='span'
                animation='border'
                size='sm'
                role='status'
                aria-hidden='true'
              />
              {' '}Login
            </Button>
            <Alert show={true} variant={'danger'}>Wrong credentials</Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
