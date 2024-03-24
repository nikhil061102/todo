import React, { createContext, useState, useContext } from "react";

const ConfirmContext = createContext();

export const ConfirmProvider = ({ children }) => {
  const [openConfirmSave, setOpenConfirmSave] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  return (
    <ConfirmContext.Provider value={{ openConfirmSave, setOpenConfirmSave, openConfirmDelete, setOpenConfirmDelete }}>
      {children}
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => useContext(ConfirmContext);