import React from "react";
import { removeFn, updateFn } from "../types";
import { useEditFormToggle } from "../utils/hooks";
import Timer from "./Timer";
import TimerForm from "./TimerForm";

type Props = {
  elapsed: number;
  id: string;
  project: string;
  title: string;
  isEditFormOpen?: boolean;
  isRunning?: boolean;
  editTimer: updateFn;
  removeTimer: removeFn;
};

const EditableTimer = ({
  elapsed,
  id,
  isRunning,
  project,
  title,
  editTimer,
  removeTimer,
}: Props) => {
  const [isEditFormOpen, setEditFormOpen] = useEditFormToggle();

  if (isEditFormOpen) {
    return (
      <TimerForm
        id={id}
        title={title}
        project={project}
        onCancel={setEditFormOpen}
      />
    );
  }
  return (
    <Timer
      id={id}
      title={title}
      project={project}
      elapsed={elapsed}
      isRunning={isRunning}
      editTimer={editTimer}
      removeTimer={removeTimer}
    />
  );
};

export default EditableTimer;
