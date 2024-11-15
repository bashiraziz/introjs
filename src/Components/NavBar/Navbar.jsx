import React from "react";
import { Grid } from "antd";
import favicon512  from "../../Assets/android-chrome-512x512.png"
//import favicon192  from "../../Assets/android-chrome-192x192.png"
//import Logo from "./../../Assets/accounting.png";
import "./Navbar.css";
import "antd/dist/antd.css";

const { useBreakpoint } = Grid;

const Navbar = () => {
  const { sm, md, lg } = useBreakpoint();

  const headingFontSize = lg ? '1.5rem' : (md ? '1.3rem' : (sm ? '1.1rem' : '10px'));

  return (
    <div className="navbar">
      <img src={favicon512} alt="" width="40px" />
      {
        sm && <h2 style={{ fontSize: headingFontSize }}>ACCOUNT RULES!!!</h2>
      }
    </div>
  );
};

export default Navbar;
