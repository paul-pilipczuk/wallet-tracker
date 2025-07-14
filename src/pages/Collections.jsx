// src/pages/Collections.jsx
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { collectionTotals, breakdownForPie } from "../data/mockCollections";
import { CollectionsContext } from "../contexts/CollectionsContext";
import "./Collections.css";

const COLORS = {
    BTC: "#F7931A",
    ETH: "#627EEA",
    SOL: "#00FFA3",
};


export default function CollectionsPage() {
    const { id } = useParams();
    const navigate = useNavigate();


    // Determine if in "new collection" mode (no id param)
    const isNew = !id;

    // Blank template for a new collection
    const newTemplate = { id: "", name: "", assets: { BTC: [], ETH: [], SOL: [] } };

    // Choose template or find existing
    const { collections, setCollections } = useContext(CollectionsContext);
    const collection = isNew
        ? newTemplate
        : collections.find((c) => c.id === id);

    // if neither new nor found, show fallback
    if (!collection) {
        return <p>Collection not found.</p>;
    }

    // header state
    // start name-editing if new
    const [isEditingName, setIsEditingName] = useState(isNew);
    const [nameDraft, setNameDraft] = useState(collection.name);
    const [menuOpen, setMenuOpen] = useState(false);


    useEffect(() => {
        setNameDraft(collection.name);
        setIsEditingName(isNew);
        setMenuOpen(false);
    }, [id, location.pathname]);

    const handleSaveName = () => {
        // TODO: persist nameDraft back to your store/API
        //setIsEditingName(false);
        setCollections(prev =>
            prev.map(c =>
                c.id === id
                    ? { ...c, name: nameDraft }
                    : c
            )
        );
        setIsEditingName(false);
    };

    const handleClone = () => {
        // navigates to new-collection mode with clone query
        navigate(`/collections?clone=${id}`);
    };

    const handleDelete = () => {
        // TODO: replace with your modal/confirmation component
        if (window.confirm(`Delete collection “${collection.name}”?`)) {
            // TODO: perform deletion in store/API
            navigate("/overview");
        }
    };

    const addressEntries = Object.entries(collection.assets)
        .flatMap(([chain, addr]) => addr.map((a) => ({ ...a, chain })))
        .sort((a, b) => {
            if (a.chain !== b.chain) return a.chain.localeCompare(b.chain);
            return a.usd - b.usd;
        });

    return (
        <div className="collections-wrapper">
            <header className="collections-header">
                {/* Title or inline edit */}
                {isEditingName ? (
                    <div className="name-edit">
                        <input
                            value={nameDraft}
                            onChange={(e) => setNameDraft(e.target.value)}
                        />
                        <button className="save-btn" onClick={handleSaveName}>
                            Save
                        </button>
                    </div>
                ) : (
                    <h1 className="title">
                        {collection.name}{" "}
                        <span
                            className="edit-icon"
                            onClick={() => setIsEditingName(true)}
                        >
                            ✎
                        </span>
                    </h1>
                )}

                {/* Edit dropdown */}
                <div className="actions">
                    <button
                        className="menu-toggle"
                        onClick={() => setMenuOpen((o) => !o)}
                    >
                        Edit ▾
                    </button>
                    {menuOpen && (
                        <ul className="menu">
                            {/* Clone only for existing collections */}
                            {!isNew && <li onClick={handleClone}>Clone</li>}
                            <li onClick={handleDelete}>{isNew ? "Cancel" : "Delete"}</li>
                        </ul>
                    )}
                </div>
            </header>

            {/* ───────── SUMMARY PANEL ───────── */}
            <aside className="summary-panel">
                <div className="summary-row">
                    <div className="summary-text">
                        <div className="total-card">
                            Total: ${collectionTotals(collection).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </div>
                        <ul className="summary-legend">
                            {breakdownForPie(collection).map((b) => (
                                <li key={b.chain}>
                                    <span className="dot" style={{ background: COLORS[b.chain] }} />
                                    {b.chain}: ${b.usd.toLocaleString()}
                                </li>
                            ))}
                        </ul>
                    </div>

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
                                    <Cell key={entry.chain} fill={COLORS[entry.chain]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                        </PieChart>
                    </div>
                </div>
            </aside>

            {/* address table*/}
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