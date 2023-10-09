import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as formik from "formik";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getAllSubject, editSubject } from "../../../Services/SubjectApi";
import { getAllClass } from "../../../Services/ClassApi";


import { useParams } from 'react-router-dom';
import Topbar from "../../../Components/Header/topbar";

function EditSubject() {
  const { Formik } = formik;
  const { id } = useParams();
  console.log('----', id)
  const navigate = useNavigate();
  const [subjectDetail, setSubjectDetail] = useState(null);

  const schema = yup.object().shape({
    class: yup.string().required(),
  });


  const [classList, setClass] = useState([]);
  useEffect(() => {
    getSubjectDetail();
    getClasses();
  }, [])

  const getSubjectDetail = async () => {
    const response = await getAllSubject(id);
    setSubjectDetail(response.data);
  }

  const getClasses = async () => {
    const response = await getAllClass();
    setClass(response.data);
  }


  const handaleFormSubmit = async (e) => { //no multiple subjects , save individual subjects

   await  editSubject(id, e)
    navigate('/subjects');

  }

  return (
    <div>
    <Topbar />
    <Container>
      <Row>

      {
          subjectDetail ? 

        <Col>
          <Formik
            validationSchema={schema}
            onSubmit={handaleFormSubmit}
            initialValues={
              subjectDetail
            }
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row className="my-3">
                  <Form.Group
                    as={Col}
                    controlId="validationFormik101"
                    className="position-relative"
                  >
                    <Form.Label>Class Name</Form.Label>
                    <Form.Select
                      name="class"
                      value={values.class}
                      onChange={handleChange}
                      isValid={touched.class && !errors.class}
                      required
                      aria-label="Default select example">
                      <option>Select class</option>
                      {
                        classList ? classList.map((item) => (
                          <option value={item.name} key={item.id}>{item.name}</option>
                        ))
                          : ''
                      }
                    </Form.Select>
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    controlId="validationFormik102"
                    className="position-relative"
                  >
                    <Form.Label>Subject</Form.Label>


                    <Form.Control
                      type="text"
                      placeholder="Subject Name"
                      name="subject"
                      value={values.subject}
                      onChange={handleChange}
                      isValid={touched.subject && !errors.subject}



                      
                    />




                  </Form.Group>
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
        : "Please Wait ..." }
      </Row>
    </Container>
    </div>
  );
}

export default EditSubject;
