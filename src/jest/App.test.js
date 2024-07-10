import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
jest.mock("../pages/TaskListPage", () => () => <div>TaskListPage</div>);
jest.mock("../pages/AddEditTask", () => () => <div>AddEditTaskPage</div>);
jest.mock("../pages/TaskDetails", () => () => <div>TaskDetailsPage</div>);
jest.mock("../pages/NotFound", () => () => <div>NotFound</div>);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  BrowserRouter: ({ children }) => <div>{children}</div>,
}));

describe("App Component", () => {
  const renderWithRouter = (route) => {
    render(
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    );
  };

  test("renders TaskListPage on default route", () => {
    renderWithRouter("/");
    expect(screen.getByText("TaskListPage")).toBeInTheDocument();
  });

  test("renders AddEditTaskPage on /add route", () => {
    renderWithRouter("/add");
    expect(screen.getByText("AddEditTaskPage")).toBeInTheDocument();
  });

  test("renders AddEditTaskPage on /edit/:id route", () => {
    renderWithRouter("/edit/1");
    expect(screen.getByText("AddEditTaskPage")).toBeInTheDocument();
  });

  test("renders TaskDetailsPage on /task/:id route", () => {
    renderWithRouter("/task/1");
    expect(screen.getByText("TaskDetailsPage")).toBeInTheDocument();
  });

  test("renders NotFound on unknown route", () => {
    renderWithRouter("/unknown");
    expect(screen.getByText("NotFound")).toBeInTheDocument();
  });
});
