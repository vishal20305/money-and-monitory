import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { AuthProvider } from "./components/AuthContext"; // Import the AuthProvider

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
