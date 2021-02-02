import { useState } from "react";

export const useEditFormToggle = (
  initialState = false
): [boolean, () => void] => {
  const [isEditFormOpen, setEditFormOpen] = useState(initialState);
  const handleEditFormOpen = () => setEditFormOpen(!isEditFormOpen);
  return [isEditFormOpen, handleEditFormOpen];
};
