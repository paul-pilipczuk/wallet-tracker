import { Outlet } from "react-router-dom";
import { CollectionsProvider } from "./contexts/CollectionsContext";

export default function AppShell() {
  return (
    <CollectionsProvider>
      <Outlet />
    </CollectionsProvider>
  );
}