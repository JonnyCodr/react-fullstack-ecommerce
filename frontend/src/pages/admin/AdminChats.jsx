import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AdminChat from "../../components/admin/AdminChat";
import AdminLinks from "../../components/admin/AdminLinks";

const AdminChats = () => {
  return (
    <Row className={'m-5'}>
      <Col md={2}>
        <AdminLinks />
      </Col>
      <Col md={10}>
        <AdminChat />
      </Col>
    </Row>
  );
};

export default AdminChats;
