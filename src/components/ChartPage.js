import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./ChartPage.css";

// Import Farcaster SDK for sharing
import { sdk } from "@farcaster/miniapp-sdk";

function ChartPage() {
  const [searchParams] = useSearchParams();
  const [tokenAddress, setTokenAddress] = useState("");

  useEffect(() => {
    const address = searchParams.get("token_address");
    setTokenAddress(address || "");
  }, [searchParams]);

  const handleShareToFarcaster = async () => {
    if (!tokenAddress) return;

    try {
      // Create the share URL for this specific token
      const shareUrl = `${window.location.origin}/chart?token_address=${tokenAddress}`;

      // Share to Farcaster using the SDK
      await sdk.actions.share({
        text: `Check out this token chart: ${tokenAddress}`,
        url: shareUrl,
      });
    } catch (error) {
      console.log("Share failed or not in Farcaster client:", error);
      // Fallback: copy to clipboard
      const shareUrl = `${window.location.origin}/chart?token_address=${tokenAddress}`;
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="chart-page">
      <div className="chart-container">
        {tokenAddress ? (
          <div className="chart-content">
            <h2 className="chart-title">Chart for Token: {tokenAddress}</h2>
            <button onClick={handleShareToFarcaster} className="share-button">
              📤 Share to Farcaster
            </button>
            <div className="iframe-wrapper">
              <div
                style={{ position: "relative", width: "100%", height: "100%" }}
              >
                <iframe
                  id="geckoterminal-embed"
                  title="GeckoTerminal Embed"
                  src={`https://www.geckoterminal.com/base/pools/${tokenAddress}?embed=1&info=0&swaps=0&light_chart=0&chart_type=market_cap&resolution=1h&bg_color=111827`}
                  frameBorder="0"
                  allow="clipboard-write"
                  allowFullScreen
                  style={{ width: "100%", height: "100%" }}
                ></iframe>
              </div>
            </div>
          </div>
        ) : (
          <div className="no-token">
            <h2 className="chart-title">Chart Page</h2>
            <p>
              No token address provided. Please add ?token_address=xyz123 to the
              URL.
            </p>
            <p>
              Click this link as example:{" "}
              <code
                onClick={() =>
                  (window.location.href = `${window.location.origin}/chart?token_address=0xed6e000def95780fb89734c07ee2ce9f6dcaf110`)
                }
                style={{ cursor: "pointer" }}
              >
                {window.location.origin}
                /chart?token_address=0xed6e000def95780fb89734c07ee2ce9f6dcaf110
              </code>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChartPage;
