import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../../redux/features/auth/authSlice";
import ClipLoader from "react-spinners/ClipLoader";
import Select from "react-select";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { countryList } from "../../utils/data.js";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  const countryOptions = countryList.map((country) => ({
    value: country,
    label: country,
  }));

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const initialValues = {
    username: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    password: "",
    confirmePassword: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalide email format")
      .required("Email adress is required"),
    phone: Yup.string().required("Phone is required"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    password: Yup.string().required("Password is required"),
    confirmePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirme Password is required"),
  });

  const onSubmit = (values) => {
    const formData = {
      username: values.username,
      email: values.email,
      phone: values.phone,
      country: values.country,
      city: values.city,
      password: values.password,
    };

    dispatch(register(formData));
  };

  const SelectField = ({ options, field, form }) => (
    <Select
      options={countryOptions}
      name={field.name}
      value={
        countryOptions
          ? options.find((option) => option.value === field.value)
          : ""
      }
      onChange={(option) => form.setFieldValue(field.name, option.value)}
      onBlur={field.onBlur}
    />
  );

  return (
    <div className="auth relative flex justify-center items-center h-full before:absolute before:left-0 before:right-0 before:bg-blue/40 before:w-full before:h-full">
      <div className="card z-10 my-10 w-[40%]">
        <h2 className="text-center mb-5 text-dark text-[1.8rem]">Sign up</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="flex flex-col gap-4">
            <div>
              <Field
                type="text"
                placeholder="Username"
                name="username"
                className="input"
              />
              <div className="error-validation">
                <ErrorMessage name="username" />
              </div>
            </div>

            <div>
              <Field
                type="text"
                placeholder="Email"
                name="email"
                className="input"
              />
              <div className="error-validation">
                <ErrorMessage name="email" />
              </div>
            </div>

            <div>
              <Field
                type="text"
                placeholder="Phone"
                name="phone"
                className="input"
              />
              <div className="error-validation">
                <ErrorMessage name="phone" />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-5">
              <div>
                <Field
                  name="country"
                  component={SelectField}
                  options={countryOptions}
                />
                <div className="error-validation">
                  <ErrorMessage name="country" />
                </div>
              </div>

              <div>
                <Field
                  type="text"
                  placeholder="City"
                  name="city"
                  className="input"
                />
                <div className="error-validation">
                  <ErrorMessage name="city" />
                </div>
              </div>
            </div>
            <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-5">
              <div>
                <Field
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="input"
                />
                <div className="error-validation">
                  <ErrorMessage name="password" />
                </div>
              </div>
              <div>
                <Field
                  type="password"
                  placeholder="Confirme password"
                  name="confirmePassword"
                  className="input"
                />
                <div className="error-validation">
                  <ErrorMessage name="confirmePassword" />
                </div>
              </div>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="btn btn-primary flex items-center justify-center gap-4"
            >
              <ClipLoader color="#ffffff" loading={isLoading} size={25} />
              Register
            </button>
          </Form>
        </Formik>
        <p className="text-center text-[16px] mt-8">
          Have an account?{" "}
          <Link to="/login" className="text-blue">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
