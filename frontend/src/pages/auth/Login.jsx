import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../../redux/features/auth/authSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { useFormik } from "formik";
import * as Yup from "yup";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  useEffect(() => {
    if (isSuccess && user) {
      user.role === "admin" ? navigate("/admin") : navigate("/");
    }

    return () => {
      dispatch(reset());
    };
  }, [isSuccess, navigate, user, dispatch]);

  const initialValues = { username: "", password: "" };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = (values) => {
    const formData = {
      username: values.username,
      password: values.password,
    };
    dispatch(login(formData));
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div className="auth relative flex justify-center items-center h-screen before:absolute before:left-0 before:right-0 before:bg-blue/40 before:w-full before:h-full">
      <div className="card z-10">
        <h2 className="text-center mb-2 text-dark text-[1.8rem]">Sign in</h2>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-96"
        >
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            className="input"
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="-mt-3">
              <p className="error-validation">{formik.errors.username}</p>
            </div>
          ) : null}
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="input"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="-mt-3">
              <p className="error-validation">{formik.errors.password}</p>
            </div>
          ) : null}

          <button
            disabled={isLoading}
            type="submit"
            className="btn btn-primary flex items-center justify-center gap-4"
          >
            <ClipLoader color="#ffffff" loading={isLoading} size={25} />
            Login
          </button>
        </form>
        <p className="text-center text-[16px] mt-6">
          Have an account?{" "}
          <Link to="/register">
            <a className="text-blue">Register</a>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
