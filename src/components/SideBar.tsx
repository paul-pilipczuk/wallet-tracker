import { NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import { CollectionsContext } from "../contexts/CollectionsContext";
import "./SideBar.css";

export default function SideBar() {
  const { collections } = useContext(CollectionsContext);

  // start collapsed so spacing is consistent when closed
  const [open, setOpen] = useState(false);

  return (
    <aside className="sidebar">
      <NavLink to="/" className="brand">Wallet&nbsp;Tracker</NavLink>

      <NavLink
        to="/overview"
        className={({ isActive }) => "item" + (isActive ? " active" : "")}
      >
        Overview
      </NavLink>

      {/* Toggle (no arrow) */}
      <div
        className="item collections-header"
        onClick={() => setOpen(!open)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setOpen(!open)}
        aria-expanded={open}
      >
        Collections
      </div>

      {/* wrapper ensures we can 100% remove space when collapsed */}
      <div className="sub-section" data-open={open ? "true" : "false"}>
        <ul className="sub-list">
          {collections.length === 0 ? (
            <li>
              <NavLink
                to="/collections"
                end
                className={({ isActive }) =>
                  "sub-item new" + (isActive ? " active" : "")
                }
              >
                ➕&nbsp;New Collection
              </NavLink>
            </li>
          ) : (
            <>
              {collections.map((c) => (
                <li key={c.id}>
                  <NavLink
                    to={`/collections/${c.id}`}
                    className={({ isActive }) =>
                      "sub-item" + (isActive ? " active" : "")
                    }
                  >
                    {c.name}
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink
                  to="/collections"
                  end
                  className={({ isActive }) =>
                    "sub-item new" + (isActive ? " active" : "")
                  }
                >
                  ➕&nbsp;New Collection
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      <NavLink
        to="/addresses"
        className={({ isActive }) => "item" + (isActive ? " active" : "")}
      >
        Addresses
      </NavLink>
      <NavLink
        to="/analytics"
        className={({ isActive }) => "item" + (isActive ? " active" : "")}
      >
        Analytics
      </NavLink>

      <div className="grow" />

      <NavLink
        to="/profile"
        className={({ isActive }) => "item" + (isActive ? " active" : "")}
      >
        Profile
      </NavLink>
      <NavLink
        to="/help"
        className={({ isActive }) => "item" + (isActive ? " active" : "")}
      >
        Help
      </NavLink>
    </aside>
  );
}