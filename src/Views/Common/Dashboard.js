import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Topbar from "../../Components/Header/topbar";
import { getAuthenticatedUser } from "../../Services/Auth";
import users from "../../Database/db.json"

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
 
  MDBCardBody,


  MDBCardTitle,
} from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function UserDashboard() {

  const [userProfile, setProfile] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    const userData = getAuthenticatedUser();
    if(userData){
      setProfile(userData);
    }
  };

  return (
    <div>
      <Topbar/>
    <Container>
      <h1 > Profile Information</h1>
      {/* <Row className="py-4">
        <Col sm={4}>
          <Form>
          <Form.Label>User Name</Form.Label>
            <Form.Control
              readOnly={true}
              className="me-2"
              value={userProfile.name}
            />
          </Form>
        </Col>
     </Row>
     <Row className="py-4">
        <Col sm={4}>
          <Form>
          <Form.Label>User Role</Form.Label>
            <Form.Control
              readOnly={true}
              className="me-2"
              value={userProfile.role}
            />
          </Form>
        </Col>
      </Row> */}
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="9" lg="7" xl="5" className="mt-5">
            <MDBCard style={{ borderRadius: "15px" }}>
              <MDBCardBody className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    {/* <MDBCardImage
                      style={{ width: "180px", borderRadius: "10px" }}
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                      alt="Generic placeholder image"
                      fluid
                    /> */}
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <MDBCardTitle>Name : {userProfile.name}</MDBCardTitle>
                    <MDBCardTitle>Email : {userProfile.email}</MDBCardTitle>
                    <MDBCardTitle>Class : {userProfile.class}</MDBCardTitle>
                    <div className="d-flex pt-1">
                      <Button variant="secondary" onClick={handleShow}>
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Student Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MDBCardTitle>Name : {userProfile.name}</MDBCardTitle>
          <MDBCardTitle>Email : {userProfile.email}</MDBCardTitle>
          {/* <MDBCardTitle>Subject : {teacherData.subject}</MDBCardTitle>
          <MDBCardTitle>Class : {teacherData.class}</MDBCardTitle> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    </div>
  );
}

export default UserDashboard;
