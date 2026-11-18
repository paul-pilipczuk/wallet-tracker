import { createContext, useState, useEffect } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { Collection } from "../data/mockCollections";
import { mockCollections } from "../data/mockCollections";

export const CollectionsContext = createContext<{
  collections: Collection[];
  setCollections: Dispatch<SetStateAction<Collection[]>>;
}>({
  collections: [],
  setCollections: () => {},
});

const STORAGE_KEY = "wt.collections.v1";

export function CollectionsProvider({ children }: { children: ReactNode }) {
  const [collections, setCollections] = useState<Collection[]>(() => {
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