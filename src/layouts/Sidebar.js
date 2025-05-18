import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  XMarkIcon, 
  HomeIcon, 
  ShoppingCartIcon, 
  ArrowsRightLeftIcon, 
  UserGroupIcon 
} from '@heroicons/react/24/outline';

const Sidebar = ({ open, closeSidebar }) => {
  const location = useLocation();
  const { hasPermission } = useAuth();
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, requiredRole: 'logistics_officer' },
    { name: 'Purchases', href: '/purchases', icon: ShoppingCartIcon, requiredRole: 'logistics_officer' },
    { name: 'Transfers', href: '/transfers', icon: ArrowsRightLeftIcon, requiredRole: 'logistics_officer' },
    { name: 'Assignments', href: '/assignments', icon: UserGroupIcon, requiredRole: 'base_commander' }
  ];
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <>
      {/* Mobile sidebar backdrop */}
      {open && (
        <div 
          className="fixed inset-0 z-40 bg-neutral-600 bg-opacity-75 md:hidden" 
          onClick={closeSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary-800 transition-transform duration-300 ease-in-out transform ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:z-0`}>
        <div className="h-full flex flex-col">
          {/* Sidebar header */}
          <div className="h-16 flex items-center justify-between px-4 bg-primary-900">
            <div className="flex items-center">
              <img
                className="h-8 w-auto"
                src="https://cdn-icons-png.flaticon.com/128/6941/6941697.png"
                alt="Military Asset Management"
              />
              <span className="ml-2 text-white font-bold text-lg">MilAssets</span>
            </div>
            <button
              type="button"
              className="md:hidden text-white hover:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-white"
              onClick={closeSidebar}
            >
              <span className="sr-only">Close sidebar</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              hasPermission(item.requiredRole) && (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150
                    ${
                      isActive(item.href)
                        ? 'bg-primary-900 text-white'
                        : 'text-primary-100 hover:bg-primary-700 hover:text-white'
                    }
                  `}
                  onClick={closeSidebar}
                >
                  <item.icon
                    className={`
                      mr-3 h-5 w-5 transition-colors duration-150
                      ${
                        isActive(item.href)
                          ? 'text-white'
                          : 'text-primary-300 group-hover:text-primary-100'
                      }
                    `}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              )
            ))}
          </nav>
          
          {/* Footer */}
          <div className="px-4 py-3 bg-primary-900 text-primary-200 text-xs">
            <p>Military Asset Management v1.0</p>
            <p>Secure Access Only</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;