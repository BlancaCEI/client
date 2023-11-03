import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Home from "./components/pages/Home";
import Lista from "./components/pages/Lista";
import CreatePlatos from "./components/pages/CreatePlatos";
import Platos from "./components/pages/Platos";
import EditPlatos from "./components/pages/EditPlatos";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route
            path="/"
            element={
              sessionStorage.getItem("email") == undefined ? (
                <Navigate to={"/login"} />
              ) : (
                <Home />
              )
            }
          />
          <Route
            path="/lista"
            element={
              sessionStorage.getItem("email") == undefined ? (
                <Navigate to={"/login"} />
              ) : (
                <Lista />
              )
            }
          />
          <Route
            path="/platos"
            element={
              sessionStorage.getItem("email") == undefined ? (
                <Navigate to={"/login"} />
              ) : (
                <Platos />
              )
            }
          />
          <Route
          path="/platos/crear/"
          element={
            sessionStorage.getItem("email") == undefined ? (
              <Navigate to={"/login"} />
            ) : (
              <CreatePlatos />
            )
          }
        />
          <Route
            path="/platos/editar/:id_plato"
            element={
              sessionStorage.getItem("email") == undefined ? (
                <Navigate to={"/login"} />
              ) : (
                <EditPlatos />
              )
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
