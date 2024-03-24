import React, { createContext, useState, useContext } from "react";

const ListTasksContext = createContext();

export const ListTasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  return (
    <ListTasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </ListTasksContext.Provider>
  );
};

export const useListTasks = () => useContext(ListTasksContext);