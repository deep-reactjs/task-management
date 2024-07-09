import { PlusIcon, XMarkIcon } from "@heroicons/react/16/solid";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ACTIONS, MESSAGES, filterOptions, sortOptions } from "../Constant";
import Button from "../components/Button";
import CommonInput from "../components/Input";
import FilterMenu from "../components/Menu";
import Modal from "../components/Modal";
import { useTaskContext } from "../context/TaskContext";
import TaskRow from "../components/TaskRow";
import { useTaskFilters } from "../hooks/useTaskFilters";
import { useModalState } from "../hooks/useModalState";

const TaskListPage = () => {
  const { tasks, toggleTaskCompletion, deleteTask } = useTaskContext();
  const {
    filter,
    setFilter,
    sort,
    setSort,
    search,
    setSearch,
    resetFilter,
    filteredAndSortedTasks,
  } = useTaskFilters(tasks);
  const { modalState, showModal, hideModal } = useModalState();
  const [selectedTask, setSelectedTask] = useState();

  const handleTaskAction = () => {
    if (selectedTask) {
      if (modalState.action === ACTIONS.DELETE) {
        deleteTask(selectedTask.id);
        toast.success(MESSAGES.TASK_DELETED);
      } else if (modalState.action === ACTIONS.COMPLETE) {
        toggleTaskCompletion(selectedTask.id);
        toast.success(MESSAGES.TASK_COMPLETED);
      }
      hideModal();
      setSelectedTask(null);
    }
  };
  return (
    <div className="w-full mt-4">
      <h1 className="text-center text-2xl font-semibold">
        Task Management App
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end px-4 sm:px-6 lg:px-8 mt-12">
        <FilterMenu
          title="Sort"
          selectedValue={sort}
          onClick={(val) => setSort(val)}
          options={sortOptions}
        />
        <FilterMenu
          title="Filter"
          selectedValue={filter}
          onClick={(val) => setFilter(val)}
          options={filterOptions}
        />
        <CommonInput
          value={search}
          title="Search"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search title or description"
        />
        <div className="flex items-center justify-between">
          <Button
            onClick={() => resetFilter()}
            prefixIcon={<XMarkIcon className="w-6" />}
          >
            Clear
          </Button>
          {filteredAndSortedTasks?.length}/{tasks?.length}
          <Link to="/add">
            <Button prefixIcon={<PlusIcon className="w-6" />}>Add Task</Button>
          </Link>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-4 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-black/5">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Due Date
                      </th>
                      <th
                        scope="col"
                        className="relative text-left py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredAndSortedTasks.map((task) => (
                      <TaskRow
                        key={task.id}
                        task={task}
                        onDelete={() => {
                          setSelectedTask(task);
                          showModal(ACTIONS.DELETE);
                        }}
                        onComplete={() => {
                          setSelectedTask(task);
                          showModal(ACTIONS.COMPLETE);
                        }}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        description={`Are you sure you want to ${
          modalState.action
        } this task "${selectedTask?.title || ""}"`}
        open={modalState.show}
        title="Confirm"
        onClose={() => {
          hideModal();
          setSelectedTask(null);
        }}
        onClick={handleTaskAction}
      />
    </div>
  );
};

export default TaskListPage;
