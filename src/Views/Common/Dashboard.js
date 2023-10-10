import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Topbar from "../../Components/Header/topbar";
import { getAuthenticatedUser } from "../../Services/Auth";


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
      
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="9" lg="7" xl="5" className="mt-5">
            <MDBCard style={{ borderRadius: "15px" }}>
              <MDBCardBody className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                  
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
          <Modal.Title>Your Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MDBCardTitle>Name : {userProfile.name}</MDBCardTitle>
          <MDBCardTitle>Email : {userProfile.email}</MDBCardTitle>
        
        </Modal.Body>
      
      </Modal>
    </Container>
    </div>
  );
}

export default UserDashboard;
