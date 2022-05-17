import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./AuthProvider";
import CheckoutProvider from "./CheckoutProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CheckoutProvider>
          <App />
        </CheckoutProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
