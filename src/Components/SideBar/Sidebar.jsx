import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  AccountBookOutlined,
  DollarCircleOutlined,
  CommentOutlined,
} from "@ant-design/icons";

import "./Sidebar.css";
import "antd/dist/antd.css";

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
  const [current, setCurrent] = useState("");

  return (
    <div className="side-bar">
      <Menu
        theme="dark"
        mode="inline"
        onClick={(e) => setCurrent(e.key)}
        selectedKeys={[current]}
      >
        <div className="logo" />
        {menuItems.map((menuItem, i) => {
          const classes = [];
          const isActive = menuItem.href === window.location.pathname;
          isActive && classes.push("active");

          return (
            <Menu.Item
              key={String(i)}
              className={`${classes.join(" ")} intro-${menuItem.id}`}
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
