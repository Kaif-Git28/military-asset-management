import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  XMarkIcon,
  HomeIcon, 
  ShoppingCartIcon, 
  ArrowsRightLeftIcon, 
  UserGroupIcon,
  DocumentTextIcon,
  ChartBarIcon,
  UsersIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const Sidebar = ({ open, closeSidebar }) => {
  const location = useLocation();
  const { hasPermission, hasRoleLevel, hasRole, user } = useAuth();
  
  // Navigation items with required permissions
  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/dashboard', 
      icon: HomeIcon,
      access: 'all'  // All authenticated users can access dashboard
    },
    { 
      name: 'Assets', 
      href: '/assets',  
      icon: ChartBarIcon,
      access: 'view_logistics'
    },
    { 
      name: 'Purchases', 
      href: '/purchases', 
      icon: ShoppingCartIcon,
      access: 'request_purchases'
    },
    { 
      name: 'Transfers', 
      href: '/transfers', 
      icon: ArrowsRightLeftIcon,
      access: 'request_transfers'
    },
    { 
      name: 'Assignments', 
      href: '/assignments', 
      icon: UserGroupIcon,
      access: 'manage_base_assignments'
    },
    {
      name: 'Reports',
      href: '/reports',
      icon: DocumentTextIcon, 
      access: 'view_limited_reports'
    },
    // Admin-only sections
    {
      name: 'User Management',
      href: '/users',
      icon: UsersIcon,
      access: 'manage_users'
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: CogIcon,
      access: 'edit_all'
    }
  ];
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  // Check if user can see a menu item
  const canSeeMenuItem = (accessRequirement) => {
    if (accessRequirement === 'all') {
      return true;
    }
    
    return hasPermission(accessRequirement);
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
          
          {/* User info with role badge */}
          {user && (
            <div className="px-4 py-3 bg-primary-700">
              <p className="text-white text-sm font-medium truncate">{user.firstName} {user.lastName}</p>
              <div className="flex items-center mt-1">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                  user.role === 'admin' ? 'bg-red-100 text-red-800' :
                  user.role === 'base_commander' ? 'bg-blue-100 text-blue-800' :
                  user.role === 'logistics_officer' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {user.role === 'admin' ? 'Administrator' :
                   user.role === 'base_commander' ? 'Base Commander' :
                   user.role === 'logistics_officer' ? 'Logistics Officer' :
                   'Staff'}
                </span>
                {user.base && <span className="ml-2 text-xs text-primary-200">{user.base}</span>}
              </div>
            </div>
          )}
          
          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              canSeeMenuItem(item.access) && (
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