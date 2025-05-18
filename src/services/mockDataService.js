// Mock data service for development purposes
// In a real app, this would be replaced with actual API calls

// Mock bases data
const bases = [
  { id: 'base1', name: 'Alpha Base' },
  { id: 'base2', name: 'Bravo Base' },
  { id: 'base3', name: 'Charlie Base' },
  { id: 'base4', name: 'Delta Base' }
];

// Mock equipment types
const equipmentTypes = [
  { id: 'type1', name: 'Assault Rifles' },
  { id: 'type2', name: 'Pistols' },
  { id: 'type3', name: 'Armored Vehicles' },
  { id: 'type4', name: 'Communication Devices' },
  { id: 'type5', name: 'Medical Supplies' }
];

// Mock purchases data
const purchases = [
  { id: 1, date: new Date(2025, 0, 15), assetType: 'Assault Rifles', quantity: 50, base: 'Alpha Base' },
  { id: 2, date: new Date(2025, 0, 20), assetType: 'Pistols', quantity: 100, base: 'Bravo Base' },
  { id: 3, date: new Date(2025, 1, 5), assetType: 'Armored Vehicles', quantity: 10, base: 'Charlie Base' },
  { id: 4, date: new Date(2025, 1, 15), assetType: 'Communication Devices', quantity: 200, base: 'Delta Base' },
  { id: 5, date: new Date(2025, 2, 1), assetType: 'Medical Supplies', quantity: 500, base: 'Alpha Base' }
];

// Mock transfers data
const transfers = [
  { 
    id: 1, 
    date: new Date(2025, 0, 25), 
    assetType: 'Assault Rifles', 
    quantity: 20, 
    fromBase: 'Alpha Base', 
    toBase: 'Bravo Base', 
    status: 'Completed' 
  },
  { 
    id: 2, 
    date: new Date(2025, 1, 10), 
    assetType: 'Pistols', 
    quantity: 30, 
    fromBase: 'Bravo Base', 
    toBase: 'Charlie Base', 
    status: 'Completed' 
  },
  { 
    id: 3, 
    date: new Date(2025, 1, 20), 
    assetType: 'Armored Vehicles', 
    quantity: 5, 
    fromBase: 'Charlie Base', 
    toBase: 'Delta Base', 
    status: 'In Transit' 
  },
  { 
    id: 4, 
    date: new Date(2025, 2, 5), 
    assetType: 'Communication Devices', 
    quantity: 50, 
    fromBase: 'Delta Base', 
    toBase: 'Alpha Base', 
    status: 'Completed' 
  },
  { 
    id: 5, 
    date: new Date(2025, 2, 15), 
    assetType: 'Medical Supplies', 
    quantity: 100, 
    fromBase: 'Alpha Base', 
    toBase: 'Delta Base', 
    status: 'Pending' 
  }
];

// Mock assignments data
const assignments = [
  { 
    id: 1, 
    date: new Date(2025, 0, 30), 
    assetType: 'Assault Rifles', 
    quantity: 15, 
    base: 'Alpha Base', 
    assignedTo: 'Squad Alpha-1', 
    status: 'Active' 
  },
  { 
    id: 2, 
    date: new Date(2025, 1, 15), 
    assetType: 'Pistols', 
    quantity: 20, 
    base: 'Bravo Base', 
    assignedTo: 'Security Team B', 
    status: 'Active' 
  },
  { 
    id: 3, 
    date: new Date(2025, 1, 25), 
    assetType: 'Communication Devices', 
    quantity: 30, 
    base: 'Charlie Base', 
    assignedTo: 'Recon Team C', 
    status: 'Active' 
  },
  { 
    id: 4, 
    date: new Date(2025, 2, 10), 
    assetType: 'Medical Supplies', 
    quantity: 50, 
    base: 'Delta Base', 
    assignedTo: 'Medical Unit D', 
    status: 'Returned' 
  },
  { 
    id: 5, 
    date: new Date(2025, 2, 20), 
    assetType: 'Armored Vehicles', 
    quantity: 3, 
    base: 'Alpha Base', 
    assignedTo: 'Patrol Unit A-3', 
    status: 'Active' 
  }
];

