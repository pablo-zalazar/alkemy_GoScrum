import React from "react";
import { useFormik } from "formik";
import {} from "react-router-dom";

import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../styles/taskForm.styles.css";

import { useDispatch } from "react-redux";
import { getTasks } from "../store/actions/taskActions.js";

const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env;

function TaskForm() {
  const dispatch = useDispatch();
  const initialValues = {
    title: "",
    status: "",
    importance: "",
    description: "",
  };

  const onSubmit = () => {
    fetch(`${API_ENDPOINT}task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        task: {
          title: values.title,
          status: values.status,
          importance: values.importance,
          description: values.description,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(getTasks(""));
        resetForm();
        toast(`Tarea "${data.result.task.title}" creada correctamente`);
      });
  };

  const required = "Campo obligatorio";

  const validationSchema = Yup.object().shape({
    title: Yup.string().min(6, "Al menos 6 caracteres").required(required),
    status: Yup.string().required(required),
    importance: Yup.string().required(required),
    description: Yup.string().required(required),
  });

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
    values,
    resetForm,
  } = formik;

  return (
    <section className="task-form">
      <h2>Crear tarea</h2>
      <p>Crea tus tareas</p>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <input
              name="title"
              placeholder="Nombre"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.title && touched.title ? "error" : ""}
            />
            {errors.title && touched.title && (
              <span className="error-message">{errors.title}</span>
            )}
          </div>

          <div>
            <select
              name="status"
              onChange={handleChange}
              value={values.status}
              onBlur={handleBlur}
              className={errors.status && touched.status ? "error" : ""}
            >
              <option value="">--Seleccionar--</option>
              <option value="NEW">Nueva</option>
              <option value="IN PROGRESS">En proceso</option>
              <option value="FINISHED">Terminada</option>
            </select>
            {errors.status && touched.status && (
              <span className="error-message">{errors.status}</span>
            )}
          </div>

          <div>
            <select
              name="importance"
              onChange={handleChange}
              value={values.importance}
              onBlur={handleBlur}
              className={errors.importance && touched.importance ? "error" : ""}
            >
              <option value="">--Seleccionar--</option>
              <option value="LOW">Baja</option>
              <option value="MEDIUM">Media</option>
              <option value="HIGH">Alta</option>
            </select>
            {errors.importance && touched.importance && (
              <span className="error-message">{errors.importance}</span>
            )}
          </div>
        </div>

        <div>
          <textarea
            name="description"
            onChange={handleChange}
            value={values.description}
            placeholder="Descripcion"
            onBlur={handleBlur}
            className={errors.description && touched.description ? "error" : ""}
          />
          {errors.description && touched.description && (
            <span className="error-message">{errors.description}</span>
          )}
        </div>
        <button type="submit">Crear</button>
      </form>
      <ToastContainer />
    </section>
  );
}

export default TaskForm;
