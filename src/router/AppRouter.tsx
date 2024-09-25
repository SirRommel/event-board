import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PagesRoutes } from "../constants";
import { Registration } from "../pages/Registration/Registration";
import { Login } from "../pages/Login/Login";

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Navigate to={"/registration"} />}></Route>
      <Route path={PagesRoutes.REGISTRATION} element={<Registration />}></Route>
      <Route path={PagesRoutes.LOGIN} element={<Login />} />
    </Routes>
  );
};