// Mock expenditures data
const expenditures = [
  { 
    id: 1, 
    date: new Date(2025, 1, 5), 
    assetType: 'Assault Rifles', 
    quantity: 2, 
    base: 'Alpha Base', 
    reason: 'Combat damage', 
    authorizedBy: 'Capt. Johnson' 
  },
  { 
    id: 2, 
    date: new Date(2025, 1, 20), 
    assetType: 'Medical Supplies', 
    quantity: 100, 
    base: 'Bravo Base', 
    reason: 'Field exercise', 
    authorizedBy: 'Maj. Smith' 
  },
  { 
    id: 3, 
    date: new Date(2025, 2, 10), 
    assetType: 'Communication Devices', 
    quantity: 5, 
    base: 'Charlie Base', 
    reason: 'Technical failure', 
    authorizedBy: 'Lt. Williams' 
  },
  { 
    id: 4, 
    date: new Date(2025, 2, 25), 
    assetType: 'Pistols', 
    quantity: 3, 
    base: 'Delta Base', 
    reason: 'Training damage', 
    authorizedBy: 'Capt. Davis' 
  },
  { 
    id: 5, 
    date: new Date(2025, 3, 5), 
    assetType: 'Armored Vehicles', 
    quantity: 1, 
    base: 'Alpha Base', 
    reason: 'Mechanical failure', 
    authorizedBy: 'Col. Anderson' 
  }
];

// Mock dashboard metrics
const dashboardMetrics = {
  openingBalance: 1250,
  openingBalanceChange: 5,
  netMovement: 120,
  netMovementChange: 15,
  assignedAssets: 850,
  assignedAssetsChange: 8,
  closingBalance: 1370,
  closingBalanceChange: 10,
  // Movement breakdown
  purchases: 200,
  transferIn: 150,
  transferOut: 230
};

// Service functions
export const mockDataService = {
  // Get bases
  getBases: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...bases];
  },
  
  // Get equipment types
  getEquipmentTypes: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...equipmentTypes];
  },
  
  // Get dashboard metrics
  getDashboardMetrics: async (filters = {}) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    // Would apply filters in a real app
    return { ...dashboardMetrics };
  },
  
  // Get purchases
  getPurchases: async (filters = {}) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    // Would apply filters in a real app
    return [...purchases];
  },
  
  // Add a new purchase
  addPurchase: async (purchaseData) => {
    await new Promise(resolve => setTimeout(resolve, 700));
    const newPurchase = {
      id: purchases.length + 1,
      date: new Date(),
      ...purchaseData
    };
    purchases.push(newPurchase);
    return newPurchase;
  },
  
  // Get transfers
  getTransfers: async (filters = {}) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    // Would apply filters in a real app
    return [...transfers];
  },
  
  // Add a new transfer
  addTransfer: async (transferData) => {
    await new Promise(resolve => setTimeout(resolve, 700));
    const newTransfer = {
      id: transfers.length + 1,
      date: new Date(),
      status: 'Pending',
      ...transferData
    };
    transfers.push(newTransfer);
    return newTransfer;
  },
  
  // Get assignments
  getAssignments: async (filters = {}) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    // Would apply filters in a real app
    return [...assignments];
  },
  
  // Add a new assignment
  addAssignment: async (assignmentData) => {
    await new Promise(resolve => setTimeout(resolve, 700));
    const newAssignment = {
      id: assignments.length + 1,
      date: new Date(),
      status: 'Active',
      ...assignmentData
    };
    assignments.push(newAssignment);
    return newAssignment;
  },
  
  // Get expenditures
  getExpenditures: async (filters = {}) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    // Would apply filters in a real app
    return [...expenditures];
  },
  
  // Add a new expenditure
  addExpenditure: async (expenditureData) => {
    await new Promise(resolve => setTimeout(resolve, 700));
    const newExpenditure = {
      id: expenditures.length + 1,
      date: new Date(),
      ...expenditureData
    };
    expenditures.push(newExpenditure);
    return newExpenditure;
  },
  
  // Get movement details based on type
  getMovementDetails: async (type) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    switch (type) {
      case 'purchases':
        return purchases.map(p => ({
          id: p.id,
          date: p.date.toLocaleDateString(),
          assetType: p.assetType,
          quantity: p.quantity,
          base: p.base
        }));
      case 'transferIn':
        return transfers
          .filter(t => t.status === 'Completed')
          .map(t => ({
            id: t.id,
            date: t.date.toLocaleDateString(),
            assetType: t.assetType,
            quantity: t.quantity,
            base: t.fromBase
          }));
      case 'transferOut':
        return transfers
          .filter(t => t.status === 'Completed' || t.status === 'In Transit')
          .map(t => ({
            id: t.id,
            date: t.date.toLocaleDateString(),
            assetType: t.assetType,
            quantity: t.quantity,
            base: t.toBase
          }));
      default:
        return [];
    }
  }
};