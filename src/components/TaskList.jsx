import "../styles/taskList.css";
import { useState, useEffect } from "react";

// import debounce from "lodash.debounce";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  getTasks,
  deleteTask,
  editTaskStatus,
} from "../store/actions/taskActions.js";

import Card from "./Card";
import LoadCard from "./LoadCard";

function TaskList() {
  const [list, setList] = useState(null);
  const [renderList, setRenderList] = useState(null);
  const [taskFrom, setTaskFrom] = useState("ALL");
  const [filter, setFilter] = useState({
    nombre: "",
    importancia: "ALL",
  });

  const dispatch = useDispatch();
  const { loading, error, tasks } = useSelector((state) => state.tasksReducer);

  useEffect(() => {
    dispatch(getTasks(taskFrom));
    setFilter({
      nombre: "",
      importancia: "ALL",
    });
  }, [taskFrom]);

  useEffect(() => {
    setList(tasks);
    setRenderList(tasks);
    setFilter({
      nombre: "",
      importancia: "ALL",
    });
  }, [tasks]);

  useEffect(() => {
    let lista = [];
    // Filtro por importancia
    if (filter?.importancia === "ALL") {
      lista = list;
    } else {
      lista = list?.filter((data) => data.importance === filter.importancia);
    }

    if (filter?.nombre) {
      lista = lista?.filter((data) =>
        data.title.toLowerCase().includes(filter.nombre.toLowerCase().trim())
      );
    }

    setRenderList(lista);
  }, [filter]);

  // if (error) return <div>Hay un error</div>;

  const handleDeleteCard = (id) => {
    Swal.fire({
      title: "Quieres eliminar la tarea?",
      text: "Una vez eliminada la tarea no se puede recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      cancelButtonText: "NO",
      confirmButtonText: "Si",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTask(id, taskFrom));
        toast.error(`Tarea eliminada correctamente`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };

  const handleEditCardStatus = (data) => {
    dispatch(editTaskStatus(data, taskFrom));
    toast.success("Tarea modificada correctamente", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const renderColumCards = (text) => {
    return renderList
      ?.filter((data) => data.status === text)
      .map((data) => (
        <Card
          key={data._id}
          data={data}
          deleteCard={handleDeleteCard}
          editCardStatus={handleEditCardStatus}
        />
      ));
  };

  return (
    <section className="tasksList">
      <h2>Mis tareas</h2>

      <div className="filters">
        <FormControl>
          <RadioGroup
            row
            arial-labelledby="demo-row-radio-buttons-group-label"
            onChange={(e) => setTaskFrom(e.currentTarget.value)}
          >
            <FormControlLabel value="ALL" control={<Radio />} label="Todas" />
            <FormControlLabel
              value="ME"
              control={<Radio />}
              label="Mis tareas"
            />
          </RadioGroup>
        </FormControl>

        <input
          type="text"
          placeholder="Buscar tarea"
          value={filter.nombre}
          onChange={(e) =>
            setFilter({
              ...filter,
              nombre: e.target.value,
            })
          }
        />

        <select
          name="importance"
          onChange={(e) =>
            setFilter({
              ...filter,
              importancia: e.target.value,
            })
          }
        >
          <option value="ALL">Todas</option>
          <option value="LOW">Baja</option>
          <option value="MEDIUM">Media</option>
          <option value="HIGH">Alta</option>
        </select>
      </div>

      {!loading ? (
        renderList?.length < 1 ? (
          <h3>no hay tareas creadas</h3>
        ) : (
          <div className="list_group">
            <div className="list">
              <h3>Nuevas</h3>
              {renderColumCards("NEW")}
            </div>

            <div className="list">
              <h3>En proceso</h3>
              {renderColumCards("IN PROGRESS")}
            </div>

            <div className="list">
              <h3>Finalizadas</h3>
              {renderColumCards("FINISHED")}
            </div>
          </div>
        )
      ) : (
        <div className="list_group">
          <div className="list">
            <h3>Nuevas</h3>
            <LoadCard />
          </div>

          <div className="list">
            <h3>En proceso</h3>
            <LoadCard />
          </div>

          <div className="list">
            <h3>Finalizadas</h3>
            <LoadCard />
          </div>
        </div>
      )}
      <ToastContainer />
    </section>
  );
}

export default TaskList;
