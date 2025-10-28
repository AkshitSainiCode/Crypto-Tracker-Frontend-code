import React from 'react';
import { FaBitcoin } from 'react-icons/fa';
import './Header.css';

const Header = ({ lastUpdated }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <FaBitcoin className="header-icon" />
          <div>
            <h1 className="header-title">Crypto Tracker</h1>
            <p className="header-subtitle">Real-time cryptocurrency prices</p>
          </div>
        </div>
        {lastUpdated && (
          <div className="last-updated">
            <span className="update-label">Last Updated:</span>
            <span className="update-time">{lastUpdated}</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;