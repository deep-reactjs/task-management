import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { INITIALTASKS, MESSAGES } from "../Constant";
import { TaskProvider } from "../context/TaskContext";
import TaskListPage from "../pages/TaskListPage";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
  },
  ToastContainer: jest.fn().mockImplementation(() => null),
}));
jest.mock("../components/TaskRow", () => ({ task, onDelete, onComplete }) => (
  <tr>
    <td>{task.title}</td>
    <td>{task.description}</td>
    <td>{task.status}</td>
    <td>{task.dueDate}</td>
    <td>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onComplete}>Complete</button>
    </td>
  </tr>
));

const mockTasks = INITIALTASKS;

const renderTaskListPage = () => {
  return render(
    <MemoryRouter>
      <TaskProvider initialTasks={mockTasks}>
        <TaskListPage />
      </TaskProvider>
    </MemoryRouter>
  );
};

describe("TaskListPage", () => {
  test("renders task list page title", () => {
    renderTaskListPage();
    expect(screen.getByText("Task Management App")).toBeInTheDocument();
  });

  test("renders filter and sort options", () => {
    renderTaskListPage();
    expect(screen.getByText("Sort")).toBeInTheDocument();
    expect(screen.getByText("Filter")).toBeInTheDocument();
  });

  test("renders search input", () => {
    renderTaskListPage();
    expect(
      screen.getByPlaceholderText("Search title or description")
    ).toBeInTheDocument();
  });

  test("renders task count", () => {
    renderTaskListPage();
    expect(screen.getByText("3/3")).toBeInTheDocument();
  });

  test("renders add task button", () => {
    renderTaskListPage();
    expect(screen.getByText("Add Task")).toBeInTheDocument();
  });

  test("renders tasks", () => {
    renderTaskListPage();
    INITIALTASKS.forEach((task) => {
      expect(screen.getByText(task.title)).toBeInTheDocument();
    });
  });

  test("deletes a task", async () => {
    renderTaskListPage();
    fireEvent.click(screen.getAllByText("Delete")[0]);
    fireEvent.click(screen.getByText("Yes"));
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(MESSAGES.TASK_DELETED);
    });
  });

  test("completes a task", async () => {
    renderTaskListPage();
    fireEvent.click(screen.getAllByText("Complete")[0]);
    fireEvent.click(screen.getByText("Yes"));
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(MESSAGES.TASK_COMPLETED);
    });
  });
});
