import React from 'react';
import Col from "react-bootstrap/Col";
import {Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import Row from "react-bootstrap/Row";
import AdminLinks from "../../components/admin/AdminLinks";

const AdminOrders = () => {
  return (
    <Row className='m-5'>
      <Col md={2}>
        <AdminLinks />
      </Col>
      <Col md={10}>
        <h1>Orders</h1>
        <Table striped bordered hover responsive>
          <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Date</th>
            <th>Total</th>
            <th>Delivered</th>
            <th>Payment Method</th>
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
              <td>PayPal</td>
              <td>
                <Link to='/admin/order-detail'>Details</Link>
              </td>
            </tr>
          ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default AdminOrders;
