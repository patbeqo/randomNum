import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MagicBallProvider } from "./state/magicBallContext";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <MagicBallProvider>
          <App />
        </MagicBallProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}
