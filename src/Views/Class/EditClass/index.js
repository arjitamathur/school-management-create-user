import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { getAllClass, editClass } from "../../../Services/ClassApi";
import { useFormik } from "formik";
import Topbar from "../../../Components/Header/topbar";

const INACTIVE = "inactive";
const ACTIVE = "active";

export const ClassStatus = Object.freeze({
  INACTIVE: INACTIVE,
  ACTIVE: ACTIVE,
});

function EditClass() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [classDetail, setClassDetail] = useState([]);


  useEffect(() => {
    getDetail();
  }, [id]);

  const getDetail = async () => {
    if (id) {
      const response =await getAllClass(id);
      setClassDetail(response.data);
    }
  };



  const checkIfClassExists = async (name) => {
    const existingClasses = await getAllClass();
    return existingClasses.some(
      (cls) => cls.name.toLowerCase() === name.toLowerCase()
    );
  };


   const SpaceBlock = (e) => {
     if (e.target.selectionStart === 0 && e.code === "Space") {
       e.preventDefault();
     }
   };


  const formik = useFormik({
    initialValues:  {classDetail},
    validationSchema: yup.object().shape({
      name: yup
        .number()
        .min(1, "Class must be between 1 and 12")
        .max(12, "Class must be between 1 and 12")
        .positive("Class must be a positive number")
        .integer("Class must be a whole number")
        .required("Please provide class name")
        .test(
          "is-valid-class",
          "Please choose class between 1 and 12 only",
          (value) => {
            return value >= 1 && value <= 12;
          }
        ),
      status: yup.string().required("Please choose valid status."),
    }),
    onSubmit: async (values) => {
      const { name } = values;
      const isClassAlreadyExists = checkIfClassExists(name);

      if (isClassAlreadyExists) {
        formik.setFieldError("name", "This class already exists.");
      } else if (name < 1 || name > 12) {
        formik.setFieldError(
          "name",
          "Please choose class between 1 and 12 only"
        );
      } else {
       await editClass(id, values);
        navigate("/class/list");
      }
    },
  });

  return (
    <div>
      <Topbar/>
    <Container>
      <Row>
        {classDetail ? (
          <Col>
            <Form noValidate onSubmit={formik.handleSubmit}>
              <Row className="mt-3">
                <Form.Group as={Col} className="position-relative">
                  <Form.Label> Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    onKeyDown={SpaceBlock}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isValid={formik.touched.name && !formik.errors.name}
                    isInvalid={formik.touched.name && formik.errors.name}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} className="position-relative">
                  <Form.Label> Status</Form.Label>
                  <Form.Select
                    name="status"
                    aria-label="Default select example"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
              <Row className="mt-2">
                <Col>
                  <Button type="submit">Submit form</Button>
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

export default EditClass;
