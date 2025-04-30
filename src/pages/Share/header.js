import React, { memo, useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";

const tabs = ["Trang chủ", "Công việc hằng ngày", "Báo cáo thống kê"];
const paths = ["/quanLyCaNhan", "/about", "/thongKeTuan"];

function MenuBar() {
  const [activeTab, setActiveTab] = useState("Trang chủ");

  return (
    <div className="menu-bar">
      {paths.map((path, index) => (
        <Link
          key={tabs[index]}
          onClick={() => setActiveTab(tabs[index])}
          to={path}
          className={`menu-item ${activeTab === tabs[index] ? "active" : ""}`}
          style={{ textDecoration: "none" }}
        >
          {tabs[index]}
        </Link>
      ))}
    </div>
  );
}

export default memo(MenuBar);
