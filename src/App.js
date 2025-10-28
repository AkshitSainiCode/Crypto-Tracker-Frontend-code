import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Stats from './components/Stats';
import CoinTable from './components/CoinTable';
import Loading from './components/Loading';
import { fetchCoins } from './services/api';
import { formatDateTime } from './utils/helpers';
import './App.css';

function App() {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Fetch cryptocurrency data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchCoins();
      
      if (response.success && response.data) {
        setCoins(response.data);
        setFilteredCoins(response.data);
        setLastUpdated(formatDateTime(new Date()));
      }
    } catch (err) {
      setError('Failed to fetch cryptocurrency data. Please try again later.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch on component mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh every 30 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 30 * 60 * 1000); // 30 minutes

    return () => clearInterval(interval);
  }, [fetchData]);

  // Search filter
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredCoins(coins);
    } else {
      const filtered = coins.filter(coin =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCoins(filtered);
    }
  }, [searchTerm, coins]);

  // Sort function
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sorted = [...filteredCoins].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredCoins(sorted);
  };

  // Manual refresh handler
  const handleRefresh = () => {
    fetchData();
  };

  return (
    <div className="App">
      <Header lastUpdated={lastUpdated} />
      
      <div className="container">
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={handleRefresh} className="retry-button">
              Retry
            </button>
          </div>
        )}

        {loading && coins.length === 0 ? (
          <Loading />
        ) : (
          <>
            <div className="controls">
              <SearchBar 
                searchTerm={searchTerm} 
                onSearchChange={setSearchTerm} 
              />
              <button onClick={handleRefresh} className="refresh-button">
                🔄 Refresh Data
              </button>
            </div>

            {filteredCoins.length > 0 && (
              <>
                <Stats coins={filteredCoins} />
                <CoinTable 
                  coins={filteredCoins} 
                  onSort={handleSort}
                  sortConfig={sortConfig}
                />
              </>
            )}

            {filteredCoins.length === 0 && !loading && (
              <div className="no-results">
                <p>No cryptocurrencies found matching "{searchTerm}"</p>
              </div>
            )}
          </>
        )}
      </div>

      <footer className="footer">
        <p>Built with ❤️ for Crypto Tracker | Data provided by CoinGecko</p>
      </footer>
    </div>
  );
}

export default App;