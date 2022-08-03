import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";

import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { Switch, FormControlLabel } from "@mui/material";

import "../../styles/Login.css";
import Button from "../Button";

const { REACT_APP_API_ENDPOINT } = process.env;
// console.log(REACT_APP_API_ENDPOINT);
function Register() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${REACT_APP_API_ENDPOINT}auth/data`)
      .then((response) => response.json())
      .then((data) => setData(data.result));
  }, []);

  // console.log(data);

  const initialValues = {
    userName: "",
    email: "",
    password: "",
    role: "",
    continent: "",
    region: "",
    teamID: "",
    switch: false,
  };

  const required = "Campo obligatorio";

  const validationSchema = Yup.object().shape({
    userName: Yup.string().min(4, "Al menos 4 caracteres").required(required),
    email: Yup.string().email("Debe ser un email valido").required(required),
    password: Yup.string().required(required),
    role: Yup.string().required(required),
    continent: Yup.string().required(required),
    region: Yup.string().required(required),
    // teamID: Yup.string().required(required),
  });

  const handleChangeContinent = (value) => {
    setFieldValue("continent", value);
    if (value !== "America") {
      setFieldValue("region", "Otro");
    }
  };

  const onSubmit = () => {
    const teamID = !values.teamID ? uuidv4() : values.teamID;

    fetch(`${REACT_APP_API_ENDPOINT}auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          userName: values.userName,
          password: values.password,
          email: values.email,
          teamID,
          role: values.role,
          continent: values.continent,
          region: values.region,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) =>
        navigate("/registered/" + data?.result?.user?.teamID, {
          replace: true,
        })
      );
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
    values,
    setFieldValue,
  } = formik;

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Registro</h1>
        <div className="input">
          <label>Nombre de usuario</label>
          <input
            type="text"
            name="userName"
            onChange={handleChange}
            value={values.userName}
            className={errors.userName && touched.userName ? "error" : ""}
            onBlur={handleBlur}
          />
          {errors.userName && touched.userName && (
            <span className="error-message">{errors.userName}</span>
          )}
        </div>
        <div className="input">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password}
            className={errors.password && touched.password ? "error" : ""}
            onBlur={handleBlur}
          />
          {errors.password && touched.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>
        <div className="input">
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={values.email}
            className={errors.email && touched.email ? "error" : ""}
            onBlur={handleBlur}
          />
          {errors.email && touched.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>
        <FormControlLabel
          control={
            <Switch
              value={values.switch}
              onChange={() =>
                formik.setFieldValue("switch", !formik.values.switch)
              }
              name="switch"
              color="primary"
            />
          }
          label="Pertenecés a un equipo ya creado"
        />
        {values.switch && (
          <div className="input">
            <label>Por favor, introduce el identificador de equipo</label>
            <input
              type="text"
              name="teamID"
              value={values.teamID}
              onChange={handleChange}
            />
          </div>
        )}
        <div className="input">
          <label>Rol</label>
          <select
            name="role"
            onChange={handleChange}
            value={values.role}
            className={errors.role && touched.role ? "error" : ""}
            onBlur={handleBlur}
          >
            <option value="">Seleccionar rol...</option>
            {data?.Rol?.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.role && touched.role && (
            <span className="error-message">{errors.role}</span>
          )}
        </div>
        <div className="input">
          <label>Continente</label>
          <select
            name="continent"
            onChange={(event) =>
              handleChangeContinent(event.currentTarget.value)
            }
            value={values.continent}
            className={errors.continent && touched.continent ? "error" : ""}
            onBlur={handleBlur}
          >
            <option value="">Seleccionar continente...</option>
            {data?.continente?.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.continent && touched.continent && (
            <span className="error-message">{errors.continent}</span>
          )}
        </div>
        {values.continent === "America" && (
          <div className="input">
            <label>Región</label>
            <select
              name="region"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.region}
              className={errors.region && touched.region ? "error" : ""}
            >
              <option value="">Seleccionar región...</option>
              {data?.region?.map((option) => (
                <option
                  value={option === "Brasil" ? "Brazil" : option}
                  key={option}
                >
                  {option === "Brasil" ? "Brazil" : option}
                </option>
              ))}
            </select>
            {errors.region && touched.region && (
              <span className="error-message">{errors.region}</span>
            )}
          </div>
        )}
        <div>
          <Button type="submit" text="Enviar" />
          <Link to="/login">Ir a Iniciar sesión</Link>
        </div>
        <div></div>
      </form>
    </div>
  );
}

export default Register;