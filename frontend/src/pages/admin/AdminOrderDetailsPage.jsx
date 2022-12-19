import React from 'react';
import AdminOrderDetailsComponent from "./components/AdminOrderDetailsComponent";

import axios from "axios";

const getOrder = async (orderId) => {
  const { data } = await axios.get(`/api/orders/user/${orderId}`)
  if (data) {
    return data
  }
}

const markAsDelivered = async (id) => {
  const { data } = await axios.put(`/api/orders.delivered/${id}`)
}


const AdminOrderDetailsPage = () => {
  return <AdminOrderDetailsComponent getOrder={getOrder} markAsDelivered={markAsDelivered} />
};

export default AdminOrderDetailsPage;
