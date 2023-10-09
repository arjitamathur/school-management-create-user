import React, { useEffect, useState } from "react";
import { getAllClass } from "../../../Services/ClassApi";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";
import Topbar from "../../../Components/Header/topbar";

// Class Main listing component
function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [classList, setClass] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 3;

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  useEffect(() => {
    getClasses();
  }, []);

  const getClasses = async () => {
    const response = await getAllClass();
    setClass(response.data);
  };

  const onAddClass = () => {
    window.location.href = "/class/add";
  };

  const onEditClass = (id) => {
    window.location.href = `/class/edit/${id}`;
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filteredClasses = classList.filter(
    (classItem) =>
      classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedStatus === "" || classItem.status === selectedStatus)
  );

  const classesOnCurrentPage = filteredClasses.slice(startIndex, endIndex);

  return (
   <div>
    <Topbar />
    <Container>
      <h1> Class Information</h1>
      <Row className="py-4">
        <Col sm={4}>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search Class"
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Form.Select value={selectedStatus} onChange={handleStatusChange}>
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Form.Select>
            {/* <Button>
              Search
            </Button> */}
          </Form>
        </Col>

        <Col md="auto">
          <Button variant="primary" onClick={onAddClass}>
            Add +
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Class Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {classesOnCurrentPage.map((data) => (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.status}</td>
                  <td>
                    <Button
                      variant="primary"
                      style={{ margin: "0px 20px" }}
                      onClick={() => onEditClass(data.id)}
                    >
                      Edit
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
              { length: Math.ceil(filteredClasses.length / itemsPerPage) },
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

export default Dashboard;
