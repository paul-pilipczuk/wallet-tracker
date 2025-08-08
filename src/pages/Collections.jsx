import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { collectionTotals, breakdownForPie } from "../data/mockCollections";
import { CollectionsContext } from "../contexts/CollectionsContext";
import { CHAIN_COLORS } from "../constants/chains";
import "./Collections.css";

export default function CollectionsPage() {
  const { collections, setCollections } = useContext(CollectionsContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const isNew = !id;
  const newTemplate = { id: "", name: "", assets: { BTC: [], ETH: [], SOL: [] } };
  const collection = isNew ? newTemplate : collections.find((c) => c.id === id);

  if (!collection) return <p>Collection not found.</p>;

  const [isEditingName, setIsEditingName] = useState(isNew);
  const [nameDraft, setNameDraft] = useState(collection.name);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setNameDraft(collection.name);
    setIsEditingName(isNew);
    setMenuOpen(false);
  }, [id]);

  const handleSaveName = () => {
    if (isNew) return; // nothing to save yet for new template
    setCollections((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name: nameDraft } : c))
    );
    setIsEditingName(false);
  };

  const addressEntries = Object.entries(collection.assets)
    .flatMap(([chain, arr]) => arr.map((a) => ({ ...a, chain })))
    .sort((a, b) => (a.chain === b.chain ? a.usd - b.usd : a.chain.localeCompare(b.chain)));

  return (
    <div className="collections-wrapper">
      <header className="collections-header">
        {isEditingName ? (
          <div className="name-edit">
            <input value={nameDraft} onChange={(e) => setNameDraft(e.target.value)} />
            <button className="save-btn" onClick={handleSaveName}>Save</button>
          </div>
        ) : (
          <h1 className="title">
            {collection.name}{" "}
            <span className="edit-icon" onClick={() => setIsEditingName(true)}>✎</span>
          </h1>
        )}
        <div className="actions">
          <button className="menu-toggle" onClick={() => setMenuOpen((o) => !o)}>Edit ▾</button>
          {menuOpen && (
            <ul className="menu">
              {!isNew && <li onClick={() => navigate(`/collections?clone=${id}`)}>Clone</li>}
              <li onClick={() => navigate("/overview")}>{isNew ? "Cancel" : "Delete"}</li>
            </ul>
          )}
        </div>
      </header>

      {/* SUMMARY PANEL */}
      <aside className="summary-panel">
        <div className="summary-row">
          <div className="summary-chart">
            <PieChart width={200} height={200}>
              <Pie
                data={breakdownForPie(collection)}
                dataKey="usd"
                nameKey="chain"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                strokeWidth={0}
              >
                {breakdownForPie(collection).map((entry) => (
                  <Cell key={entry.chain} fill={CHAIN_COLORS[entry.chain]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
            </PieChart>
          </div>

          <div className="summary-text">
            <div className="total-card">
              Total: ${collectionTotals(collection).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <ul className="summary-legend">
              {breakdownForPie(collection).map((b) => (
                <li key={b.chain}>
                  <span className="dot" style={{ background: CHAIN_COLORS[b.chain] }} />
                  {b.chain}: ${b.usd.toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      {/* ADDRESS LIST */}
      <section className="address-list">
        <table className="address-table">
          <thead>
            <tr>
              <th>Chain</th>
              <th>Address</th>
              <th>Value (USD)</th>
            </tr>
          </thead>
          <tbody>
            {addressEntries.map(({ address, chain, usd }) => (
              <tr key={`${chain}-${address}`}>
                <td>{chain}</td>
                <td>{address}</td>
                <td>${usd.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}