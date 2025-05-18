import React from 'react';

const MetricCard = ({ title, value, icon: Icon, change, onClick, clickable = false }) => {
  const formattedValue = typeof value === 'number' ? value.toLocaleString() : value;
  
  const cardClasses = clickable
    ? 'metric-card cursor-pointer hover:ring-2 hover:ring-primary-200'
    : 'metric-card';
    
  return (
    <div 
      className={cardClasses}
      onClick={clickable ? onClick : undefined}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="metric-label">{title}</h3>
          <p className="metric-value">{formattedValue}</p>
        </div>
        {Icon && (
          <div className="p-2 bg-primary-100 rounded-lg">
            <Icon className="h-6 w-6 text-primary-600" />
          </div>
        )}
      </div>
      
      {change !== undefined && (
        <div className="mt-1">
          <span className={`inline-flex items-center text-xs font-medium ${
            change >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {change >= 0 ? '+' : ''}{change}%
          </span>
          <span className="ml-1 text-xs text-neutral-500">from last period</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;