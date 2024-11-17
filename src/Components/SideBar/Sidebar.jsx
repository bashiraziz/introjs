import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
  AccountBookOutlined,
  DollarCircleOutlined,
  CommentOutlined,
} from "@ant-design/icons";

import "./Sidebar.css";
import "antd/dist/antd.css";

// Define menu items with properties like label, path, and icons
export const menuItems = [
  {
    label: "T-Accounts",
    href: "/",
    id: "tAccounts",
    icon: <AccountBookOutlined />,
    introData: {
      title: "T-Accounts",
      description: "Manage your ledger entries and account transactions here.",
      position: "right",
    },
  },
  {
    label: "Trial Balance",
    href: "/trial-balance",
    id: "trialBalance",
    icon: <DollarCircleOutlined />,
    introData: {
      title: "Trial Balance",
      description: "View and verify your account balances in one place.",
      position: "right",
    },
  },
  {
    label: "Feedback",
    href: "/feedback",
    id: "feedback",
    icon: <CommentOutlined />,
    introData: {
      title: "Feedback",
      description: "Share your thoughts and suggestions with us.",
      position: "right",
    },
  },
];

const Sidebar = () => {
  const [current, setCurrent] = useState(""); // Tracks the currently selected menu item

  return (
    <div className="side-bar">
      <Menu
        theme="dark"
        mode="inline"
        onClick={(e) => setCurrent(e.key)} // Updates selected menu item on click
        selectedKeys={[current]} // Highlights the active menu item
      >
        <div className="logo" />
        {menuItems.map((menuItem, i) => {
          const isActive = menuItem.href === window.location.pathname; // Check if the current path matches menu item
          return (
            <Menu.Item
              key={String(i)}
              className={`${isActive ? "active" : ""} intro-${menuItem.id}`} // Adds 'active' class if the menu item is selected
              id={`sidebar-${menuItem.id}`}
              data-intro={menuItem.introData.description}
              data-title={menuItem.introData.title}
              data-position={menuItem.introData.position}
            >
              <Link to={menuItem.href}>
                {menuItem.icon}
                <span className="nav-text">{menuItem.label}</span>
              </Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </div>
  );
};

export default Sidebar;
