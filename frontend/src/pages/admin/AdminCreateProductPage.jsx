import {useState} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";
import {Alert, CloseButton, Form, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const AdminCreateProductPage = () => {
  const [validated, setValidated] = useState()

  const handleSubmit = (e) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  return (
    <Container>
      <Row className='justify-content-md-center mt-5 my-3'>
        <Col md={1}>
          <Link to={'/admin/products'} className={'btn btn-info'}>Go Back</Link>
        </Col>
        <Col md={6}>
          <h1>Create a new product</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='formBasicName'>
              <Form.Label>Name</Form.Label>
              <Form.Control name='name' required type='text' />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicDescription'>
              <Form.Label>Description</Form.Label>
              <Form.Control name='description' required as='textarea' rows={3} />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicCount'>
              <Form.Label>Count in stock</Form.Label>
              <Form.Control name='count' required type='number' />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPrice'>
              <Form.Label>Price</Form.Label>
              <Form.Control name='price' required type='text' />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicCategory'>
              <Form.Label>Category</Form.Label>
              <CloseButton />(<small>remove selected</small>)
              <Form.Select name='category' required aria-label='Default select example'>
                <option value=''>Choose a category</option>
                <option value='1'>Laptops</option>
                <option value='2'>TV</option>
                <option value='3'>Games</option>
              </Form.Select>

              <Form.Group className='mb-3' controlId='formBasicNewCategory'>
                <Form.Label>
                  Or create a new category (e.g. Computers/ Laptops/ Intel){' '}
                </Form.Label>
                <Form.Control name='newCategory' type='text' />
              </Form.Group>
              <Row className='mt-5'>
                <Col md={6}>
                  <Form.Group className='mb-3' controlId='formBasicAttributes'>
                    <Form.Label>Choose attribute and set value</Form.Label>
                    <Form.Select
                      name='attrKey'
                      aria-label='Default select example'>
                      <option>Choose Attribute</option>
                      <option value='red'>red</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className='mb-3' controlId='formBasicAttributeValue'>
                    <Form.Label>Attribute value</Form.Label>
                    <Form.Select
                      name='attrVal'
                      aria-label='Default select example'>
                      <option>Choose Attribute value</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Table hover>
                  <thead>
                  <tr>
                    <th>Attribute</th>
                    <th>Value</th>
                    <th>Delete</th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>attr key</td>
                      <td>attr value</td>
                      <td><CloseButton /></td>
                    </tr>
                  </tbody>
                </Table>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className='mb-3' controlId='formBasicNewAttribute'>
                    <Form.Label>Create new attribute</Form.Label>
                    <Form.Control
                      disabled={false}
                      placeholder='first choose or create a category'
                      name='newAttrValue'
                      type='text'
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className='mb-3' controlId='formBasicNewAttrValue'>
                    <Form.Label>Attribute Value</Form.Label>
                    <Form.Control
                      disabled={false}
                      placeholder='first choose or create category'
                      required={true}
                      name='newAttrValue'
                      type='text'
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Alert variant='primary'>
                After typing attribute key and value press enter on one of the fields
              </Alert>

              <Form.Group className='mb-3 mt-3' controlId='formFileMultiple'>
                <Form.Label>Images</Form.Label>
                <Form.Control name='price' required type='file' />
              </Form.Group>
            </Form.Group>
            <Button variant='primary' type='submit'>Create</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminCreateProductPage;
