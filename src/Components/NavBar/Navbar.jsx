import React from "react";
import { Grid } from "antd";
import favicon512 from "../../Assets/android-chrome-512x512.png";
// Uncomment the following line if you plan to use this asset in the future:
// import favicon192 from "../../Assets/android-chrome-192x192.png";
// Uncomment if you want to include another logo in the Navbar:
// import Logo from "./../../Assets/accounting.png";
import "./Navbar.css";
import "antd/dist/antd.css";

// Destructure `useBreakpoint` from Ant Design's Grid for responsive design.
const { useBreakpoint } = Grid;

const Navbar = () => {
  // Get breakpoint values (sm, md, lg) to manage responsiveness
  const { sm, md, lg } = useBreakpoint();

  // Dynamically adjust the font size of the heading based on the screen size
  const headingFontSize = lg
    ? "1.5rem" // Large screens
    : md
    ? "1.3rem" // Medium screens
    : sm
    ? "1.1rem" // Small screens
    : "10px"; // Extra small screens

  return (
    <div className="navbar">
      {/* Display a favicon/logo in the navbar */}
      <img src={favicon512} alt="App Logo" width="40px" />

      {/* Display a heading only on small screens and above */}
      {sm && <h2 style={{ fontSize: headingFontSize }}>ACCOUNT RULES!!!</h2>}
    </div>
  );
};

export default Navbar;
