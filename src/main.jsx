import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";       
import "./index.css";
import { CollectionsProvider } from "./contexts/CollectionsContext.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CollectionsProvider>
      <RouterProvider router={router} />
    </CollectionsProvider>       
  </StrictMode>
);