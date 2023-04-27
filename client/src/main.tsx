import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";
import * as ReactDOMClient from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { store } from "./hooks/store";

ReactDOMClient.createRoot(
  document.getElementById("root") as HTMLElement
).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistStore(store)}>
      <App />
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);
