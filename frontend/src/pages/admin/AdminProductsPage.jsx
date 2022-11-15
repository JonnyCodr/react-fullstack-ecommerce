import React from 'react';
import Col from "react-bootstrap/Col";
import AdminLinks from "../../components/admin/AdminLinks";
import {Table} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const AdminProductsPage = () => {



  const deleteHandler = () => {
    if (window.confirm('Are You Sure?')) alert('Product deleted')
  }

  return (
    <Row className='m-5'>
      <Col md={2}>
        <AdminLinks />
      </Col>
      <Col md={10}>
        <h1>
          Products List{' '}
          <LinkContainer to='/admin/create-new-product'>
            <Button variant='primary' size='lg'>Create New</Button>
          </LinkContainer>
        </h1>
        <Table striped bordered hover responsive>
          <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>edit/Delete</th>
          </tr>
          </thead>
          <tbody>
          {[{name: 'Panasonic', price:'$222', category:'TV'},
            {name: 'Lenovo', price: '$999', category: 'Laptops'},
            {name: 'GTA 10', price:'$345', category: 'Games'}].map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.category}</td>
              <td>
                <LinkContainer to='/admin/edit-product'>
                  <Button className='btn btn-sm'>
                    <i className='bi bi-pencil-square'></i>
                  </Button>
                </LinkContainer>
                {'/'}
                  <Button variant='danger' className='btn btn-sm' onClick={deleteHandler}>
                    <i className='bi bi-x-circle'></i>
                  </Button>
              </td>
            </tr>
          ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default AdminProductsPage;
