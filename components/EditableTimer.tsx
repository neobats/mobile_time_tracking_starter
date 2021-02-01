import React from "react";
import Timer from "./Timer";
import TimerForm from "./TimerForm";

type Props = {
  elapsed: string;
  id: string;
  project: string;
  title: string;
  editFormOpen?: boolean;
  isRunning?: boolean;
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
