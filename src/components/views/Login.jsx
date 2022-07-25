import React from "react";
import Button from "../Button";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";

import * as Yup from "yup";
import "../../styles/Login.css";

import alert from "../../utils/alert";

const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env;

function Login() {
  const navigate = useNavigate();

  const initialValues = { userName: "", password: "" };

  const required = "Campo obligatorio";
  const validationSchema = Yup.object().shape({
    userName: Yup.string().min(4, "Al menos 4 caracteres").required(required),
    password: Yup.string().required(required),
  });

  const onSubmit = () => {
    const { userName, password } = values;

    fetch(`${API_ENDPOINT}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status_code === 200) {
          localStorage.setItem("token", data.result.token);
          localStorage.setItem("userName", data.result.user.userName);
          navigate("/", { replace: true });
        } else {
          alert(
            "Credenciales invalidas",
            "Introduce un usario existente",
            "error"
          );
        }
      });
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const { handleSubmit, handleChange, handleBlur, errors, touched, values } =
    formik;

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Inicio sesion</h1>
        <div className="input">
          <label htmlFor="userName">Usuario</label>
          <input
            name="userName"
            id="userName"
            type="text"
            value={values.userName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.userName && touched.userName ? "error" : ""}
          />
          {errors.userName && touched.userName && (
            <span className="error-message">{errors.userName}</span>
          )}
        </div>

        <div className="input">
          <label htmlFor="password">Contraseña</label>
          <input
            name="password"
            id="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password ? "error" : ""}
          />
          {errors.password && touched.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>

        <div>
          <Button text="Login" />
          <Link to="/registro">Registrarme</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
