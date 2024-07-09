import clsx from "clsx";

const TaskStatus = ({ isCompleted }) => {
  return (
    <div
      className={clsx(
        "w-min px-4 py-1.5 rounded-xl",
        isCompleted
          ? "text-green-500 bg-green-400/10"
          : "text-rose-500 bg-rose-400/10"
      )}
    >
      {isCompleted ? "Completed" : "Incomplete"}
    </div>
  );
};

export default TaskStatus;
