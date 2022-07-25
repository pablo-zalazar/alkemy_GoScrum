import { TASKS_REQUEST, TASKS_FAILURE, TASKS_SUCCESS, RESET } from "../types";

const initialState = {
  loading: false,
  tasks: [],
  error: "",
};

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASKS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        tasks: action.payload,
      };
    case TASKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case RESET:
      return {
        loading: false,
        tasks: [],
        error: "",
      };
    default:
      return { ...state };
  }
};
