import React from "react";
import "./LandingPage.css";

function LandingPage() {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert(
      "Copied to clipboard! Please replace the token address with your own."
    );
  };

  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1 className="landing-heading">
          Live crypto charts on Farcaster (beta)
        </h1>
        <p className="landing-description">
          Shareable embed to charts so you can check out live charts without
          leaving the app, powered by Geckoterminal
        </p>

        <div className="lorem-text">
          <p>
            How it works:
            <ol>
              <li>Have a token address you want to share its chart</li>
              <li>
                Use the following format and replace your token address into the
                token_address parameter:<br></br>
                <code
                  onClick={() =>
                    handleCopy(
                      "https://farcaster.xyz/miniapps/zEZIP8Mp70cB/gt---token-charts/chart?token_address=0x123..."
                    )
                  }
                  style={{ cursor: "pointer" }}
                >
                  https://farcaster.xyz/miniapps/zEZIP8Mp70cB/gt---token-charts/chart?token_address=0x123...
                </code>
              </li>
              <li>Paste the URL into your Farcaster post</li>
            </ol>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
