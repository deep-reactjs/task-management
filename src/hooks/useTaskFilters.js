import { useState, useMemo } from "react";

export const useTaskFilters = (tasks) => {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("dueDate");
  const [search, setSearch] = useState("");

  const filteredAndSortedTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        if (filter === "all") return true;
        return filter === "completed" ? task.completed : !task.completed;
      })
      .filter(
        (task) =>
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        if (sort === "title") return a.title.localeCompare(b.title);
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
  }, [tasks, filter, sort, search]);

  const resetFilter = () => {
    setFilter("all");
    setSort("dueDate");
    setSearch("");
  };

  return {
    filter,
    setFilter,
    sort,
    setSort,
    search,
    setSearch,
    resetFilter,
    filteredAndSortedTasks,
  };
};
