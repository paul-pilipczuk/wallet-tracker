import collectionsData from "./mCollections.json";


export const mockCollections = collectionsData;

export const collectionTotals = c =>
  Object.values(c.assets).flat().reduce((sum, a) => sum + a.usd, 0);

export const breakdownForPie = c =>
  Object.entries(c.assets).map(([chain, arr]) => ({
    chain,
    usd: arr.reduce((s, a) => s + a.usd, 0),
    count: arr.length,
  }));

