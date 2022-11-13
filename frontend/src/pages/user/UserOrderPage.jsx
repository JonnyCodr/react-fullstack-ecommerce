import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Table} from "react-bootstrap";
import {Link} from "react-router-dom";

const UserOrderPage = () => {
  return (
    <Row className='m-5'>
      <Col md={12}>
        <h1>My Orders</h1>
        <Table striped bordered hover>
          <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Date</th>
            <th>Total</th>
            <th>Delivered</th>
            <th>Order Details</th>
          </tr>
          </thead>
          <tbody>
          {['bi bi-check-lg text-success', 'bi bi-x-lg text-danger'].map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>Kenny McCormick</td>
              <td>2022-01-01</td>
              <td>$999</td>
              <td>
                <i className={item}></i>
              </td>
              <td>
                <Link to='/user/order-details'>Details</Link>
              </td>
            </tr>
          ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default UserOrderPage;
