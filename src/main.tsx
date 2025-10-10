import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./serviceworker.js")
      .then((reg) => console.log("Success: ", reg.scope))
      .catch((err) => console.log("Failure: ", err));
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
