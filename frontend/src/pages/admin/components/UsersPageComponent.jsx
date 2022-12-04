import React, {useState, useEffect} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {LinkContainer} from "react-router-bootstrap";
import AdminLinks from "../../../components/admin/AdminLinks";

const UsersPageComponent = ({ fetchUsers, deleteUser }) => {
    const [users, setUsers] = useState([]);
    const [userDeleted, setUserDeleted] = useState(false);

    useEffect(() => {
        // const abortController = new AbortController();
        fetchUsers()
            .then(res => setUsers(res))
            // .catch(err => console.log(
            //     err.response ? err.response.data : err.message
            // ));
        // return () => abortController.abort();
    }, [ userDeleted ]);

    const deleteHandler = async (userId) => {
        if(window.confirm("Are you sure?")) {
            const data = await deleteUser(userId);
            if(data === 'user deleted') {
                setUserDeleted(!userDeleted);
            }
        }
    }

    return (
        <Row className="m-5">
            <Col md={2}>
                <AdminLinks />
            </Col>
            <Col md={10}>
                <h1>User List</h1>
                <Table striped bordered hover responsive>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Is Admin</th>
                        <th>Edit/Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(
                        (user, idx) => (
                            <tr key={idx}>
                                <td>{idx +1}</td>
                                <td>{user.name}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.isAdmin ?
                                        <i className="{bi bi-check-lg text-success}"></i> :
                                        <i className="{bi bi-x-lg text-danger}"></i>
                                    }
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/edit-user${user._id}`}>
                                        <Button className="btn-sm">
                                            <i className="bi bi-pencil-square"></i>
                                        </Button>
                                    </LinkContainer>
                                    {" / "}
                                    <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(user._id)}>
                                        <i className="bi bi-x-circle"></i>
                                    </Button>
                                </td>
                            </tr>
                        )
                    )}
                    </tbody>
                </Table>
            </Col>
        </Row>
    );
};

export default UsersPageComponent;
