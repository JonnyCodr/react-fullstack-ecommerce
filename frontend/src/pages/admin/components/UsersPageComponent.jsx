import React, {useEffect} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {LinkContainer} from "react-router-bootstrap";
import AdminLinks from "../../../components/admin/AdminLinks";

const UsersPageComponent = ({ fetchUsers }) => {
    const [users, setUsers] = React.useState([]);

    useEffect(() => {
        // const abortController = new AbortController();
        fetchUsers()
            .then(res => setUsers(res))
            // .catch(err => console.log(
            //     err.response ? err.response.data : err.message
            // ));
        // return () => abortController.abort();
    }, []);

    const deleteHandler = () => {
        if(window.confirm("Are you sure?")) alert("User deleted!");
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
                                    <Button variant="danger" className="btn-sm" onClick={deleteHandler}>
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
