import React, { useEffect, useState } from "react";
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



export default function TeacherCom({ users }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    console.log(users);
  });
  return (
    <div className="vh-100" style={{ backgroundColor: "#9de2ff" }}>
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="9" lg="7" xl="5" className="mt-5">
            <MDBCard style={{ borderRadius: "15px" }}>
              <MDBCardBody className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
            
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <MDBCardTitle>Name : {users.name}</MDBCardTitle>
                    <MDBCardTitle>Email : {users.email}</MDBCardTitle>
                    <MDBCardTitle>Class : {users.class}</MDBCardTitle>
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
          <MDBCardTitle>Name : {users.name}</MDBCardTitle>
          <MDBCardTitle>Email : {users.email}</MDBCardTitle>
          {/* <MDBCardTitle>Subject : {teacherData.subject}</MDBCardTitle>
          <MDBCardTitle>Class : {teacherData.class}</MDBCardTitle> */}
        </Modal.Body>
        </Modal>
    </div>
  );
}
