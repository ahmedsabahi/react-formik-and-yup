import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Col, Form, Row } from "react-bootstrap";

/**
 * LoginForm Component
 */
const LoginForm = () => {
  const initialValues = {
    userName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    gender: "other",
    active: false,
  };
  const onSubmit = (values) => console.log(JSON.stringify(values, null, 4));
  const validationSchema = yup.object({
    userName: yup
      .string()
      .required("userName field is required")
      .matches(
        /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
        " username is 8-20 characters long, no _ or . at the beginning, no __ or _. or ._ or .. inside, no _ or . at the end"
      ),
    email: yup
      .string()
      .required("Email field is required")
      .email("Please enter a valid email address"),
    password: yup
      .string()
      .required("Password is required!")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .max(10, "Password is too BIG - should be 10 chars maximum.")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    passwordConfirmation: yup
      .string()
      .required("Password confirmation is required!")
      .oneOf([yup.ref("password")], "Passwords must match"),
    gender: yup.string().required("gender field is required"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  return (
    <form onSubmit={formik.handleSubmit} className=" bg-light ">
      <div className="container bg-secondary py-4 w-50">
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            {...formik.getFieldProps("userName")}
          />
          {formik.touched.userName && formik.errors.userName && (
            <div style={{ color: "red" }}>{formik.errors.userName}</div>
          )}
        </Form.Group>

        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <div style={{ color: "red" }}>{formik.errors.email}</div>
          )}
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password && (
            <div style={{ color: "red" }}>{formik.errors.password}</div>
          )}
        </Form.Group>

        <Form.Group>
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...formik.getFieldProps("passwordConfirmation")}
          />
          {formik.touched.passwordConfirmation &&
            formik.errors.passwordConfirmation && (
              <div style={{ color: "red" }}>
                {formik.errors.passwordConfirmation}
              </div>
            )}
        </Form.Group>

        <fieldset>
          <Form.Group as={Row} {...formik.getFieldProps("gender")}>
            <Form.Label as="legend" column sm={2}>
              Gender
            </Form.Label>
            <Col sm={10}>
              <Form.Check
                type="radio"
                label="Male"
                name="gender"
                id="male"
                value="male"
              />
              <Form.Check
                type="radio"
                label="Female"
                name="gender"
                id="female"
                value="female"
              />
              <Form.Check
                type="radio"
                label="Other"
                name="gender"
                id="other"
                value="other"
              />
            </Col>
            {formik.touched.gender && formik.errors.gender && (
              <div style={{ color: "red" }}>{formik.errors.gender}</div>
            )}
          </Form.Group>
        </fieldset>

        <Form.Group>
          <Form.Check
            type="checkbox"
            label="Active"
            {...formik.getFieldProps("active")}
          />
        </Form.Group>

        <Button variant="danger" type="submit" size="lg" block>
          Submit
        </Button>
      </div>

      <pre>{JSON.stringify(formik, null, 4)}</pre>
    </form>
  );
};
export default LoginForm;
