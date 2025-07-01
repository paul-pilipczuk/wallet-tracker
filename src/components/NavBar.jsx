import "./NavBar.css";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
    const navigate = useNavigate();
    return (
        <header className="navbar">
            <h1 className="logo" onClick={()=> navigate("/")}>Wallet Tracker</h1>

            <nav>
                <ul className="nav-list">
                    <li>Nav&nbsp;1</li>
                    <li>Nav&nbsp;2</li>
                    <li>FAQ</li>
                </ul>
            </nav>
        </header>
    );
}