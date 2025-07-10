import React, { createContext, useState } from "react";
import { mockCollections as initialData } from "../data/mockCollections";

export const CollectionsContext = createContext({
  collections: [],
  setCollections: () => {},
});

export function CollectionsProvider({ children }) {
  
  const [collections, setCollections] = useState(initialData);

  return (
    <CollectionsContext.Provider value={{ collections, setCollections }}>
      {children}
    </CollectionsContext.Provider>
  );
}