import "../styles/taskForm.css";

import React, { useState } from "react";
import {} from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { Formik, Form, ErrorMessage, Field } from "formik";

import { getTasks } from "../store/actions/taskActions.js";
import Button from "./Button";

const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env;

function TaskForm() {
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState({
    title: "",
    status: "",
    importance: "",
    description: "",
  });

  const onSubmit = (values, resetForm) => {
    console.log(values);
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

        console.log(data);
        toast.success(
          `Tarea "${data.result.task.title}" creada correctamente`,
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      });
    resetForm();
  };

  const required = "Campo obligatorio";

  const createSchema = Yup.object().shape({
    title: Yup.string().min(6, "Al menos 6 caracteres").required(required),
    status: Yup.string().required(required),
    importance: Yup.string().required(required),
    description: Yup.string().required(required),
  });

  return (
    <section className="task-form">
      <h2>Crear tarea</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={createSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
      >
        <Form>
          <div>
            <div>
              <Field name="title" as="input" placeholder="Nombre" />
              <p className="error-message">
                <ErrorMessage name="title" />
              </p>
            </div>

            <div>
              <Field name="status" as="select">
                <option value="">Estado</option>
                <option value="NEW">Nueva</option>
                <option value="IN PROGRESS">En proceso</option>
                <option value="FINISHED">Terminada</option>
              </Field>
              <p className="error-message">
                <ErrorMessage name="status" />
              </p>
            </div>

            <div>
              <Field name="importance" as="select">
                <option value="">Importancia</option>
                <option value="LOW">Baja</option>
                <option value="MEDIUM">Media</option>
                <option value="HIGH">Alta</option>
              </Field>
              <p className="error-message">
                <ErrorMessage name="importance" />
              </p>
            </div>
          </div>

          <div>
            <Field name="description" as="textarea" placeholder="Descripcion" />
            <p className="error-message">
              <ErrorMessage name="description" />
            </p>
          </div>
          <Button text="Crear" type="submit" />
        </Form>
      </Formik>
    </section>
  );
}

export default TaskForm;
