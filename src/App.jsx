import {Routes, Route} from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Portfolios from "./pages/Overview";

export default function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/portfolios" element={<Portfolios />} />
            </Routes>
        </>
    );
}