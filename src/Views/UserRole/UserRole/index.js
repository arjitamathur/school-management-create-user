import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import { getAllUserRole, deleteUserRole } from "../../../Services/UserRoleApi";
import { getAllClass } from "../../../Services/ClassApi";
import Topbar from "../../../Components/Header/topbar";

function UserRole() {
  const [searchTerm, setSearchTerm] = useState("");
  const [userRoleList, setUserRole] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [classList, setClass] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 3;

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  useEffect(() => {
    getUserRoles();
    getClasses();
  }, []);

  const getUserRoles = async () => {
    const response = await getAllUserRole();
    setUserRole(response.data);
 };

 

  const getClasses = async () => {
    const response = await getAllClass();
    setClass(response);
  };

  const deleteData = (id) => {
    deleteUserRole(id);
    getUserRoles();
  };

  const onAddUserRole = () => {
    window.location.href = "/add";
  };

  const onEditUserRole = (id) => {
    window.location.href = `/edit/${id}`;
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const filteredUserRole = userRoleList.filter(
    (userRole) =>
      userRole.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedRole === "" || userRole.role === selectedRole) &&
      (selectedClass === "" || userRole.class === selectedClass) &&
      (selectedStatus === "" || userRole.status === selectedStatus)


  );


  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUserRole = filteredUserRole.slice(startIndex, endIndex);

  return (
    <div>
      <Topbar />
      <Container>
        <h1> Users Information</h1>
        <Row className="py-4">
          <Col sm={4}>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search User"
                className="me-2"
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearch}
              />
              {/* <Button>
              Search
            </Button> */}
            </Form>
          </Col>

          <Col sm={2}>
            <Form.Select value={selectedRole} onChange={handleRoleChange}>
              <option value="">All Role</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </Form.Select>
          </Col>

          {/* <Col sm={2}>
            <Form.Select value={selectedClass} onChange={handleClassChange}>
              <option value="">All Classes</option>
              {classList.length && classList.map((item) => (
                <option value={item.name} key={item.id}>
                  {item.name}
                </option>
              ))}
            </Form.Select>
          </Col> */}

          <Col sm={2}>
            <Form.Select value={selectedStatus} onChange={handleStatusChange}>
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Form.Select>
          </Col>

          <Col md="auto">
            <Button variant="primary" onClick={onAddUserRole}>
              Add
            </Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Email</th>


                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUserRole.map((data) => (
                  <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.role}</td>
                    <td>{data.email}</td>


                    <td>
                      <Button
                        variant="primary"
                        style={{ margin: "0px 20px" }}
                        onClick={() => onEditUserRole(data.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        style={{ margin: "0px 20px" }}
                        onClick={() => deleteData(data.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>

        <Row>
          <Col className="d-flex justify-content-center">
            <Pagination>
              {Array.from(
                { length: Math.ceil(filteredUserRole.length / itemsPerPage) },
                (_, i) => (
                  <Pagination.Item
                    key={i + 1}
                    active={i + 1 === activePage}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                )
              )}
            </Pagination>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default UserRole;
