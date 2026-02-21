import React, { useEffect, useState } from 'react';

function App() {
  const [machines, setMachines] = useState([]);
  const [error, setError] = useState('');

  const fetchMachines = async () => {
    try {
      const res = await fetch('http://192.168.0.155:5002/api/dashboard/machines');

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        setMachines(data);
        setError('');
      } else {
        setMachines([]);
        setError('Invalid API response');
      }
    } catch (err) {
      console.error('Fetch failed:', err);
      setError('Backend not reachable');
      setMachines([]);
    }
  };

  useEffect(() => {
    fetchMachines();
    const timer = setInterval(fetchMachines, 5000); // refresh every 5 sec
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h2>🖥 EmpMonitor Live Dashboard</h2>

      {error && (
        <p style={{ color: 'red', marginBottom: 10 }}>
          ⚠ {error}
        </p>
      )}

      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Hostname</th>
            <th>User</th>
            <th>Platform</th>
            <th>Status</th>
            <th>Last Seen</th>
          </tr>
        </thead>

        <tbody>
          {machines.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                No machines found
              </td>
            </tr>
          ) : (
            machines.map((m) => (
              <tr key={m._id}>
                <td>{m.hostname}</td>
                <td>{m.username}</td>
                <td>{m.platform}</td>
                <td>
                  {m.status === 'Online' ? '🟢 Online' : '🔴 Offline'}
                </td>
                <td>
                  {m.lastSeen
                    ? new Date(m.lastSeen).toLocaleString()
                    : '—'}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
