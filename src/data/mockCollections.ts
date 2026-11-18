import collectionsData from "./mCollections.json";
import type { Chain } from "../constants/chains";

export interface Asset {
  address: string;
  usd: number;
}

export interface Collection {
  id: string;
  name: string;
  assets: Record<Chain, Asset[]>;
}

export const mockCollections: Collection[] = collectionsData;

export const collectionTotals = (collection: Collection): number =>
  Object.values(collection.assets).flat().reduce((sum, asset) => sum + asset.usd, 0);

export const breakdownForPie = (collection: Collection) =>
  (Object.entries(collection.assets) as [Chain, Asset[]][]).map(([chain, assets]) => ({
    chain,
    usd: assets.reduce((sum, asset) => sum + asset.usd, 0),
    count: assets.length,
  }));
