import { TASKS_REQUEST, TASKS_FAILURE, TASKS_SUCCESS, RESET } from "../types";

const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env;

export const taskRequest = () => ({
  type: TASKS_REQUEST,
  payload: "",
});

export const taskSuccess = (data) => ({
  type: TASKS_SUCCESS,
  payload: data,
});

export const taskFailure = (error) => ({
  type: TASKS_FAILURE,
  payload: error,
});

export const getTasks = (path) => {
  return async function (dispatch) {
    dispatch(taskRequest());
    const url = `${API_ENDPOINT}task/${path}`;
    console.log(url);
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(taskSuccess(data.result));
      })
      .catch((e) => dispatch(taskFailure(e)));
  };
};

export const deleteTask = (id) => {
  return function (dispatch) {
    dispatch(taskRequest());
    fetch(`${API_ENDPOINT}task/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(getTasks(""));
      })
      .catch((e) => dispatch(taskFailure(e)));
  };
};

export function reset() {
  return async function (dispatch) {
    return dispatch({
      type: RESET,
    });
  };
}

export const editTaskStatus = (data) => {
  const statusArray = ["NEW", "IN PROGRESS", "FINISHED"];
  const newStatusIndex =
    statusArray.indexOf(data.status) > 1
      ? 0
      : statusArray.indexOf(data.status) + 1;

  return function (dispatch) {
    dispatch(taskRequest());
    fetch(`${API_ENDPOINT}task/${data._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        task: {
          title: data.title,
          importance: data.importance,
          status: statusArray[newStatusIndex],
          description: data.description,
        },
      }),
    })
      .then((response) => response.json())
      .then(() => {
        dispatch(getTasks(""));
      })
      .catch((e) => dispatch(taskFailure(e)));
  };
};
