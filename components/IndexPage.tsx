// IndexPage.tsx
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface CryptoData {
  BTC: number;
  ETH: number;
  EOS: number;
  DOGE: number;
}

const CryptoCard: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/crypto');
      setCryptoData(response.data);
    };

    fetchData();
  }, []);

  return (
    <div className="crypto-card">
      <h2>Crypto Balances</h2>
      {cryptoData ? (
        <ul>
          {Object.entries(cryptoData).map(([currency, amount]) => (
            <li key={currency}>
              {currency}: {amount.toFixed(8)}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading crypto data...</p>
      )}
    </div>
  );
};

const IndexPage: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>BorosDAO</h1>
        <h2>Infinite Liquidity Solutions</h2>
      </header>
      
      <section className="App-intro">
        <p>
          BorosDAO aims to revolutionize the world of decentralized finance by providing secure, accessible, and efficient liquidity solutions through a community-driven approach. Our innovative staking and liquidity pool protocols empower users to maximize returns while minimizing risks, ensuring sustainable growth for all stakeholders.
        </p>
      </section>

      <div className="App-content">
        <section className="App-features">
          <h3>Key Features:</h3>
          <ul>
            <li>User-friendly Interface</li>
            <li>Security and Transparency</li>
            <li>Flexible Staking Options</li>
            <li>Community Governance</li>
            <li>Competitive Returns</li>
          </ul>
        </section>
        <CryptoCard />
      </div>
    </div>
  );
};

export default IndexPage;