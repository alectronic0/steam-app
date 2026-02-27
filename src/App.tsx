import React, { useState } from 'react';
import './App.css';
import { API_ENDPOINTS } from './api';

interface UserInfo {
  steamId: string;
  personaName: string;
  profileUrl: string;
}

interface SharedGame {
  appId: number;
  name: string;
  playtime: number;
  tags: string[];
  isCoOp: boolean;
  isMultiplayer: boolean;
}

export default function App() {
  const [userId1, setUserId1] = useState('');
  const [userId2, setUserId2] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [sharedGames, setSharedGames] = useState<SharedGame[]>([]);
  const [filterCoOp, setFilterCoOp] = useState(false);

  const handleCompare = async () => {
    if (!userId1 || !userId2) {
      setError('Please enter both Steam IDs');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const apiUrl = API_ENDPOINTS.compare(userId1, userId2);
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setUsers([data.user1, data.user2]);
      setSharedGames(data.shared_games || []);
    } catch (err) {
      console.error('Comparison error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to compare libraries. Check the console for details.'
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredGames = filterCoOp
    ? sharedGames.filter(g => g.isCoOp || g.isMultiplayer)
    : sharedGames;

  return (
    <div className="container">
      <header>
        <h1>🎮 Steam Games Comparison</h1>
        <p>Find games you can play together!</p>
      </header>

      <div className="input-section">
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter Steam ID 1"
            value={userId1}
            onChange={(e) => setUserId1(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCompare()}
          />
          <input
            type="text"
            placeholder="Enter Steam ID 2"
            value={userId2}
            onChange={(e) => setUserId2(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCompare()}
          />
        </div>
        <button onClick={handleCompare} disabled={loading}>
          {loading ? 'Comparing...' : 'Compare Libraries'}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {users.length > 0 && (
        <>
          <div className="users-section">
            {users.map((user) => (
              <div key={user.steamId} className="user-card">
                <h3>{user.personaName || 'Unknown User'}</h3>
                <p className="steam-id">{user.steamId}</p>
              </div>
            ))}
          </div>

          <div className="filters">
            <label>
              <input
                type="checkbox"
                checked={filterCoOp}
                onChange={(e) => setFilterCoOp(e.target.checked)}
              />
              Show Co-op & Multiplayer Only
            </label>
          </div>

          <div className="games-section">
            <h2>Shared Games ({filteredGames.length})</h2>
            {filteredGames.length === 0 ? (
              <p>No shared games found{filterCoOp ? ' with co-op/multiplayer' : ''}.</p>
            ) : (
              <div className="games-grid">
                {filteredGames.map((game) => (
                  <div key={game.appId} className="game-card">
                    <h4>{game.name}</h4>
                    <p>Playtime: {game.playtime} hours</p>
                    {game.isCoOp && <span className="tag coop">Co-op</span>}
                    {game.isMultiplayer && <span className="tag multiplayer">Multiplayer</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
