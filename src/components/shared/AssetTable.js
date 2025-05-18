import React from 'react';
import { format } from 'date-fns';

const AssetTable = ({ data, onRowClick, actionColumn }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 bg-white rounded-lg border border-neutral-200">
        <p className="text-neutral-500">No data available</p>
      </div>
    );
  }
  
  // Get column headers dynamically from the first data item
  const columns = Object.keys(data[0]).filter(key => key !== 'id' && key !== '_row');
  
  return (
    <div className="table-container">
      <table className="table">
        <thead className="table-header">
          <tr>
            {columns.map((column) => (
              <th key={column} className="table-header-cell">
                {column
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, (str) => str.toUpperCase())
                  .trim()}
              </th>
            ))}
            {actionColumn && <th className="table-header-cell">Actions</th>}
          </tr>
        </thead>
        <tbody className="table-body">
          {data.map((row) => (
            <tr 
              key={row.id} 
              className={`table-row ${onRowClick ? 'cursor-pointer hover:bg-primary-50' : ''}`}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            >
              {columns.map((column) => (
                <td key={`${row.id}-${column}`} className="table-cell">
                  {column.toLowerCase().includes('date') && row[column] instanceof Date
                    ? format(row[column], 'MMM dd, yyyy')
                    : row[column]}
                </td>
              ))}
              {actionColumn && (
                <td className="table-cell">
                  {actionColumn(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetTable;