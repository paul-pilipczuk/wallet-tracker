import { useState } from 'react';
import { mockCollections as initialCollections } from '../data/mockCollections';
import './Addresses.css';


//temp "icons" for chains
const CHAIN_ICONS = {
    BTC: "₿",
    ETH: "Ξ",
    SOL: "◎",
};

const ETH_L2 = ["Base", "Ink", "OP Mainnet", "Arbitrum", "Polygon", "zkSync"];

export default function Addresses() {
    const [collections, setCollections] = useState(initialCollections);

    const [selectedChain, setSelectedChain] = useState(null);
    const [l2, setL2] = useState([]);
    const [addrInput, setAddrInput] = useState("");
    const [checked, setChecked] = useState({});
    const [showForm, setShowForm] = useState(false);

    const handleAdd = () => {
        if (!selectedChain || !addrInput) return;
        const updated = collections.map((c) =>
            checked[c.id]
                ? {
                    ...c,
                    assets: {
                        ...c.assets,
                        [selectedChain]: [
                            ...(c.assets[selectedChain] || []),
                            { address: addrInput, usd: 20 },
                        ],
                    },
                }
                : c
        );
        setCollections(updated);


        // Reset form state
        setAddrInput("");
        setChecked({});
        setSelectedChain(null);
        alert("Address added (mock)!");
    };

    const inChainPicker = selectedChain === null;
    const inL2Picker = selectedChain === "ETH" && !showForm;;
    const inForm = selectedChain && showForm;

    return (
        <div className="ad-wrapper">
            {/* --- CHAIN PICKER --- */}
            {inChainPicker && (
                <>
                    <h2 className="ad-title">Select a chain:</h2>
                    <div className="ad-chain-row">
                        {["BTC", "ETH", "SOL"].map((chain) => (
                            <button
                                key={chain}
                                className="chain-box"
                                onClick={() => {
                                    setSelectedChain(chain);
                                    setShowForm(chain !== 'ETH');
                                }}
                            >
                                <span className="icon">{CHAIN_ICONS[chain]}</span>
                                <span className="label">{chain}</span>
                            </button>
                        ))}
                    </div>
                </>
            )}

            {/* --- ETH L2 PICKER --- */}
            {inL2Picker && (
                <>
                    <button className="back-btn" onClick={() => setSelectedChain(null)}>
                        ← Back to chains
                    </button>
                    <h2 className="ad-title">Select ETH L2 network(s):</h2>

                    <div className="ad-l2-grid">
                        {ETH_L2.map((net) => (
                            <button
                                key={net}
                                className={`l2-box ${l2.includes(net) ? "selected" : ""}`}
                                onClick={() =>
                                    setL2((prev) =>
                                        prev.includes(net) ? prev.filter((n) => n !== net) : [...prev, net]
                                    )
                                }
                            >
                                {net}
                            </button>
                        ))}

                    </div>
                    <label className="select-all">
                        <input
                            type="checkbox"
                            checked={l2.length === ETH_L2.length}
                            onChange={(e) =>
                                setL2(e.target.checked ? ETH_L2 : [])
                            } />
                        Select all chains
                    </label>
                    
                    <button
                        className={`continue-btn ${l2.length === 0 ? 'hidden' : ''}`}
                        disabled={l2.length === 0}
                        onClick={() => setShowForm(true)}
                    >
                        Continue →
                    </button>
                    
                </>
            )}

            {/* --- ADDRESS FORM --- */}
            {inForm && (
                <>
                    <button
                        className="back-btn"
                        onClick={() => {
                            if (selectedChain === "ETH") {
                                setShowForm(false); 
                            } else {
                                setSelectedChain(null);
                            }
                            setAddrInput("");
                            setChecked({});
                        }}
                    >
                        ← Back
                    </button>

                    <h2 className="ad-title">
                        {selectedChain === "ETH" ? `Add address for: ${l2.join(", ")}` : `${selectedChain} address`}
                    </h2>

                    <div className="ad-form">
                        <input
                            type="text"
                            value={addrInput}
                            placeholder={`Enter ${selectedChain} address`}
                            onChange={(e) => setAddrInput(e.target.value)}
                        />

                        <div className="ad-collections">
                            <p>Choose collection(s):</p>
                            {collections.map((c) => (
                                <label key={c.id}>
                                    <input
                                        type="checkbox"
                                        checked={!!checked[c.id]}
                                        onChange={(e) =>
                                            setChecked({ ...checked, [c.id]: e.target.checked })
                                        }
                                    />
                                    {c.name}
                                </label>
                            ))}
                        </div>

                        <button className="add-btn" onClick={handleAdd}>
                            Add address (mock $20)
                        </button>
                    </div>
                </>
            )}
        </div>
    );

}