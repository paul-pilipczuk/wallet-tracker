import { useState } from "react";
import {PieChart, Pie, Cell, Tooltip} from "recharts";
import { mockCollections, breakdownForPie, collectionTotals } from "../data/mockCollections";
import "./Overview.css";

/* mock data for collections  migrated to ../data/mockCollections.js*/
/* colors for each asset */
const COLORS = {
    BTC: "#F7931A",
    ETH: "#627EEA",
    SOL: "#00FFA3",
};

export default function Overview() {
    /* collection selector */
    const [selectedId, setSelectedId] = useState("default");
    const collection = mockCollections.find((c) => c.id === selectedId);
  
    /* totals + pie data derived from helpers */
    const totalUsd = collectionTotals(collection);          
    const pieData  = breakdownForPie(collection);           
  
    return (
      <div className="ov-wrapper">
        {/* total balance */}
        <h2 className="ov-total">
          ${totalUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </h2>
  
        {/* pie chart data */}
        <div className="ov-chart-row">
          <PieChart width={260} height={260}>
            <Pie
              data={pieData}
              dataKey="usd"      
              nameKey="chain"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              strokeWidth={0}
            >
              {pieData.map((d) => (
                <Cell key={d.chain} fill={COLORS[d.chain]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(v) =>
                `$${v.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
              }
            />
          </PieChart>
  
          {/* legend */}
          <ul className="ov-legend">
            {pieData.map((b) => (
              <li key={b.chain}>
                <span className="dot" style={{ background: COLORS[b.chain] }} />
                {b.chain}&nbsp;—&nbsp;{b.count} addr · $
                {b.usd.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </li>
            ))}
          </ul>
        </div>
  
        {/* collection selector */}
        <label className="ov-select-label">
          Collection:&nbsp;
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
          >
            {mockCollections.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
      </div>
    );
  }