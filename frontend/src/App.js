import ResponsiveDrawer from "./components/ResponsiveDrawer";
import React from "react";
import Modal from "./components/Modal";
import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";
import { ListTasksProvider } from "./context/ListTasksContext";
import { ModalProvider } from "./context/ModalContext";
import { ConfirmProvider } from "./context/ConfirmContext";

function App() {
  return (
    <ModalProvider>
      <ListTasksProvider>
        <ConfirmProvider>
            <Modal />
            <Routes>
              <Route exact path="/" element={<AuthPage/>} />
              <Route
                exact
                path="/all"
                element={<ResponsiveDrawer path="all" />}
              />
              <Route
                exact
                path="/stared"
                element={<ResponsiveDrawer path="star" />}
              />
              <Route
                exact
                path="/urgent"
                element={<ResponsiveDrawer path="urgent" />}
              />
              <Route
                exact
                path="/complete"
                element={<ResponsiveDrawer path="complete" />}
              />
              <Route
                exact
                path="/incomplete"
                element={<ResponsiveDrawer path="incomplete" />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
        </ConfirmProvider>
      </ListTasksProvider>
    </ModalProvider>
  );
}

export default App;
