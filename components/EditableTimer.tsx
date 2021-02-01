import React from "react";
import Timer from "./Timer";
import TimerForm from "./TimerForm";

type Props = {
  editFormOpen: boolean;
  elapsed: string;
  id: string;
  isRunning: boolean;
  project: string;
  title: string;
};

const EditableTimer = ({
  editFormOpen,
  elapsed,
  id,
  isRunning,
  project,
  title,
}: Props) => {
  if (editFormOpen) {
    return <TimerForm id={id} title={title} project={project} />;
  }
  return (
    <Timer
      id={id}
      title={title}
      project={project}
      elapsed={elapsed}
      isRunning={isRunning}
    />
  );
};

export default EditableTimer;
