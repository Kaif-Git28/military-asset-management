import React, { useState } from 'react';
import { 
  ShieldCheckIcon, 
  TruckIcon, 
  ComputerDesktopIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

const AssetsPage = () => {
  const { user, hasPermission } = useAuth();
  const [activeFilter, setActiveFilter] = useState('all');

  // Mock asset data
  const assets = [
    {
      id: 'AST001',
      name: 'M4A1 Carbine',
      category: 'weapons',
      status: 'deployed',
      condition: 'excellent',
      location: 'Alpha Base',
      assignedTo: 'Staff Sgt. Johnson',
      lastMaintenance: '2023-12-15',
      acquisitionDate: '2022-05-10',
      value: 1200
    },
    {
      id: 'AST002',
      name: 'Humvee Tactical Vehicle',
      category: 'vehicles',
      status: 'maintenance',
      condition: 'good',
      location: 'Alpha Base',
      assignedTo: 'Transport Division',
      lastMaintenance: '2024-02-20',
      acquisitionDate: '2020-08-15',
      value: 120000
    },
    {
      id: 'AST003',
      name: 'Secure Communications Server',
      category: 'technology',
      status: 'deployed',
      condition: 'excellent',
      location: 'Bravo Base',
      assignedTo: 'Comms Division',
      lastMaintenance: '2024-01-05',
      acquisitionDate: '2023-03-22',
      value: 45000
    },
    {
      id: 'AST004',
      name: 'Falcon Drone',
      category: 'technology',
      status: 'available',
      condition: 'excellent',
      location: 'Central Inventory',
      assignedTo: null,
      lastMaintenance: '2024-03-15',
      acquisitionDate: '2023-11-30',
      value: 28000
    },
    {
      id: 'AST005',
      name: 'M1A2 Abrams Tank',
      category: 'vehicles',
      status: 'deployed',
      condition: 'good',
      location: 'Delta Base',
      assignedTo: '3rd Armored Division',
      lastMaintenance: '2023-11-10',
      acquisitionDate: '2019-06-05',
      value: 8500000
    },
    {
      id: 'AST006',
      name: 'Medical Field Kit',
      category: 'supplies',
      status: 'available',
      condition: 'good',
      location: 'Medical Storage',
      assignedTo: null,
      lastMaintenance: null,
      acquisitionDate: '2023-09-18',
      value: 3500
    }
  ];

  // Filter assets based on user permissions and selected filter
  const filteredAssets = assets.filter(asset => {
    // Base commander can only see assets in their base
    if (user.role === 'base_commander' && asset.location !== user.base) {
      return false;
    }

    // Apply category filter
    if (activeFilter !== 'all' && asset.category !== activeFilter) {
      return false;
    }

    return true;
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'vehicles':
        return <TruckIcon className="h-5 w-5" />;
      case 'weapons':
        return <ShieldCheckIcon className="h-5 w-5" />;
      case 'technology':
        return <ComputerDesktopIcon className="h-5 w-5" />;
      default:
        return <CpuChipIcon className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'deployed':
        return 'bg-blue-100 text-blue-800';
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Military Assets</h1>
        <p className="text-gray-600">View and manage all military assets {user.role === 'base_commander' ? 'at ' + user.base : ''}</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button 
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-md ${activeFilter === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          All Assets
        </button>
        <button 
          onClick={() => setActiveFilter('vehicles')}
          className={`px-4 py-2 rounded-md ${activeFilter === 'vehicles' ? 'bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          Vehicles
        </button>
        <button 
          onClick={() => setActiveFilter('weapons')}
          className={`px-4 py-2 rounded-md ${activeFilter === 'weapons' ? 'bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          Weapons
        </button>
        <button 
          onClick={() => setActiveFilter('technology')}
          className={`px-4 py-2 rounded-md ${activeFilter === 'technology' ? 'bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          Technology
        </button>
        <button 
          onClick={() => setActiveFilter('supplies')}
          className={`px-4 py-2 rounded-md ${activeFilter === 'supplies' ? 'bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          Supplies
        </button>
      </div>

      {/* Asset List */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asset
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                {hasPermission('edit_all') && (
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-primary-100 text-primary-600">
                        {getCategoryIcon(asset.category)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                        <div className="text-sm text-gray-500">{asset.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 capitalize">{asset.category}</div>
                    <div className="text-sm text-gray-500">Condition: {asset.condition}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(asset.status)}`}>
                      {asset.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {asset.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {asset.assignedTo || 'Unassigned'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${asset.value.toLocaleString()}
                  </td>
                  {hasPermission('edit_all') && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-900 mr-3">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredAssets.length === 0 && (
        <div className="text-center py-10 bg-gray-50 rounded-lg mt-4">
          <p className="text-gray-500">No assets found matching the selected criteria</p>
        </div>
      )}
    </div>
  );
};

export default AssetsPage; 