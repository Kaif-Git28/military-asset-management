import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Bars3Icon, BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';

const Header = ({ title, toggleSidebar }) => {
  const { currentUser, logout } = useAuth();
  
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500 md:hidden"
              onClick={toggleSidebar}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <h1 className="ml-2 md:ml-0 text-xl font-semibold text-primary-900">{title}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="p-1 rounded-full text-neutral-500 hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            
            {/* Profile dropdown */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center space-x-2 text-sm font-medium text-neutral-700 hover:text-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full p-1">
                <span className="sr-only">Open user menu</span>
                <UserCircleIcon className="h-8 w-8 text-neutral-400" aria-hidden="true" />
                <div className="hidden md:flex md:flex-col md:items-start">
                  <span className="text-sm font-medium">{currentUser?.name}</span>
                  <span className="text-xs text-neutral-500 capitalize">{currentUser?.role.replace('_', ' ')}</span>
                </div>
              </Menu.Button>
              
              <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#profile"
                        className={`${
                          active ? 'bg-neutral-100' : ''
                        } block px-4 py-2 text-sm text-neutral-700`}
                      >
                        Your Profile
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#settings"
                        className={`${
                          active ? 'bg-neutral-100' : ''
                        } block px-4 py-2 text-sm text-neutral-700`}
                      >
                        Settings
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={logout}
                        className={`${
                          active ? 'bg-neutral-100' : ''
                        } block w-full text-left px-4 py-2 text-sm text-neutral-700`}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;