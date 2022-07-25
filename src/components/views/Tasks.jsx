import "../../styles/tasks.css";

import TaskForm from "../TaskForm";
import TaskList from "../TaskList";

function Tasks() {
  return (
    <>
      <main id="tasks">
        <TaskForm />
        <TaskList />
      </main>
    </>
  );
}

export default Tasks;
