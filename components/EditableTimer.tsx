import React from "react"
import { ITimer, removeFn, updateFn } from "../types"
import { useEditFormToggle } from "../utils/hooks"
import Timer from "./Timer"
import TimerForm from "./TimerForm"

type Props = {
  elapsed: number
  id: string
  project: string
  title: string
  isRunning?: boolean
  toggleRunning: (id: string) => ITimer | null
  editTimer: updateFn
  removeTimer: removeFn
}

const EditableTimer = ({
  elapsed,
  id,
  isRunning,
  toggleRunning,
  project,
  title,
  editTimer,
  removeTimer,
}: Props) => {
  const [isEditFormOpen, setEditFormOpen] = useEditFormToggle()

  const onEdit: updateFn = (id, timer) => {
    setEditFormOpen()
    return editTimer(id, timer)
  }

  if (isEditFormOpen) {
    return (
      <TimerForm
        id={id}
        title={title}
        project={project}
        onCancel={setEditFormOpen}
        onEdit={onEdit}
      />
    )
  }
  return (
    <Timer
      id={id}
      title={title}
      project={project}
      elapsed={elapsed}
      isRunning={isRunning}
      toggleRunning={toggleRunning}
      setEditFormOpen={setEditFormOpen}
      removeTimer={removeTimer}
    />
  )
}

export default EditableTimer
