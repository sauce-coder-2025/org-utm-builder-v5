// src/components/UTM/UtmLog.jsx
import React, { useState } from 'react';
import { useUtmGenerator } from '../../hooks/useUtmGenerator';

const UtmLog = () => {
  const { utmHistory, copyToClipboard, removeFromHistory } = useUtmGenerator();
  const [selectedEntries, setSelectedEntries] = useState(new Set());
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });

  // Handle sort functionality
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Sort the UTM history
  const sortedHistory = [...utmHistory].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (sortConfig.direction === 'asc') {
      return aValue < bValue ? -1 : 1;
    }
    return aValue > bValue ? -1 : 1;
  });

  // Handle bulk selection
  const handleSelectAll = () => {
    if (selectedEntries.size === utmHistory.length) {
      setSelectedEntries(new Set());
    } else {
      setSelectedEntries(new Set(utmHistory.map(entry => entry.id)));
    }
  };

  // Handle row selection
  const toggleRowSelection = (id) => {
    const newSelected = new Set(selectedEntries);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedEntries(newSelected);
  };

  // Format timestamp for display
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="form-section">
      <div className="flex justify-between items-center mb-4">
        <h3>UTM Log</h3>
        {utmHistory.length > 0 && (
          <div className="flex space-x-2">
            <button
              onClick={handleSelectAll}
              className="btn-secondary text-sm px-3 py-1"
            >
              {selectedEntries.size === utmHistory.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="utm-log-table">
          <thead>
            <tr>
              <th className="w-8">
                <input
                  type="checkbox"
                  checked={selectedEntries.size === utmHistory.length && utmHistory.length > 0}
                  onChange={handleSelectAll}
                  className="form-checkbox h-4 w-4 text-fp-blue"
                />
              </th>
              <th onClick={() => handleSort('timestamp')} className="cursor-pointer">
                Timestamp {sortConfig.key === 'timestamp' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('campaign')} className="cursor-pointer">
                Campaign {sortConfig.key === 'campaign' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th>UTM Source</th>
              <th>UTM Medium</th>
              <th>UTM Content</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedHistory.map((entry) => (
              <tr 
                key={entry.id}
                className={selectedEntries.has(entry.id) ? 'bg-fp-light-blue' : ''}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedEntries.has(entry.id)}
                    onChange={() => toggleRowSelection(entry.id)}
                    className="form-checkbox h-4 w-4 text-fp-blue"
                  />
                </td>
                <td>{formatDate(entry.timestamp)}</td>
                <td>{entry.campaign}</td>
                <td>{entry.utmSource}</td>
                <td>{entry.utmMedium}</td>
                <td>{entry.utmContent}</td>
                <td className="text-right">
                  <button
                    onClick={() => copyToClipboard(entry.fullUrl)}
                    className="text-fp-blue hover:text-fp-dark mr-2"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => removeFromHistory(entry.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {utmHistory.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-8 text-gray-500">
                  No UTMs generated yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UtmLog;
