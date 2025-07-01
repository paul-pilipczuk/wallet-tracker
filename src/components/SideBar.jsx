import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./SideBar.css";

export default function SideBar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true); 
  
  const collections = []; // This would be fetched from an API or context in a real app, empty for now

  return (
    <aside className="sidebar">

      <NavLink to="/"   className="brand">Wallet&nbsp;Tracker</NavLink>

      <NavLink to="/overview"   className={({ isActive }) => "item" + (isActive ? " active" : "")}>Overview</NavLink>

      
      <div className="item collections-header"
        onClick={() => setOpen(!open)}
        role="button">
        Collections
      </div>

      
      {open && (
        <ul className="sub-list">
          {collections.length === 0 ? (
            <li
              className="sub-item new"
              onClick={() => navigate("/collections")}
            >
              ➕&nbsp;New Collection
            </li>
          ) : (
            collections.map((c) => (
              <li
                key={c.id}
                className="sub-item"
                onClick={() => navigate(`/collections/${c.id}`)}
              >
                {c.name}
              </li>
            ))
          )}
        </ul>
      )}

      <NavLink to="/addresses"  className={({ isActive }) => "item" + (isActive ? " active" : "")}>Addresses</NavLink>
      <NavLink to="/analytics"  className={({ isActive }) => "item" + (isActive ? " active" : "")}>Analytics</NavLink>

      <div className="grow" />  
      <NavLink to="/profile"    className={({ isActive }) => "item" + (isActive ? " active" : "")}>Profile</NavLink>
      <NavLink to="/help"       className={({ isActive }) => "item" + (isActive ? " active" : "")}>Help</NavLink>
    </aside>
  );
}