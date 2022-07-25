import "../styles/taskList.css";

import { useState, useEffect } from "react";

import Card from "./Card";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import debounce from "lodash.debounce";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

function TaskList() {
  const [list, setList] = useState(null);
  const [renderList, setRenderList] = useState(null);
  const [taskFrom, setTaskFrom] = useState("ALL");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const { loading, error, tasks } = useSelector((state) => state.tasksReducer);

  useEffect(() => {
    dispatch(getTasks(taskFrom === "ME" ? "me" : ""));
  }, [taskFrom, dispatch]);

  useEffect(() => {
    if (tasks?.length > 0) {
      setList(tasks);
      setRenderList(tasks);
    }
  }, [tasks]);

  useEffect(() => {
    if (search)
      setRenderList(
        list.filter((data) =>
          data.title.toLowerCase().startsWith(search.toLowerCase().trim())
        )
      );
    else setRenderList(list);
  }, [search, list]);

  if (error) return <div>Hay un error</div>;

  const handleChangeImportante = (e) => {
    if (!e.target.value || e.target.value === "ALL") setRenderList(list);
    else
      setRenderList(list?.filter((data) => data.importance === e.target.value));
  };

  const handleSearch = debounce((e) => {
    setSearch(e?.target?.value);
  }, 1000);

  const handleDeleteCard = (id) => {
    dispatch(deleteTask(id));
    toast.warn(`Tarea eliminada correctamente`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleEditCardStatus = (data) => {
    dispatch(editTaskStatus(data));
  };

  const renderAllCards = () => {
    return renderList?.map((data) => (
      <Card
        key={data._id}
        data={data}
        deleteCard={handleDeleteCard}
        editCardStatus={handleEditCardStatus}
      />
    ));
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
          onChange={(e) => handleSearch(e)}
        />

        <select name="importance" onChange={handleChangeImportante}>
          <option value="" selected disabled>
            Prioridad
          </option>
          <option value="ALL">Todas</option>
          <option value="LOW">Baja</option>
          <option value="MEDIUM">Media</option>
          <option value="HIGH">Alta</option>
        </select>
      </div>

      {!loading ? (
        !renderList ? (
          <h4>no hay tareas creadas</h4>
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
        <SkeletonTheme baseColor="#DFDFDF" highlightColor="#7C7C7C">
          <p>
            <Skeleton count={3} />
          </p>
        </SkeletonTheme>
      )}
    </section>
  );
}

export default TaskList;
