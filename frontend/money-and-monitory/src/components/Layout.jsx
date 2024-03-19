import React from "react";
import MiniDrawer from "./MiniDrawer";
import { useParams } from "react-router-dom";

const Layout = () => {
  const { clientId } = useParams();
  return (
    <>
      <MiniDrawer />
    </>
  );
};

export default Layout;
