import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getAllClass } from "../../../Services/ClassApi";
import { getAllSubject } from "../../../Services/SubjectApi";
import { getAllStudent, editStudent } from "../../../Services/StudentApi";
import { useParams } from 'react-router-dom';
import { useFormik } from "formik";
import Topbar from "../../../Components/Header/topbar";

const INACTIVE = "inactive";
const ACTIVE = "active";

export const StudentStatus = Object.freeze({
  INACTIVE: INACTIVE,
  ACTIVE: ACTIVE,
});

function EditStudents() {

  const { id } = useParams();
  console.log('----', id)
  const navigate = useNavigate();

  const [classList, setClass] = useState([]);
  const [subjectList, setSubject] = useState([]);
  const [studentDetail, setStudentDetail] = useState(null);



  useEffect(() => {
    getStudentDetail();
    getSubjects();
    getClasses();
  }, [])

  const getStudentDetail = () => {
    const response = getAllStudent(id);
    setStudentDetail(response);
  }

  const getClasses = () => {
    const response = getAllClass();
    setClass(response);
  }


  const getSubjects = () => {
    const response = getAllSubject();
    setSubject(response);
  }


  // const handaleFormSubmit = async (e) => {

    // editStudent(id, e)
    // navigate('/students');

  // }

  const SpaceBlock = (e) => {
    if (e.target.selectionStart === 0 && e.code === "Space") {
      e.preventDefault();
    }
  };

  const formik = useFormik({
    initialValues: {
     studentDetail
    },
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .matches(/^[a-zA-Z ]+$/, "Name must contain only alphabets and spaces")
        .required("Please enter a name"),
      mobile: yup
        .string()
        .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
        .required("Please enter a mobile number"),
      class: yup.string().required("Please select a class"),
      status: yup.string().required("Please select a status"),
      subjects: yup
        .array()
        .required("Please select at least one subject")
        .min(1, "Please select at least one subject"),
    }),
    onSubmit: async (values, { setFieldError }) => {
      const { mobile, name } = values;

      const isMobileValid = /^\d{10}$/.test(mobile);
      if (!isMobileValid) {
        setFieldError("mobile", "Phone number must be exactly 10 digits");
      }

      const isNameValid = /^[a-zA-Z ]+$/.test(name);
      if (!isNameValid) {
        setFieldError("name", "Name must contain only alphabets and spaces");
      }

      const isSubjectsValid = values.subjects.length > 0;
      if (!isSubjectsValid) {
        setFieldError("subjects", "Please select at least one subject");
      }

      if (isMobileValid && isNameValid && isSubjectsValid) {
        // Perform submission logic here
         editStudent(id, values);
         navigate("/students");
      }
    },
  });

  return (
    <div>
      <Topbar/>
    <Container>
      <Row>
        {studentDetail ? (
          <Col>
            <Form noValidate onSubmit={formik.handleSubmit}>
            <Row className="my-3">
              <Form.Group as={Col} md="4" className="position-relative">
                <Form.Label> Student Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  onKeyDown={SpaceBlock}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  isValid={formik.touched.name && !formik.errors.name}
                  isInvalid={formik.touched.name && formik.errors.name}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" className="position-relative">
                <Form.Label> Mobile</Form.Label>
                <Form.Control
                  type="text"
                  name="mobile"
                  onKeyDown={SpaceBlock}
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  isValid={formik.touched.mobile && !formik.errors.mobile}
                  isInvalid={formik.touched.mobile && formik.errors.mobile}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.mobile}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} className="position-relative">
                <Form.Label> Status</Form.Label>
                <Form.Select
                  name="status"
                  aria-label="Default select example"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  isValid={formik.touched.status && !formik.errors.status}
                  isInvalid={formik.touched.status && formik.errors.status}
                  required
                >
                  <option>Select status</option>
                  <option value={INACTIVE}>Inactive</option>
                  <option value={ACTIVE}>Active</option>
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {formik.errors.status}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

{/* <Row className="my-3">
                  <Form.Group
                    as={Col}
                    md="4"
                    className="position-relative"
                  >
                    <Form.Label> Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      onKeyDown={SpaceBlock}
                      value={values.name}
                      onChange={handleChange}
                      isValid={touched.name && !errors.name}
                    />
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    md="4"
                    className="position-relative"
                  >
                    <Form.Label> Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      onKeyDown={SpaceBlock}
                      value={values.name}
                      onChange={handleChange}
                      isValid={touched.name && !errors.name}
                    />
                  </Form.Group>

                  </Row> */}



            <Row className="my-3">
              {/* Get the classes and Subjects */}

              <Form.Group
                as={Col}
                controlId="validationFormik101"
                className="position-relative md-4"
              >
                <Form.Label>Class Name</Form.Label>
                <Form.Select
                  name="class"
                  value={formik.values.class}
                  onChange={formik.handleChange}
                  isValid={formik.touched.class && !formik.errors.class}
                  isInvalid={formik.touched.class && formik.errors.class}
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
                <Form.Control.Feedback type="invalid">
                  {formik.errors.class}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="my-3">
              {/* Add subjects checkboxes */}
              {formik.values.class ? (
                <Form.Group
                  as={Col}
                  controlId="validationFormik101"
                  className="position-relative md-4"
                >
                  <Form.Label>Subjects</Form.Label>
                  <br></br>
                  {subjectList
                    ? subjectList
                        .filter((item) => item.class === formik.values.class)
                        .map((item) => (
                          <Form.Check
                            inline
                            label={item.subject}
                            name="subjects"
                            type="checkbox"
                            id={`inline-${item.id}-1`}
                            key={item.id}
                            onChange={formik.handleChange}
                            value={formik.values.subjects}
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
        </Col>
        ) : (
          "No record found"
        )}
      </Row>
    </Container>
    </div>
  );
}

export default EditStudents;
