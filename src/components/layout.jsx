import { useEffect, useState } from "react";
import { signOut } from "aws-amplify/auth";
import SiteNav from "./common/SiteNav";
import FileDisplayPage from "./FileDisplayPage";
import { useLocation, useNavigate } from "react-router-dom";

const Layout = ({children}) => {
  
  const location = useLocation()
  console.log("location",location.pathname);
  const handleSignOut = async () => {
    try {
      await signOut();
      console.log("Signed Out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  

  return (
    <>
      <SiteNav logOut={handleSignOut} />
      {children}
    </>
  );
};

export default Layout;
