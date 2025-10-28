import React from 'react';
import { 
  formatCurrency, 
  formatLargeNumber, 
  formatPercentage, 
  getPriceChangeColor 
} from '../utils/helpers';
import './CoinTable.css';

const CoinTable = ({ coins, onSort, sortConfig }) => {
  const handleSort = (key) => {
    onSort(key);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '↕️';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="table-container">
      <table className="coin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Coin</th>
            <th onClick={() => handleSort('price')} className="sortable">
              Price {getSortIcon('price')}
            </th>
            <th onClick={() => handleSort('priceChange24h')} className="sortable">
              24h Change {getSortIcon('priceChange24h')}
            </th>
            <th onClick={() => handleSort('marketCap')} className="sortable">
              Market Cap {getSortIcon('marketCap')}
            </th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin, index) => (
            <tr key={coin.coinId}>
              <td className="rank">{index + 1}</td>
              <td className="coin-info">
                <img src={coin.image} alt={coin.name} className="coin-image" />
                <div className="coin-details">
                  <span className="coin-name">{coin.name}</span>
                  <span className="coin-symbol">{coin.symbol}</span>
                </div>
              </td>
              <td className="price">{formatCurrency(coin.price)}</td>
              <td 
                className="price-change"
                style={{ color: getPriceChangeColor(coin.priceChange24h) }}
              >
                {formatPercentage(coin.priceChange24h)}
              </td>
              <td className="market-cap">{formatLargeNumber(coin.marketCap)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinTable;