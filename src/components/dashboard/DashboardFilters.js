import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DashboardFilters = ({ onFilterChange, bases, equipmentTypes }) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [selectedBase, setSelectedBase] = useState('all');
  const [selectedEquipmentType, setSelectedEquipmentType] = useState('all');
  
  const handleBaseChange = (e) => {
    const base = e.target.value;
    setSelectedBase(base);
    onFilterChange({
      dateRange,
      base,
      equipmentType: selectedEquipmentType
    });
  };
  
  const handleEquipmentTypeChange = (e) => {
    const equipmentType = e.target.value;
    setSelectedEquipmentType(equipmentType);
    onFilterChange({
      dateRange,
      base: selectedBase,
      equipmentType
    });
  };
  
  const handleDateChange = (update) => {
    setDateRange(update);
    onFilterChange({
      dateRange: update,
      base: selectedBase,
      equipmentType: selectedEquipmentType
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
      <h2 className="text-lg font-medium text-primary-900 mb-4">Filters</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="date-filter" className="block text-sm font-medium text-neutral-700 mb-1">
            Date Range
          </label>
          <DatePicker
            id="date-filter"
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={handleDateChange}
            className="input"
            placeholderText="Select date range"
            dateFormat="MM/dd/yyyy"
          />
        </div>
        
        <div>
          <label htmlFor="base-filter" className="block text-sm font-medium text-neutral-700 mb-1">
            Base
          </label>
          <select
            id="base-filter"
            value={selectedBase}
            onChange={handleBaseChange}
            className="select"
          >
            <option value="all">All Bases</option>
            {bases.map((base) => (
              <option key={base.id} value={base.id}>
                {base.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="equipment-filter" className="block text-sm font-medium text-neutral-700 mb-1">
            Equipment Type
          </label>
          <select
            id="equipment-filter"
            value={selectedEquipmentType}
            onChange={handleEquipmentTypeChange}
            className="select"
          >
            <option value="all">All Equipment Types</option>
            {equipmentTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default DashboardFilters;