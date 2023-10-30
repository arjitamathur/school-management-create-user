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
import { getAllUserRole, editUserRole } from "../../../Services/UserRoleApi";
import Topbar from "../../../Components/Header/topbar";
import { UserRoles } from "../../../Services/Auth";
import { useParams } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import Breadcrumb from "react-bootstrap/Breadcrumb";


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

    function EditUserRole() {
      const { Formik } = formik;
      const { id } = useParams();
      const navigate = useNavigate();

      const [classList, setClass] = useState([]);
      const [subjectList, setSubject] = useState([]);
      const [userroleDetail, setUserRoleDetail] = useState(null);

  useEffect(() => {
    getUserRoleDetail();
    getClasses();
    getSubjects();
  }, []);


  const [touchedFields, setTouchedFields] = useState({});
  const [showPassword, setShowPassword] = useState(false);



  const getUserRoleDetail = async() => {
    const response = await getAllUserRole(id);
    setUserRoleDetail(response.data);
  };

  const getClasses = async () => {
    const response = await getAllClass();
    setClass(response.data);
  };

  const getSubjects = async () => {
    const response = await  getAllSubject();
    setSubject(response.data);
  };

  const handaleFormSubmit = async (e) => {
    console.log("e------",e)
    const selectedRole = e.role;

    let roleValue;

    if (selectedRole === TEACHER) {
      roleValue = UserRoles.TEACHER;
    } else if (selectedRole === STUDENT) {
      roleValue = UserRoles.STUDENT;
    }

    await editUserRole({ id, ...e, role: roleValue });
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
    name: yup.string().required("Name is required")
    .matches(/^[A-Za-z]+$/, "Name must contain only alphabets")
    .max(30, "Name must not exceed 30 characters"),

    class: yup.string().required(),
    status: yup.string().required(),
    subjects: yup
      .array()
      .required()
      .min(1, "Please select at least one subject"),
    email: yup.string() 
    .required("Email is required")
    .email("Invalid email format")
    .matches(/@/, "Email must include @ symbol")
    .max(30, "Email must not exceed 30 characters"),
    password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters") 
    .max(10, "Password must not exceed 10 characters") 
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])/,
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 special character, and be 8-10 characters long"
    ),
  });

  return (
    <div>
      <Topbar />
      <Container>
        <Row>
        <Breadcrumb>
          <Breadcrumb.Item href="/userrole">User Roles</Breadcrumb.Item>
          <Breadcrumb.Item active>Edit User Role</Breadcrumb.Item>

        </Breadcrumb>
          {userroleDetail ? (
            <Col>
              <Formik
                validationSchema={schema}
                validate={validateSubjects}
                onSubmit={handaleFormSubmit}
                initialValues={userroleDetail}
              >
                {({ handleSubmit, handleChange, values,handleBlur,  touched, errors }) => (
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
                          onBlur={(e) => {
                            handleBlur(e);
                            setTouchedFields({ ...touchedFields, name: true });
                          }}
                          isValid={touched.name && !errors.name}
                        />
                        {touchedFields.name && errors.name && (
                        <div className="error-message">{errors.name}</div>
                      )}
                      </Form.Group>

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
                          onBlur={(e) => {
                            handleBlur(e);
                            setTouchedFields({ ...touchedFields, email: true });
                          }}
                          isValid={touched.email && !errors.email}
                        />
                         {touchedFields.email && errors.email && (
                        <div className="error-message">{errors.email}</div>
                      )}
                      </Form.Group>

                      {/* <Form.Group as={Col} md="4" className="position-relative">
                        <Form.Label> Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          onKeyDown={SpaceBlock}
                          value={values.password}
                          onChange={handleChange}
                          isValid={touched.password && !errors.password}
                        />
                      </Form.Group> */}

<Form.Group as={Col} md="4" className="position-relative">
                      <Form.Label> Password</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          name="password"
                          onKeyDown={SpaceBlock}
                          value={values.password}
                          onChange={handleChange}
                          onBlur={(e) => {
                            handleBlur(e);
                            setTouchedFields({ ...touchedFields, password: true });
                          }}
                          isValid={touched.password && !errors.password}
                        />
                   
                        <Button
                          variant="outline-secondary"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </InputGroup>
                      {/* {touched.password && errors.password && ( */}
                              {touchedFields.password && errors.password && (
                                <div className="error-message">{errors.password}</div>
                              )}
                      
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
                                    checked={values.subjects.includes(item.subject)}
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
                        <Button type="submit">Edit</Button>
                      </Col>
                    </Row>
                    
                  </Form>
                )}
              </Formik>
            </Col>
          ) : (
            " No record found"
          )}
        </Row>
      </Container>
    </div>
  );
}

export default EditUserRole;
