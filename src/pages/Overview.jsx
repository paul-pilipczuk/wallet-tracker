import { useState } from "react";
import {PieChart, Pie, Cell, Tooltip} from "recharts";
import "./Overview.css";

/* fake data for giving a visual of the application */
const mockCollections = [
{
    id: "default",
    name: "Long-term HODL",
    totalUsd: 123456.78,
    breakdown: [
    { chain: "BTC", usd: 64200 },     // 52%
    { chain: "ETH", usd: 46800 },     // 38%
    { chain: "SOL", usd: 12456.78 },  // 10%
    ],
},
{
    id: "trading",
    name: "Trading stack",
    totalUsd: 98765.43,
    breakdown: [
    { chain: "BTC", usd: 30000 },
    { chain: "ETH", usd: 50000 },
    { chain: "SOL", usd: 18765.43 },
    ],
},
];

/* colors for each asset */
const COLORS = {
    BTC: "#F7931A",
    ETH: "#627EEA",
    SOL: "#00FFA3",
};

export default function Overview() {
    const [selectedId, setSelectedId] = useState("default");
    const collection = mockCollections.find(c => c.id === selectedId);

    const pieData = collection.breakdown.map(item => ({
        name: item.chain,
        value: item.usd,
    }));
    

return (
    <div className="ov-wrapper">
      {/* total balance */}
      <h2 className="ov-total">
        ${collection.totalUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </h2>

      { /* pie chart showing breakdown by chain */}
      <div className="ov-chart-row">
        <PieChart width={260} height={260}>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
            strokeWidth={0}
          >
            {pieData.map(entry => (
              <Cell key={entry.name} fill={COLORS[entry.name]} />
            ))}
          </Pie>
          <Tooltip
            formatter={v => `$${v.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
          />
        </PieChart>

        {/* legend */}
        <ul className="ov-legend">
          {collection.breakdown.map(b => (
            <li key={b.chain}>
              <span
                className="dot"
                style={{ background: COLORS[b.chain] }}
              />
              {b.chain}&nbsp;—&nbsp;
              ${b.usd.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </li>
          ))}
        </ul>
      </div>

      
      <label className="ov-select-label">
        Collection:&nbsp;
        <select value={selectedId} onChange={e => setSelectedId(e.target.value)}>
          {mockCollections.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </label>
    </div>
  );
}