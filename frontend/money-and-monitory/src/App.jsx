import Home from "./components/Home/index.jsx";
import Login from "./components/Login.jsx";
import RegistrationPage from "./components/RegistrationPage.jsx";
import Layout from "./components/Layout.jsx";
import Logout from "./components/LogOut.jsx";
import { AuthProvider } from "./components/AuthContext";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";

function App() {
  // <Transaction transactionType="credit" />
  // <Transaction transactionType="debit" />

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={RegistrationPage} />
        <Route path="/layout" Component={Layout} />
        <Route path="/logout" component={Logout} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
