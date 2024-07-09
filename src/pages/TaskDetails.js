import {
  CheckIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/Button";
import Modal from "../components/Modal";
import TaskStatus from "../components/TaskStatus";
import { useTaskContext } from "../context/TaskContext";
import { ACTIONS, MESSAGES } from "../Constant";
import { useModalState } from "../hooks/useModalState";

export default function TaskDetails() {
  const { tasks, deleteTask, toggleTaskCompletion } = useTaskContext();
  const { id } = useParams();
  const task = tasks.find((task) => task.id === id);
  const navigate = useNavigate();
  const { modalState, showModal, hideModal } = useModalState();
  if (!task) return <p>{MESSAGES.TASK_NOT_FOUND}</p>;
  const handleAction = () => {
    if (modalState.action === ACTIONS.DELETE) {
      deleteTask(task.id);
      toast.success(MESSAGES.TASK_DELETED);
      navigate("/");
    } else if (modalState.action === ACTIONS.COMPLETE) {
      toggleTaskCompletion(task.id);
      toast.success(MESSAGES.TASK_COMPLETED);
    }
    hideModal();
  };
  return (
    <>
      <div className="overflow-hidden bg-white md:mt-4 max-w-7xl mx-auto shadow sm:rounded-lg">
        <div className="px-4 py-6 sm:px-6">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            {task.title}
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Task details
          </p>
        </div>
        <div className="border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Title</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {task.title}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Description</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 whitespace-pre">
                {task.description || "-"}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Due Date</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {task.dueDate || "-"}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Status</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <TaskStatus isCompleted={task.completed} />
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Actions
              </dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <div className="flex gap-4 flex-wrap items-center">
                  {!task?.completed && (
                    <Button
                      onClick={() => {
                        showModal(ACTIONS.COMPLETE);
                        // toggleTaskCompletion(task.id)
                      }}
                      prefixIcon={<CheckIcon className="w-6" />}
                    >
                      Mark as Completed
                    </Button>
                  )}
                  <Link to={`/edit/${task.id}`}>
                    <Button prefixIcon={<PencilSquareIcon className="w-6" />}>
                      Edit
                    </Button>
                  </Link>
                  <Button
                    prefixIcon={<TrashIcon className="w-6" />}
                    variant="secondary"
                    onClick={() => showModal(ACTIONS.DELETE)}
                  >
                    Delete
                  </Button>
                  <Link className="underline" to="/">
                    Back
                  </Link>
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <Modal
        description={`Are you sure you want to ${modalState.action} this task "${task.title}"?`}
        open={modalState.show}
        title="Confirm"
        onClose={hideModal}
        onClick={handleAction}
      />
    </>
  );
}
