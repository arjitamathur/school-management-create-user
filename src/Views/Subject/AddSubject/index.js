import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik"; 
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getAllClass } from "../../../Services/ClassApi";
import { addSubject } from "../../../Services/SubjectApi";
import Topbar from "../../../Components/Header/topbar";
import Breadcrumb from "react-bootstrap/Breadcrumb";

function AddSubject() {
  const navigate = useNavigate();
  const maxSubjectField = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [subjectField, setSubjectField] = useState(1);
  const [subjectValues, setSubjectValues] = useState({});

  const schema = yup.object().shape({
    class: yup.string().required(),
  });

  const handleFormSubmit = async (values) => {
    const subjects = [];
    maxSubjectField.forEach((item) => {
      if (item <= subjectField) {
        subjects.push(values[`subject_${item}`]);
      }
    });

    console.log(values);

    maxSubjectField.forEach(async (item) =>  {
      if (item <= subjectField) {
        const data = {
          class: values.class,
          subject: values[`subject_${item}`],
        };
        await addSubject(data);
      }
    });

    navigate("/subjects");
  }



  const formik = useFormik({
    initialValues: {
      class: "",
      ...subjectValues,
    },
    validationSchema: schema,
    validate: validate, 
    onSubmit: handleFormSubmit,
  });

  function validate(values) {
    const errors = {};
  
    // Check for duplicate subjects
    const subjectArray = maxSubjectField
      .filter((item) => item <= subjectField)
      .map((item) => values[`subject_${item}`]);
  
    const isDuplicate = new Set(subjectArray).size !== subjectArray.length;
  
    if (isDuplicate) {
      maxSubjectField.forEach((item) => {
        if (item <= subjectField) {
          errors[`subject_${item}`] = "Duplicate subjects are not allowed";
        }
      });
    }
  
    // Check for spaces-only subject names
    maxSubjectField.forEach((item) => {
      if (item <= subjectField) {
        const subjectValue = values[`subject_${item}`] || "";
        if (/^\s+$/.test(subjectValue)) {
          errors[`subject_${item}`] = "Subject name cannot be spaces only";
        }
        
        if (/[!@#$%^&*(),.?":{}|<>]/.test(subjectValue)) {
          errors[`subject_${item}`] = "Special characters are not allowed in subject name";
        }
      }
    });
  
    return errors;
  }
  

 

  const [classList, setClass] = useState([]);
  useEffect(() => {
    getClasses();
  }, []);

  const getClasses = async () => {
    const response = await getAllClass();
    setClass(response.data);
  };

  const handleAddSubjectInput = () => {
    const subjectF = subjectField + 1;
    setSubjectField(subjectF);

    setSubjectValues((prevValues) => {
      return {
        ...prevValues,
        [`subject_${subjectF}`]: "",
      };
    });
  };

  const handleRemoveSubjectInput = (index) => {
    const newValues = { ...subjectValues };
    delete newValues[`subject_${index}`];
    setSubjectValues(newValues);

    if (subjectField === index) {
      setSubjectField(subjectField - 1);
    }
  };

  return (
    <div>
      <Topbar/>
    <Container>
    <Breadcrumb>
          <Breadcrumb.Item href="/subjects">Subjects</Breadcrumb.Item>
          <Breadcrumb.Item active>Add Subjects</Breadcrumb.Item>

        </Breadcrumb>
      <Row>
        <Col>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Row className="my-3">
              <Form.Group
                as={Col}
                controlId="validationFormik101"
                className="position-relative"
              >
                <Form.Label>Class Name</Form.Label>
                <Form.Select
                  name="class"
                  value={formik.values.class}
                  onChange={formik.handleChange}
                  isValid={formik.touched.class && !formik.errors.class}
                  required
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

              <Form.Group
                as={Col}
                controlId="validationFormik102"
                className="position-relative"
              >
                <Form.Label>Subject</Form.Label>

                <div className="col-md-5">
                  {maxSubjectField
                    .filter((item) => item <= subjectField)
                    .map((item) => (
                      <div key={item} className="input-group mb-2">
                        <input
                          className={`form-control ${
                            formik.touched[`subject_${item}`] &&
                            formik.errors[`subject_${item}`]
                              ? "is-invalid"
                              : ""
                          }`}
                          type="text"
                          name={`subject_${item}`}
                          placeholder={`Subject ${item}`}
                          value={
                            formik.values[`subject_${item}`] ||
                            subjectValues[`subject_${item}`] ||
                            ""
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur} 
                        />

                        {formik.touched[`subject_${item}`] &&
                        formik.errors[`subject_${item}`] ? (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors[`subject_${item}`]}
                          </Form.Control.Feedback>
                        ) : null}
                        {item === 1 && (
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={handleAddSubjectInput}
                          >
                            +
                          </button>
                        )}
                        {item > 1 && (
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleRemoveSubjectInput(item)}
                          >
                            -
                          </button>
                        )}
                      </div>
                    ))}
                </div>
              </Form.Group>
            </Row>
            <Row className="my-2">
              <Col>
                <Button type="submit">Add</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default AddSubject;
