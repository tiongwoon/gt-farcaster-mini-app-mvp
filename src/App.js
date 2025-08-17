import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ChartPage from "./components/ChartPage";
import "./App.css";

// Import Farcaster SDK
import { sdk } from "@farcaster/miniapp-sdk";

function App() {
  useEffect(() => {
    // Tell Farcaster the app is ready to display
    const initApp = async () => {
      try {
        await sdk.actions.ready();
      } catch (error) {
        console.log("Not running in Farcaster client, continuing normally");
      }
    };

    initApp();
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="header">
          <nav className="nav">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/chart" className="nav-link">
              Chart
            </Link>
          </nav>
        </header>

        <main className="main">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/chart" element={<ChartPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
