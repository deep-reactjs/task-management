import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React, { act } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { toast } from "react-toastify";
import { INITIALTASKS, MESSAGES } from "../Constant";
import { TaskProvider } from "../context/TaskContext";
import AddEditTaskPage from "../pages/AddEditTask";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
  },
}));

jest.mock("uuid", () => ({
  v4: () => "mocked-uuid",
}));

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const renderAddEditTaskPage = async (id = null) => {
  return render(
    <MemoryRouter initialEntries={[id ? `/edit/${id}` : "/add"]}>
      <TaskProvider initialTasks={INITIALTASKS}>
        <Routes>
          <Route path="/add" element={<AddEditTaskPage />} />
          <Route path="/edit/:id" element={<AddEditTaskPage />} />
        </Routes>
      </TaskProvider>
    </MemoryRouter>
  );
};

describe("AddEditTaskPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders Add Task form", async () => {
    renderAddEditTaskPage();
    await act(async () => {
      expect(screen.getByLabelText("Title")).toBeInTheDocument();
      expect(screen.getByLabelText("Description")).toBeInTheDocument();
      expect(screen.getByLabelText("Due Date")).toBeInTheDocument();
    });
  });

  test("renders Edit Task form with existing task data", () => {
    renderAddEditTaskPage(INITIALTASKS[0].id);
    expect(screen.getByDisplayValue(INITIALTASKS[0].title)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(INITIALTASKS[0].description)
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(INITIALTASKS[0].dueDate)
    ).toBeInTheDocument();
  });

  test("adds a new task", async () => {
    renderAddEditTaskPage();

    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "New Task" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "New Description" },
    });
    fireEvent.change(screen.getByLabelText("Due Date"), {
      target: { value: "2024-08-01" },
    });

    fireEvent.click(screen.getByText("Save Task"));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(MESSAGES.TASK_CREATED);
    });
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("edits an existing task", async () => {
    renderAddEditTaskPage(INITIALTASKS[0].id);

    fireEvent.change(screen.getByDisplayValue(INITIALTASKS[0].title), {
      target: { value: "Updated Task" },
    });
    fireEvent.click(screen.getByText("Update Task"));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(MESSAGES.TASK_UPDATED);
    });
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("navigates back when Back button is clicked", () => {
    renderAddEditTaskPage();
    fireEvent.click(screen.getByText("Back"));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test("prevents submission with empty fields", async () => {
    renderAddEditTaskPage();

    fireEvent.click(screen.getByText("Add Task"));

    await waitFor(() => {
      expect(toast.success).not.toHaveBeenCalled();
    });
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
