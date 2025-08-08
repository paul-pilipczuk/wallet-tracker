// src/pages/Collections.jsx
import { useState, useEffect, useContext, useMemo } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { collectionTotals, breakdownForPie } from "../data/mockCollections";
import { CollectionsContext } from "../contexts/CollectionsContext";
import { CHAIN_COLORS } from "../constants/chains";
import "./Collections.css";

export default function CollectionsPage() {
  const { collections, setCollections } = useContext(CollectionsContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // If we're at /collections (no :id), this is a "new" collection screen
  const isNew = !id;

  // Optional clone mode: /collections?clone=<id>
  const cloneId = searchParams.get("clone");
  const cloneSource = useMemo(
    () => (cloneId ? collections.find((c) => c.id === cloneId) : null),
    [cloneId, collections]
  );

  // When "new", start from either a blank template or a cloned asset set
  const newTemplate = useMemo(
    () => ({
      id: "",
      name: "",
      assets: cloneSource
        ? structuredClone(cloneSource.assets) // deep copy for safety
        : { BTC: [], ETH: [], SOL: [] },
    }),
    [cloneSource]
  );

  // Use template (new) or existing (by id)
  const collection = isNew ? newTemplate : collections.find((c) => c.id === id);

  if (!collection) return <p>Collection not found.</p>;

  const [isEditingName, setIsEditingName] = useState(isNew);
  const [nameDraft, setNameDraft] = useState(collection.name);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setNameDraft(collection.name);
    setIsEditingName(isNew);
    setMenuOpen(false);
  }, [id, isNew, collection.name]);

  // Small helper to generate a URL-safe id from a name
  const slugify = (str) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSaveName = () => {
    const trimmed = nameDraft.trim();
    if (!trimmed) {
      alert("Please enter a name.");
      return;
    }

    if (isNew) {
      // CREATE: build a unique id (slug + disambiguator if necessary)
      let base = slugify(trimmed) || "collection";
      let candidate = base;
      const exists = (x) => collections.some((c) => c.id === x);
      if (exists(candidate)) {
        candidate = `${base}-${Date.now().toString(36).slice(-4)}`;
      }

      const newCol = {
        id: candidate,
        name: trimmed,
        assets: collection.assets, // template or cloned assets
      };

      setCollections((prev) => [...prev, newCol]);
      // Navigate to the new collection route so sidebar highlights & page shows it
      navigate(`/collections/${candidate}`, { replace: true });
      setIsEditingName(false);
      return;
    }

    // UPDATE: rename an existing collection
    setCollections((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name: trimmed } : c))
    );
    setIsEditingName(false);
  };

  const handleDelete = () => {
    if (isNew) {
      navigate("/overview");
      return;
    }
    if (window.confirm(`Delete collection “${collection.name}”?`)) {
      setCollections((prev) => prev.filter((c) => c.id !== id));
      navigate("/overview");
    }
  };

  const handleClone = () => {
    navigate(`/collections?clone=${id}`);
  };

  // Flatten & sort addresses for the table
  const addressEntries = Object.entries(collection.assets)
    .flatMap(([chain, arr]) => arr.map((a) => ({ ...a, chain })))
    .sort((a, b) =>
      a.chain === b.chain ? a.usd - b.usd : a.chain.localeCompare(b.chain)
    );

  return (
    <div className="collections-wrapper">
      <header className="collections-header">
        {isEditingName ? (
          <div className="name-edit">
            <input
              value={nameDraft}
              onChange={(e) => setNameDraft(e.target.value)}
              placeholder="Collection name"
              autoFocus
            />
            <button className="save-btn" onClick={handleSaveName}>
              Save
            </button>
          </div>
        ) : (
          <h1 className="title">
            {collection.name}{" "}
            <span className="edit-icon" onClick={() => setIsEditingName(true)}>
              ✎
            </span>
          </h1>
        )}

        <div className="actions">
          <button className="menu-toggle" onClick={() => setMenuOpen((o) => !o)}>
            Edit ▾
          </button>
          {menuOpen && (
            <ul className="menu">
              {!isNew && <li onClick={handleClone}>Clone</li>}
              <li onClick={handleDelete}>{isNew ? "Cancel" : "Delete"}</li>
            </ul>
          )}
        </div>
      </header>

      {/* ───────── SUMMARY PANEL ───────── */}
      <aside className="summary-panel">
        <div className="summary-row">
          {/* Pie Chart (left) */}
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

          {/* Total & Legend (right) */}
          <div className="summary-text">
            <div className="total-card">
              Total: $
              {collectionTotals(collection).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </div>
            <ul className="summary-legend">
              {breakdownForPie(collection).map((b) => (
                <li key={b.chain}>
                  <span
                    className="dot"
                    style={{ background: CHAIN_COLORS[b.chain] }}
                  />
                  {b.chain}: ${b.usd.toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      {/* ───────── ADDRESS LIST ───────── */}
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