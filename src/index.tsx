import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { AppRouter } from "./router/AppRouter";

const container = document.getElementById("root");
const root = container ? createRoot(container) : null;

root?.render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <div style={{ display: "flex", height: "100vh" }}>
        <AppRouter />
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
