import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function generateUniqueId() {
    const maxIdNumberRange = Math.pow(10, 10);

    let id = Math.floor(Math.random() * maxIdNumberRange);

    const taskWithSameId = tasks.find((task) => task.id === id);

    // Generate another id in case of existent id
    if (taskWithSameId) {
      id = generateUniqueId();
    }

    return id;
  }

  function handleCreateNewTask() {
    if (newTaskTitle) {
      setTasks((prevValue) => [
        ...prevValue,
        {
          id: generateUniqueId(),
          title: newTaskTitle,
          isComplete: false,
        },
      ]);

      setNewTaskTitle("");
    }
  }

  function handleToggleTaskCompletion(id: number) {
    const allTasks = [...tasks];

    allTasks.forEach((task) => {
      if (task.id === id) {
        task.isComplete === true
          ? (task.isComplete = false)
          : (task.isComplete = true);
      }
    });

    setTasks([...allTasks]);
  }

  function handleRemoveTask(id: number) {
    const tasksFiltered = tasks.filter((task) => task.id !== id);

    setTasks([...tasksFiltered]);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
