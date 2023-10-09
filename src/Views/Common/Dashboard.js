import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Topbar from "../../Components/Header/topbar";
import { getAuthenticatedUser } from "../../Services/Auth";

function UserDashboard() {
  const [userProfile, setProfile] = useState({});

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
      <h1> Profile Information</h1>
      <Row className="py-4">
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
      </Row>
    </Container>
    </div>
  );
}

export default UserDashboard;
