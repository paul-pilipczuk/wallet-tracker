import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./SideBar.css";

export default function SideBar() {
  const [open, setOpen] = useState(true); 

  return (
    <aside className="sidebar">
      <NavLink to="/overview"   className="item">Overview</NavLink>

      
      <div className="item" onClick={() => setOpen(!open)}>
        Collections {open ? "▾" : "▸"}
      </div>
      {open && (
        <ul className="sub-list">
          <li className="sub-item">Long-term HODL</li>
          <li className="sub-item">Trading stack</li>
        </ul>
      )}

      <NavLink to="/addresses"  className="item">Addresses</NavLink>
      <NavLink to="/analytics"  className="item">Analytics</NavLink>

      <div className="grow" />  
      <NavLink to="/profile"    className="item">Profile</NavLink>
      <NavLink to="/help"       className="item">Help</NavLink>
    </aside>
  );
}