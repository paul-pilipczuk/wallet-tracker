import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

export default function AppLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <SideBar /> 
      <section style={{ flex: 1, overflowY: "auto" }}>
        <Outlet />
      </section>
    </div>
  );
}