import { v4 as uuidv4 } from "uuid";

export const sortOptions = [
  { name: "Due Date", value: "dueDate" },
  { name: "Title", value: "title" },
];
export const filterOptions = [
  {
    name: "All",
    value: "all",
  },
  { name: "Completed", value: "completed" },
  { name: "Pending", value: "pending" },
];
export const INITIALTASKS = [
  {
    id: uuidv4(),
    title: "Buy groceries",
    description: "Milk, Bread, Cheese, Eggs, Vegetables",
    dueDate: "2024-07-15",
    completed: false,
  },
  {
    id: uuidv4(),
    title: "Meeting with team",
    description: "Discuss project milestones and deadlines",
    dueDate: "2024-07-10",
    completed: false,
  },
  {
    id: uuidv4(),
    title: "Dentist appointment",
    description: "Routine check-up",
    dueDate: "2024-07-12",
    completed: true,
  },
];

export const ACTIONS = {
  DELETE: "delete",
  COMPLETE: "complete",
};

export const MESSAGES = {
  TASK_DELETED: "Task deleted successfully",
  TASK_COMPLETED: "Task completed successfully",
  TASK_UPDATED: "Task updated successfully",
  TASK_CREATED: "Task created successfully",
  TASK_NOT_FOUND: "Task not found",
};
