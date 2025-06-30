import "./Home.css";
import { useNavigate } from "react-router-dom";


export default function Home() {
    const navigate = useNavigate();
    return (
        <main className="home">
            <section className="card">
                <h2 className="card-title">Welcome to Wallet Tracker</h2>
                <button className="explore-btn" onClick={() => navigate("/portfolios")}>
                    Explore
                </button>
            </section>
        </main>
    );
}