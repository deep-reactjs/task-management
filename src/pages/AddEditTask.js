import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import Button from "../components/Button";
import CommonInput from "../components/Input";
import MultilineText from "../components/TextArea";
import { useTaskContext } from "../context/TaskContext";
import { MESSAGES } from "../Constant";

const AddEditTaskPage = () => {
  const { addTask, editTask, tasks } = useTaskContext();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    id: uuidv4(),
    title: "",
    description: "",
    dueDate: "",
    completed: false,
  });

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const existingTask = tasks.find((task) => task.id === id);
      if (existingTask) setTask(existingTask);
    }
  }, [id, tasks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      editTask(task);
      toast.success(MESSAGES.TASK_UPDATED);
    } else {
      addTask({ ...task, id: uuidv4() });
      toast.success(MESSAGES.TASK_CREATED);
    }
    navigate("/");
  };
  const today = new Date().toISOString().split("T")[0];
  return (
    <div className="max-w-2xl md:mt-4 mx-auto p-6 shadow rounded-lg">
      <h1 className="text-center text-2xl font-semibold">
        {id ? "Edit Task" : "Add Task"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <CommonInput
            name="title"
            title="Title"
            onChange={handleChange}
            required
            value={task?.title}
          />
          <MultilineText
            title="Description"
            name="description"
            required
            onChange={handleChange}
            value={task?.description}
          />
          <CommonInput
            title="Due Date"
            type="date"
            name="dueDate"
            value={task?.dueDate}
            onChange={handleChange}
            min={today}
            required
          />
          <div className="flex items-center gap-4">
            <Button type="submit">{id ? "Update Task" : "Add Task"}</Button>
            <Button
              variant="secondary"
              onClick={() => navigate(-1)}
              type="button"
            >
              Back
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEditTaskPage;
