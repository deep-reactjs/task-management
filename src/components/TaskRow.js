import { Link } from "react-router-dom";
import TaskStatus from "./TaskStatus";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import {
  CheckIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import clsx from "clsx";

const TaskRow = ({ task, onDelete, onComplete }) => (
  <tr className={task.completed && "bg-green-100/50"} key={task.id}>
    <td className="py-4 min-w-48 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
      <Link
        className={clsx(
          "hover:underline line-clamp-1",
          task.completed && "line-through"
        )}
        to={`/task/${task.id}`}
      >
        {task.title}
      </Link>
    </td>
    <td className="whitespace-wrap px-3 py-4 text-sm text-gray-500">
      <p className="whitespace-pre line-clamp-3">{task.description}</p>
    </td>
    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
      <TaskStatus isCompleted={!!task.completed} />
    </td>
    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
      {task.dueDate}
    </td>
    <td className="py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6">
      <div>
        <Popover>
          <PopoverButton className="block text-sm/6 font-semibold text-black/50 focus:outline-none data-[active]:text-black data-[hover]:text-black data-[focus]:outline-1 data-[focus]:outline-white">
            <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5" />
          </PopoverButton>
          <PopoverPanel
            transition
            anchor="bottom"
            className="rounded-xl bg-white shadow-lg text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
          >
            {({ close }) => (
              <>
                <Link
                  to={`/task/${task.id}`}
                  className="text-indigo-600 hover:text-indigo-900 flex items-center gap-2 cursor-pointer py-2 px-4"
                >
                  <EyeIcon className="w-6" />
                  View
                </Link>
                <Link
                  to={`/edit/${task.id}`}
                  className="text-indigo-600 hover:text-indigo-900 flex items-center gap-2 cursor-pointer py-2 px-4"
                >
                  <PencilSquareIcon className="w-6" />
                  Edit
                </Link>
                <button
                  onClick={() => {
                    onDelete && onDelete();
                  }}
                  className="text-rose-400 hover:text-rose-900 w-full flex items-center gap-2 cursor-pointer py-2 px-4 "
                >
                  <TrashIcon className="w-6" />
                  Delete
                </button>
                {!task?.completed && (
                  <button
                    onClick={() => {
                      close();
                      onComplete && onComplete();
                    }}
                    className="text-green-500 hover:text-green-800 flex items-center gap-2 cursor-pointer py-2 px-4 "
                  >
                    <CheckIcon className="w-6" />
                    Mark as Completed
                  </button>
                )}
              </>
            )}
          </PopoverPanel>
        </Popover>
      </div>
    </td>
  </tr>
);
export default TaskRow;
