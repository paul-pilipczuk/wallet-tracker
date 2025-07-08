import {useState} from 'react';
import { mockCollections as initialCollections} from '../data/mockCollections';
import './Addresses.css';

const CHAIN_ICONS = {
    BTC: "₿",
    ETH: "Ξ",
    SOL: "◎",
  };

export default function Addresses() {
    const [collections, setCollections] = useState(initialCollections);
    const [selectedChain, setSelectedChain] = useState(null);
    const [addrInput, setAddrInput] = useState("");
    const [checked, setChecked] = useState(false);

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
    return (
        <div className="ad-wrapper">
      {/* ---------------- CHAIN PICKER ---------------- */}
      {!selectedChain && (
        <>
          <h2 className="ad-title">Select a chain:</h2>
          <div className="ad-chain-row">
            {["BTC", "ETH", "SOL"].map((chain) => (
              <button
                key={chain}
                className="chain-box"
                onClick={() => setSelectedChain(chain)}
              >
                <span className="icon">{CHAIN_ICONS[chain]}</span>
                <span className="label">{chain}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {/* ---------------- ADDRESS FORM ---------------- */}
      {selectedChain && (
        <>
          <button
            className="back-btn"
            onClick={() => {
              setSelectedChain(null);
              setAddrInput("");
              setChecked({});
            }}
          >
            ← Back to chains
          </button>

          <h2 className="ad-title">{selectedChain} address</h2>

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