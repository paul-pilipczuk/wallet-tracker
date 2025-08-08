import { useState, useContext } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { breakdownForPie, collectionTotals } from "../data/mockCollections";
import { CollectionsContext } from "../contexts/CollectionsContext";
import { CHAIN_COLORS } from "../constants/chains";
import "./Overview.css";

export default function Overview() {
  const { collections } = useContext(CollectionsContext);

  if (!collections || collections.length === 0) {
    return (
      <div className="ov-wrapper">
        <h2 className="ov-total">$0.00</h2>
        <p>No collections yet. Create one in the sidebar.</p>
      </div>
    );
  }

  const [selectedId, setSelectedId] = useState(collections[0]?.id || "");
  const collection =
    collections.find((c) => c.id === selectedId) || collections[0];

  const totalUsd = collectionTotals(collection);
  const breakdown = breakdownForPie(collection);
  const pieData = breakdown.map((b) => ({ name: b.chain, value: b.usd }));

  return (
    <div className="ov-wrapper">
      <h2 className="ov-total">
        ${totalUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </h2>

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
            {pieData.map((d) => (
              <Cell key={d.name} fill={CHAIN_COLORS[d.name]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(v) =>
              `$${v.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
            }
          />
        </PieChart>

        <ul className="ov-legend">
          {breakdown.map((b) => (
            <li key={b.chain}>
              <span className="dot" style={{ background: CHAIN_COLORS[b.chain] }} />
              {b.chain}&nbsp;—&nbsp;{b.count} addr · $
              {b.usd.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </li>
          ))}
        </ul>
      </div>

      <label className="ov-select-label">
        Collection:&nbsp;
        <select
          value={collection.id}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          {collections.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}