import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as formik from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getAllClass } from "../../../Services/ClassApi";
import { getAllSubject } from "../../../Services/SubjectApi";
import { addUserRole } from "../../../Services/UserRoleApi";
import Topbar from "../../../Components/Header/topbar";
import { UserRoles } from "../../../Services/Auth";

const INACTIVE = "inactive";
const ACTIVE = "active";
const TEACHER = "teacher";
const STUDENT = "student";

export const UserRoleStatus = Object.freeze({
  INACTIVE: INACTIVE,
  ACTIVE: ACTIVE,
});

export const UserRole = Object.freeze({
  TEACHER: TEACHER,
  STUDENT: STUDENT,
});

function AddUserRole() {
  const { Formik } = formik;
  const navigate = useNavigate();

  const [classList, setClass] = useState([]);
  const [subjectList, setSubject] = useState([]);

  useEffect(() => {
    getClasses();
    getSubjects();
  }, []);

  const getClasses = () => {
    const response = getAllClass();
    setClass(response);
  };

  const getSubjects = () => {
    const response = getAllSubject();
    setSubject(response);
  };

 const handaleFormSubmit = async (e) => {
   const selectedRole = e.role; 

   let roleValue;

   if (selectedRole === TEACHER) {
     roleValue = UserRoles.TEACHER;
   } else if (selectedRole === STUDENT) {
     roleValue = UserRoles.STUDENT;
   } 

   addUserRole({ ...e, role: roleValue });
   navigate("/userrole");
    };
    
    


  const validateSubjects = (values) => {
    const selectedSubjects = values.subjects;
    return selectedSubjects.length > 0
      ? {}
      : { subjects: "Please select at least one subject" };
  };

  const SpaceBlock = (e) => {
    if (e.target.selectionStart === 0 && e.code === "Space") {
      e.preventDefault();
    }
  };

  const getValues = (a, b, c) => {
    console.log(a, b, c);
  };

  const schema = yup.object().shape({
    name: yup.string().required(),
   
    class: yup.string().required(),
    status: yup.string().required(),
    subjects: yup
      .array()
      .required()
      .min(1, "Please select at least one subject"),
    email: yup.string().required(),
    password: yup.string().required(),
  });

  return (
    <div>
      <Topbar />
      <Container>
        <Row>
          <Col>
            <Formik
              validationSchema={schema}
              validate={validateSubjects}
              onSubmit={handaleFormSubmit}
              initialValues={{
                name: "",
                mobile: "",
                class: "",
                subjects: [],
                status: UserRoleStatus.ACTIVE,
                email: "",
                password: "",
              }}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  {getValues(values, touched, errors)}
                  <Row className="my-3">
                    <Form.Group as={Col} md="4" className="position-relative">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        onKeyDown={SpaceBlock}
                        value={values.name}
                        onChange={handleChange}
                        isValid={touched.name && !errors.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* <Form.Group as={Col} md="4" className="position-relative">
                      <Form.Label> Mobile</Form.Label>
                      <Form.Control
                        type="text"
                        name="mobile"
                        onKeyDown={SpaceBlock}
                        value={values.mobile}
                        onChange={handleChange}
                        isValid={touched.mobile && !errors.mobile}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.mobile}
                      </Form.Control.Feedback>
                    </Form.Group> */}

                    <Form.Group as={Col} className="position-relative">
                      <Form.Label> Status</Form.Label>
                      <Form.Select
                        name="status"
                        aria-label="Default select example"
                        value={values.status}
                        onChange={handleChange}
                        isValid={touched.status && !errors.status}
                      >
                        <option>Select status</option>
                        <option value={INACTIVE}>Inactive</option>
                        <option value={ACTIVE}>Active</option>
                      </Form.Select>

                      <Form.Control.Feedback type="invalid">
                        Please choose valid status.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} className="position-relative">
                      <Form.Label> Role</Form.Label>
                      <Form.Select
                        name="role"
                        aria-label="Default select example"
                        value={values.role}
                        onChange={handleChange}
                        isValid={touched.role && !errors.role}
                      >
                        <option>Select role</option>
                        <option value={TEACHER}>Teacher</option>
                        <option value={STUDENT}>Student</option>
                      </Form.Select>

                      <Form.Control.Feedback type="invalid">
                        Please choose valid role.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="my-3">
                    <Form.Group as={Col} md="4" className="position-relative">
                      <Form.Label> Email</Form.Label>
                      <Form.Control
                        type="text"
                        name="email"
                        onKeyDown={SpaceBlock}
                        value={values.email}
                        onChange={handleChange}
                        isValid={touched.email && !errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" className="position-relative">
                      <Form.Label> Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        onKeyDown={SpaceBlock}
                        value={values.password}
                        onChange={handleChange}
                        isValid={touched.password && !errors.password}
                      />
                    </Form.Group>
                  </Row>

                  <Row className="my-3">
                    {/* Get the classes and Subjects */}

                    <Form.Group
                      as={Col}
                      controlId="validationFormik101"
                      className="position-relative md-4"
                    >
                      <Form.Label>Class Assigned</Form.Label>
                      <Form.Select
                        name="class"
                        value={values.class}
                        onChange={handleChange}
                        isValid={touched.class && !errors.class}
                        aria-label="Default select example"
                      >
                        <option>Select class</option>
                        {classList
                          ? classList.map((item) => (
                              <option value={item.name} key={item.id}>
                                {item.name}
                              </option>
                            ))
                          : ""}
                      </Form.Select>
                    </Form.Group>
                  </Row>
                  <Row className="my-3">
                    {/* Add subjects checkboxes */}
                    {values.class ? (
                      <Form.Group
                        as={Col}
                        controlId="validationFormik101"
                        className="position-relative md-4"
                      >
                        <Form.Label>Assign Subject</Form.Label>
                        <br></br>
                        {subjectList
                          ? subjectList
                              .filter((item) => item.class === values.class)
                              .map((item) => (
                                <Form.Check
                                  inline
                                  label={item.subject}
                                  name="subjects"
                                  type="checkbox"
                                  id={`inline-${item.id}-1`}
                                  key={item.id}
                                  onChange={handleChange}
                                  value={item.subject}
                                />
                              ))
                          : ""}
                      </Form.Group>
                    ) : (
                      ""
                    )}
                  </Row>

                  <Row className="my-2">
                    <Col>
                      <Button type="submit">Submit</Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AddUserRole;
