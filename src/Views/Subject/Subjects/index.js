import React, { useEffect, useState } from "react";
import { deleteSubject, getAllSubject } from "../../../Services/SubjectApi";
import { getAllClass } from "../../../Services/ClassApi";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";
import Topbar from "../../../Components/Header/topbar";

function Subjects() {
  const [subjectList, setSubject] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [classList, setClass] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 3;

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  useEffect(() => {
    getSubjects();
    getClasses();
  }, []);

  const getSubjects = async () => {
    const response = await getAllSubject();
    setSubject(response.data);
  };

  const getClasses = async() => {
    const response =  await getAllClass();
    setClass(response.data);
  };

  const deleteData = (id) => {
    deleteSubject(id);
    getSubjects();
  };

  const onAddSubject = () => {
    window.location.href = "/subjects/add";
  };

  const onEditSubject = (id) => {
    window.location.href = `/subjects/edit/${id}`;
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };


console.log("list" , subjectList)
  const filteredSubjects =  subjectList.filter(
    (subject) => {
      if (searchTerm !== null || searchTerm !== undefined) {
        return subject.subject.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (selectedClass === "" || subject.class === selectedClass)
      }
      return subject; 
    }
    
  );

  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedSubjects = filteredSubjects.slice(startIndex, endIndex);

  return (

    <div>
      <Topbar />
    <Container>
      <h1> Subject Information</h1>
      <Row className="py-4">
        <Col sm={4}>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search Subject"
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
            {/* <Button>Search</Button> */}
          </Form>
        </Col>
        <Col sm={2}>
          <Form.Select value={selectedClass} onChange={handleClassChange}>
            <option value="">All Classes</option>
            {classList.map((item) => (
              <option value={item.name} key={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md="auto">
          <Button variant="primary" onClick={onAddSubject}>
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
                <th>Subject Name</th>
                <th>Class Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedSubjects.map((data) => (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.subject}</td>
                  <td>{data.class}</td>
                  <td>
                    <Button
                      variant="primary"
                      style={{ margin: "0px 20px" }}
                      onClick={() => onEditSubject(data.id)}
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
              { length: Math.ceil(filteredSubjects.length / itemsPerPage) },
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

export default Subjects;
