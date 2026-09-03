import React from "react";
import ReactDOM from "react-dom/client";
import { Gallery } from "./src/Gallery";
import "../src/styles/minecraft-ui.css";
import "./src/demo.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Gallery />
  </React.StrictMode>
);
