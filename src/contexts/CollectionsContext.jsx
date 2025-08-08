import React, { createContext, useState, useEffect } from "react";
import { mockCollections } from "../data/mockCollections";

export const CollectionsContext = createContext({
  collections: [],
  setCollections: () => {},
});

const STORAGE_KEY = "wt.collections.v1";

export function CollectionsProvider({ children }) {
  const [collections, setCollections] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : mockCollections;
    } catch {
      return mockCollections;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(collections));
    } catch (err) {
      console.warn("Persist collections failed:", err);
    }
  }, [collections]);

  return (
    <CollectionsContext.Provider value={{ collections, setCollections }}>
      {children}
    </CollectionsContext.Provider>
  );
}