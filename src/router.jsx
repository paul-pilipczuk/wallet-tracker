import { createBrowserRouter } from "react-router-dom";

import AppShell     from "./App.jsx";
import PublicLayout from "./layouts/PublicLayout";
import AppLayout    from "./layouts/AppLayout";

import Home        from "./pages/Home";
import Overview    from "./pages/Overview";
import Collections from "./pages/Collections";
import Addresses   from "./pages/Addresses";
import Analytics   from "./pages/Analytics";
import Profile     from "./pages/Profile";
import Help        from "./pages/Help";

export const router = createBrowserRouter([
  {
    element: <AppShell />,               // global providers / shell
    children: [
      /* ── public landing ───────────────────── */
      {
        element: <PublicLayout />,       // shows only on "/"
        children: [{ index: true, element: <Home /> }],
      },

      /* ── authenticated app area ───────────── */
      {
        element: <AppLayout />,          // sidebar shell
        children: [
          { path: "overview",    element: <Overview /> },
          { path: "collections", element: <Collections /> },
          { path: "addresses",   element: <Addresses /> },
          { path: "analytics",   element: <Analytics /> },
          { path: "profile",     element: <Profile /> },
          { path: "help",        element: <Help /> },
        ],
      },
    ],
  },
]);