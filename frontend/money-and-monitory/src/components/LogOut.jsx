import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any logout actions (e.g., clearing user session, etc.)
    // Then redirect to the home page
    navigate("/");
  };

  return <></>;
};

export default Logout;
