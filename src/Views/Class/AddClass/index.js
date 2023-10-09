import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { addClass, getAllClass } from "../../../Services/ClassApi";
import { useFormik } from "formik";
import Topbar from "../../../Components/Header/topbar";


const INACTIVE = "inactive";
const ACTIVE = "active";

export const ClassStatus = Object.freeze({
  INACTIVE: INACTIVE,
  ACTIVE: ACTIVE,
});

function AddClass() {
  const navigate = useNavigate();


  const checkIfClassExists = async (name) => {
    const response =await getAllClass();
    const existingClasses = response.data ;
    return existingClasses.find(
      (cls) => cls.name.toLowerCase() === name.toLowerCase()
    );
    
  };

  const SpaceBlock = (e) => {
    if (e.target.selectionStart === 0 && e.code === "Space") {
      e.preventDefault();
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      status: ClassStatus.ACTIVE,
    },
    validationSchema: yup.object().shape({
      status: yup.string().required(),
      name: yup
        .number()
        .min(1, "Class must be between 1 and 12")
        .max(12, "Class must be between 1 and 12")
        .positive("Class must be a positive number")
        .integer("Class must be a whole number")
        .required()
        .test(
          "is-valid-class",
          "Please choose class between 1 and 12 only",
          (value) => {
            return value >= 1 && value <= 12;
          }
        ),
    }),
    onSubmit: async (values, { setFieldError }) => {
      const { name } = values;

      const isClassAlreadyExists = await checkIfClassExists(name);
      console.log("class",isClassAlreadyExists)

      if (isClassAlreadyExists) {
        setFieldError("name", "This class already exists.");
      } else if (name < 1 || name > 12) {
        setFieldError("name", "Please choose class between 1 and 12 only");
      } else {
        await addClass(values);
        navigate("/class");
      }
    },
  });
  return (
    <div>
      <Topbar />
    <Container>
      <Row>
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
      </Row>
    </Container>
    </div>
  );
}

export default AddClass;
