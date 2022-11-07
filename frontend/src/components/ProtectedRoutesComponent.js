import React from 'react';
import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoutesComponent = ({ admin }) => {
  let auth = false
  if (auth) {
    let adminAuth = true
    if (adminAuth) auth = true
  } else {
    let userAuth = true
    if (userAuth) auth = true
  }
  return auth ? <Outlet /> : <Navigate to="/login" />
};

export default ProtectedRoutesComponent;
