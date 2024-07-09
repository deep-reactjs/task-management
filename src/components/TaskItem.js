import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TaskContext } from "../context/TaskContext";

const TaskItem = ({ task }) => {
  const { deleteTask, toggleTaskCompletion } = useContext(TaskContext);

  return (
    <li style={{ textDecoration: task.completed ? "line-through" : "none" }}>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Due: {task.dueDate}</p>
      <button onClick={() => toggleTaskCompletion(task.id)}>
        {task.completed ? "Mark as Incomplete" : "Mark as Complete"}
      </button>
      <Link to={`/edit/${task.id}`}>Edit</Link>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
      <Link to={`/task/${task.id}`}>View Details</Link>
    </li>
  );
};

export default TaskItem;
