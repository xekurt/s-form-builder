import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import Store from "./Store";
import ModalProvider from "./Components/ModalProvider/index";
import "./assets/fonts/IRANSansWeb-Bold.ttf";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={Store}>
    <ModalProvider>
      <App />
    </ModalProvider>
  </Provider>
);
