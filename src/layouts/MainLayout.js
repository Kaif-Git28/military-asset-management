import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  
  // Get page title based on route
  const getPageTitle = () => {
    const path = location.pathname;
    
    switch (path) {
      case '/dashboard':
        return 'Dashboard';
      case '/purchases':
        return 'Asset Purchases';
      case '/transfers':
        return 'Asset Transfers';
      case '/assignments':
        return 'Assignments & Expenditures';
      default:
        return 'Military Asset Management';
    }
  };
  
  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar open={sidebarOpen} closeSidebar={closeSidebar} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title={getPageTitle()} toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;