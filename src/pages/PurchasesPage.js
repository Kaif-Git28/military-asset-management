import React, { useState, useEffect } from 'react';
import { mockDataService } from '../services/mockDataService';
import AssetTable from '../components/shared/AssetTable';
import { Dialog, Transition } from '@headlessui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';

const PurchaseSchema = Yup.object().shape({
  assetType: Yup.string().required('Asset type is required'),
  quantity: Yup.number()
    .required('Quantity is required')
    .positive('Quantity must be positive')
    .integer('Quantity must be a whole number'),
  base: Yup.string().required('Base is required')
});

const PurchasesPage = () => {
  const [purchases, setPurchases] = useState([]);
  const [bases, setBases] = useState([]);
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [purchasesData, basesData, typesData] = await Promise.all([
          mockDataService.getPurchases(),
          mockDataService.getBases(),
          mockDataService.getEquipmentTypes()
        ]);
        
        setPurchases(purchasesData);
        setBases(basesData);
        setEquipmentTypes(typesData);
      } catch (error) {
        console.error('Error loading purchases data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  const handleNewPurchase = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      const newPurchase = await mockDataService.addPurchase(values);
      setPurchases([newPurchase, ...purchases]);
      resetForm();
      closeModal();
    } catch (error) {
      console.error('Error adding purchase:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Format the purchase data for display
  const formattedPurchases = purchases.map(purchase => ({
    id: purchase.id,
    date: purchase.date,
    assetType: purchase.assetType,
    quantity: purchase.quantity,
    base: purchase.base
  }));
  
  return (
    <div className="page-transition">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-primary-900">Asset Purchases</h2>
        <button
          onClick={handleNewPurchase}
          className="btn-primary"
        >
          Add New Purchase
        </button>
      </div>
      
      {loading && purchases.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
          <AssetTable 
            data={formattedPurchases}
          />
        </div>
      )}
      
      {/* New Purchase Modal */}
      <Transition appear show={isModalOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-primary-900"
                  >
                    Add New Purchase
                  </Dialog.Title>
                  
                  <Formik
                    initialValues={{
                      assetType: '',
                      quantity: '',
                      base: ''
                    }}
                    validationSchema={PurchaseSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting, setFieldValue, values }) => (
                      <Form className="mt-4 space-y-4">
                        <div>
                          <label htmlFor="assetType" className="block text-sm font-medium text-neutral-700">
                            Asset Type
                          </label>
                          <Field
                            as="select"
                            id="assetType"
                            name="assetType"
                            className="select mt-1"
                          >
                            <option value="">Select Asset Type</option>
                            {equipmentTypes.map(type => (
                              <option key={type.id} value={type.name}>
                                {type.name}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage name="assetType" component="div" className="mt-1 text-sm text-red-600" />
                        </div>
                        
                        <div>
                          <label htmlFor="quantity" className="block text-sm font-medium text-neutral-700">
                            Quantity
                          </label>
                          <Field
                            type="number"
                            id="quantity"
                            name="quantity"
                            className="input mt-1"
                            min="1"
                          />
                          <ErrorMessage name="quantity" component="div" className="mt-1 text-sm text-red-600" />
                        </div>
                        
                        <div>
                          <label htmlFor="base" className="block text-sm font-medium text-neutral-700">
                            Base
                          </label>
                          <Field
                            as="select"
                            id="base"
                            name="base"
                            className="select mt-1"
                          >
                            <option value="">Select Base</option>
                            {bases.map(base => (
                              <option key={base.id} value={base.name}>
                                {base.name}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage name="base" component="div" className="mt-1 text-sm text-red-600" />
                        </div>
                        
                        <div className="mt-6 flex justify-end space-x-3">
                          <button
                            type="button"
                            className="btn-outline"
                            onClick={closeModal}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="btn-primary"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'Saving...' : 'Save Purchase'}
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default PurchasesPage;