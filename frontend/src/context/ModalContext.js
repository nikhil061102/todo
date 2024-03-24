import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({
    title: "",
    desc: "",
    isCompleted: false,
    isDateTimePickerEnabled: false,
    deadline: undefined, 
    isStarred: false,
  });

  return (
    <ModalContext.Provider value={{ openModal, setOpenModal, data, setData }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(ModalContext);
};
