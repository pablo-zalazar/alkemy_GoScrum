import { useState, useEffect } from "react";

import Header from "../Header";
import Card from "../Card";
import TaskForm from "../TaskForm";
import { useResize } from "../../hooks/useResize.js";
import "../../styles/tasks.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import debounce from "lodash.debounce";

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
} from "../../store/actions/taskActions.js";

// import { filterProps } from "framer-motion";

function Tasks() {
  const { isPhone } = useResize();
  const [list, setList] = useState(null);
  // const [cargando, setCargando] = useState(false);
  const [renderList, setRenderList] = useState(null);
  const [taskFrom, setTaskFrom] = useState("ALL");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const { loading, error, tasks } = useSelector((state) => state.tasksReducer);

  useEffect(() => {
    dispatch(getTasks(taskFrom === "ME" ? "me" : ""));
  }, [taskFrom]);

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
  }, [search]);

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
    <>
      <Header />
      <main id="tasks">
        <TaskForm />
        <section className="wrapper_list">
          <div className="list_header">
            <h2>Mis tareas</h2>
          </div>
          <div className="filters">
            <FormControl>
              <RadioGroup
                row
                arial-labelledby="demo-row-radio-buttons-group-label"
                onChange={(e) => setTaskFrom(e.currentTarget.value)}
              >
                <FormControlLabel
                  value="ALL"
                  control={<Radio />}
                  label="Todas"
                />
                <FormControlLabel
                  value="ME"
                  control={<Radio />}
                  label="Mis tareas"
                />
              </RadioGroup>
            </FormControl>

            <div>
              <input
                type="text"
                placeholder="Buscar tarea"
                onChange={(e) => handleSearch(e)}
              />
            </div>
            <select name="importance" onChange={handleChangeImportante}>
              <option value="" selected disabled>
                --Seleccionar--
              </option>
              <option value="ALL">Todas</option>
              <option value="LOW">Baja</option>
              <option value="MEDIUM">Media</option>
              <option value="HIGH">Alta</option>
            </select>
          </div>
          {!loading ? (
            renderList?.length < 1 ? (
              <h4>no hay tareas creadas</h4>
            ) : !isPhone ? (
              <div className="list_group">
                <div className="list">
                  <h4>Nuevas</h4>
                  {renderColumCards("NEW")}
                </div>

                <div className="list">
                  <h4>En proceso</h4>
                  {renderColumCards("IN PROGRESS")}
                </div>

                <div className="list">
                  <h4>Finalizadas</h4>
                  {renderColumCards("FINISHED")}
                </div>
              </div>
            ) : (
              <div className="list phone">{renderAllCards()}</div>
            )
          ) : (
            <Skeleton />
          )}
        </section>
      </main>
    </>
  );
}

export default Tasks;
