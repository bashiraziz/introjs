import React, { useState, useEffect } from "react";
import introJs from "intro.js";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Layout } from "antd";
import "intro.js/introjs.css";
import Navbar from "../../Components/NavBar/Navbar.jsx";
import Sidebar from "../../Components/SideBar/Sidebar";
import TrialBalance from "../TrialBalance/TrialBalance.jsx";
import ProfitAndLoss from "../ProfitAndLoss/ProfitAndLoss.jsx";
import BalanceSheet from "../BalanceSheet/BalanceSheet.jsx";
import TAccount from "../taccount-page";
import Feedback from "../Feedback";
import { menuItems } from "../../Components/SideBar/Sidebar";
import "./Dashboard.css";
import "antd/dist/antd.css";

const { Header, Content, Sider } = Layout;

const DashboardContent = () => {
  const [collapsed, setCollapsed] = useState(false); // State to toggle sidebar collapsed/expanded
  const location = useLocation(); // Tracks the current route
  const navigate = useNavigate(); // Allows programmatic navigation

  useEffect(() => {
    const intro = introJs();

    // Function to scroll specific elements into view during the intro.js tour
    const ensureElementVisible = (elementId) => {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    // Configure the intro.js tour steps and behavior
    intro.setOptions({
      steps: [
        {
          title: "Welcome to Your Dashboard",
          intro: "Let's take a quick tour of your accounting dashboard!",
          position: "center",
        },
        ...menuItems.map((item) => ({
          element: `#sidebar-${item.id}`,
          title: item.introData.title,
          intro: item.introData.description,
          position: item.introData.position,
          scrollTo: "tooltip",
          scrollPadding: 20,
          beforeChange: () => {
            // Ensure the correct menu item is visible and navigate to its route
            ensureElementVisible(`sidebar-${item.id}`);
            if (location.pathname !== item.href) {
              navigate(item.href);
            }
          },
        })),
        {
          element: document.querySelector(".add-taccount-btn"), // Custom step for 'Add TAccount' button
          title: "Add New TAccount",
          intro: "Click here to add a new TAccount to your dashboard.",
          position: "left",
        },
        {
          title: "Tour Complete!",
          intro: "You're now ready to start using your accounting dashboard.",
          position: "center",
          doneLabel: "Done",
        },
      ],
      tooltipClass: "custom-tooltip",
      highlightClass: "custom-highlight",
      exitOnOverlayClick: false, // Prevent exiting the tour when clicking outside
      showStepNumbers: true, // Display step numbers in the tour
      keyboardNavigation: true,
      showBullets: true,
      hidePrev: true,
      hideNext: true,
      showProgress: false, // Disable progress bar display
    });

    // Customize the "Done" button for the last step
    intro.onafterchange(() => {
      const tooltip = document.querySelector(".introjs-tooltipbuttons");
      if (tooltip) {
        const existingDoneButton = tooltip.querySelector(".introjs-done-btn");
        if (existingDoneButton) {
          existingDoneButton.remove();
        }

        const doneButton = document.createElement("button");
        doneButton.className = "introjs-done-btn introjs-button";
        doneButton.innerText = "Done";
        doneButton.onclick = () => intro.exit();

        const backButton = tooltip.querySelector(".introjs-prevbutton");
        if (backButton) {
          backButton.insertAdjacentElement("afterend", doneButton);
        }
      }
    });

    intro.start(); // Start the tour when the component mounts

    // Cleanup on component unmount
    return () => intro.exit();
  }, []);

  return (
    <Layout>
      {/* Sidebar Layout */}
      <Sider
        className={`site-layout-background ${
          collapsed ? "sidebar-collapsed" : "sidebar-expanded"
        }`}
        breakpoint="md"
        collapsible
        collapsed={collapsed} // Sidebar state
        onCollapse={() => setCollapsed(!collapsed)} // Toggle sidebar collapse
      >
        <Sidebar />
      </Sider>

      {/* Main Content Layout */}
      <Layout className="site-layout">
        <Header className="site-layout-background">
          <Navbar />
        </Header>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            maxHeight: "100vh",
            overflow: "auto", // Enables scrolling for large content
          }}
        >
          {/* Define Routes for each page */}
          <Routes>
            <Route exact path="/" element={<TAccount />} />
            <Route exact path="/trial-balance" element={<TrialBalance />} />
            <Route
              exact
              path="/profit-and-loss-account"
              element={<ProfitAndLoss />}
            />
            <Route exact path="/balance-sheet" element={<BalanceSheet />} />
            <Route exact path="/feedback" element={<Feedback />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

const Dashboard = () => {
  return (
    <BrowserRouter>
      <DashboardContent />
    </BrowserRouter>
  );
};

export default Dashboard;
