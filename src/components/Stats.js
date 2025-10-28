import React from 'react';
import { FaChartLine, FaCoins, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { formatLargeNumber } from '../utils/helpers';
import './Stats.css';

const Stats = ({ coins }) => {
  const totalMarketCap = coins.reduce((sum, coin) => sum + coin.marketCap, 0);
  const gainers = coins.filter(coin => coin.priceChange24h > 0).length;
  const losers = coins.filter(coin => coin.priceChange24h < 0).length;
  const topGainer = coins.reduce((max, coin) => 
    coin.priceChange24h > max.priceChange24h ? coin : max, coins[0]);

  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="stat-icon" style={{ background: '#667eea' }}>
          <FaChartLine />
        </div>
        <div className="stat-content">
          <p className="stat-label">Total Market Cap</p>
          <p className="stat-value">{formatLargeNumber(totalMarketCap)}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon" style={{ background: '#10b981' }}>
          <FaArrowUp />
        </div>
        <div className="stat-content">
          <p className="stat-label">Gainers (24h)</p>
          <p className="stat-value">{gainers} coins</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon" style={{ background: '#ef4444' }}>
          <FaArrowDown />
        </div>
        <div className="stat-content">
          <p className="stat-label">Losers (24h)</p>
          <p className="stat-value">{losers} coins</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon" style={{ background: '#f59e0b' }}>
          <FaCoins />
        </div>
        <div className="stat-content">
          <p className="stat-label">Top Gainer</p>
          <p className="stat-value">{topGainer?.symbol} +{topGainer?.priceChange24h.toFixed(2)}%</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;