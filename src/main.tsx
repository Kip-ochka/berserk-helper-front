import { allSettled, fork } from "effector";
import { Provider } from "effector-react";
import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "@/app";

import { appStarted } from "@/shared/lib/init.ts";

const scope = fork();
const root = document.getElementById("root") as HTMLElement;

allSettled(appStarted, { scope }).catch((reason) => {
  console.warn("Failed to start the app with reason:", reason);
});

ReactDOM.createRoot(root).render(
  <Provider value={scope}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
);
