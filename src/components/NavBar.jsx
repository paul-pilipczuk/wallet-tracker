import "./NavBar.css";

export default function NavBar() {
    return (
        <header className="navbar">
            <h1 className="logo">Wallet Tracker</h1>

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