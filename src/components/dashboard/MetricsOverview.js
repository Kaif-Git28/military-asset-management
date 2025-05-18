import React from 'react';
import MetricCard from './MetricCard';
import { 
  ScaleIcon, 
  ArrowUpIcon, 
  ArrowsRightLeftIcon, 
  UserGroupIcon 
} from '@heroicons/react/24/outline';

const MetricsOverview = ({ metrics, onMetricClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <MetricCard
        title="Opening Balance"
        value={metrics.openingBalance}
        icon={ScaleIcon}
        change={metrics.openingBalanceChange}
      />
      
      <MetricCard
        title="Net Movement"
        value={metrics.netMovement}
        icon={ArrowsRightLeftIcon}
        change={metrics.netMovementChange}
        clickable={true}
        onClick={() => onMetricClick('netMovement')}
      />
      
      <MetricCard
        title="Assigned Assets"
        value={metrics.assignedAssets}
        icon={UserGroupIcon}
        change={metrics.assignedAssetsChange}
      />
      
      <MetricCard
        title="Closing Balance"
        value={metrics.closingBalance}
        icon={ArrowUpIcon}
        change={metrics.closingBalanceChange}
      />
    </div>
  );
};

export default MetricsOverview;