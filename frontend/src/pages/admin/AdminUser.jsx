import React from 'react';
import UsersPageComponent from "./components/UsersPageComponent";
import axios from "axios";

// const fetchUsers = async ( abortController ) => {
const fetchUsers = async () => {
    const { data } =
        await axios.get(
            "/api/users",
            // { signal: abortController.signal }
        );
    return data;
}
const AdminUsersPage = () => {
    return <UsersPageComponent fetchUsers={fetchUsers} />;
};

export default AdminUsersPage;
