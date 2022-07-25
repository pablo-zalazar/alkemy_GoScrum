import "../../styles/tasks.css";

import Header from "../Header";
import TaskForm from "../TaskForm";
import TaskList from "../TaskList";

function Tasks() {
  return (
    <>
      <Header />
      <main id="tasks">
        <TaskForm />
        <TaskList />
      </main>
    </>
  );
}

export default Tasks;
