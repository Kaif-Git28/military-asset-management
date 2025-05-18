import React, { useState, useEffect } from 'react';
import { mockDataService } from '../services/mockDataService';
import { ArrowsRightLeftIcon, CalendarIcon } from '@heroicons/react/24/outline';

// Components
import DashboardFilters from '../components/dashboard/DashboardFilters';
import MetricsOverview from '../components/dashboard/MetricsOverview';
import MovementDetailModal from '../components/dashboard/MovementDetailModal';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({});
  const [bases, setBases] = useState([]);
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalData, setModalData] = useState([]);
  
  // Latest activity
  const [recentActivity, setRecentActivity] = useState([]);
  
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        
        // Load data in parallel
        const [metricsData, basesData, typesData, purchases, transfers] = await Promise.all([
          mockDataService.getDashboardMetrics(),
          mockDataService.getBases(),
          mockDataService.getEquipmentTypes(),
          mockDataService.getPurchases(),
          mockDataService.getTransfers()
        ]);
        
        setMetrics(metricsData);
        setBases(basesData);
        setEquipmentTypes(typesData);
        
        // Combine and sort recent activity
        const combined = [
          ...purchases.slice(0, 3).map(p => ({
            id: `purchase-${p.id}`,
            date: p.date,
            type: 'Purchase',
            description: `${p.quantity} ${p.assetType} at ${p.base}`,
            icon: <CalendarIcon className="h-5 w-5 text-accent-500" />
          })),
          ...transfers.slice(0, 3).map(t => ({
            id: `transfer-${t.id}`,
            date: t.date,
            type: 'Transfer',
            description: `${t.quantity} ${t.assetType} from ${t.fromBase} to ${t.toBase}`,
            icon: <ArrowsRightLeftIcon className="h-5 w-5 text-primary-500" />
          }))
        ];
        
        // Sort by date, most recent first
        combined.sort((a, b) => b.date - a.date);
        setRecentActivity(combined.slice(0, 5));
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadDashboardData();
  }, []);
  
  const handleFilterChange = async (filters) => {
    try {
      setLoading(true);
      const metricsData = await mockDataService.getDashboardMetrics(filters);
      setMetrics(metricsData);
    } catch (error) {
      console.error('Error applying filters:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleMetricClick = async (metricType) => {
    if (metricType === 'netMovement') {
      try {
        setLoading(true);
        const purchasesData = await mockDataService.getMovementDetails('purchases');
        setModalType('purchases');
        setModalData(purchasesData);
        setIsModalOpen(true);
      } catch (error) {
        console.error('Error loading movement details:', error);
      } finally {
        setLoading(false);
      }
    }
  };
  
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  
  return (
    <div className="page-transition">
      {/* Filters */}
      <DashboardFilters 
        onFilterChange={handleFilterChange} 
        bases={bases} 
        equipmentTypes={equipmentTypes} 
      />
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700"></div>
        </div>
      ) : (
        <>
          {/* Metrics Overview */}
          <MetricsOverview metrics={metrics} onMetricClick={handleMetricClick} />
          
          {/* Movement Detail Modal */}
          {isModalOpen && (
            <MovementDetailModal 
              isOpen={isModalOpen} 
              closeModal={handleModalClose} 
              data={modalData} 
              type={modalType} 
            />
          )}
          
          {/* Two column layout for desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Asset Status by Type */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 h-full">
                <h2 className="text-lg font-medium text-primary-900 mb-4">Asset Status Overview</h2>
                <div className="h-64 flex items-center justify-center bg-neutral-50 rounded-lg border border-neutral-200">
                  <p className="text-neutral-500">Chart visualization will be shown here</p>
                </div>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 h-full">
                <h2 className="text-lg font-medium text-primary-900 mb-4">Recent Activity</h2>
                
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-neutral-50 shadow-sm">
                      <div className="flex-shrink-0 mt-1">
                        {activity.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-primary-900">{activity.type}</p>
                        <p className="text-xs text-neutral-500">{activity.date.toLocaleDateString()}</p>
                        <p className="text-sm text-neutral-700 mt-1">{activity.description}</p>
                      </div>
                    </div>
                  ))}
                  
                  {recentActivity.length === 0 && (
                    <p className="text-neutral-500 text-center py-6">No recent activity</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;