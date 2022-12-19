import React, { useEffect, useState } from 'react';
import Col from "react-bootstrap/Col";
import {Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import Row from "react-bootstrap/Row";
import AdminLinks from "../../../components/admin/AdminLinks";

const AdminOrdersPageComponent = ({ getOrders }) => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        getOrders().then((orders) => setOrders(orders)).catch(
            err => console.log(err.response.data.message ? err.response.data.message : err.response.data ))
    }, [])

    console.log('orders', orders)

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
                    {orders.map((order, i) => (
                    // {['bi bi-check-lg text-success', 'bi bi-x-lg text-danger'].map((item, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>
                                {order.user !== null ? (
                                    <>
                                        {order.username} {order.lastName}
                                    </>
                                ) : null}
                            </td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>{order.orderTotal.cartSubtotal}</td>
                            <td>
                                {order.isDelivered ? <i className="bi bi-check-lg text-success"/> : <i className="bi bi-x-text-danger" /> }
                            </td>
                            <td>{order.paymentMethod}</td>
                            <td>
                                <Link to={`/admin/order-details/${order._id}`}>Details</Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Col>
        </Row>
    );
};

export default AdminOrdersPageComponent;
