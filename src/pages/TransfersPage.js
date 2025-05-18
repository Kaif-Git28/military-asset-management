import React, { useState, useEffect } from 'react';
import { mockDataService } from '../services/mockDataService';
import AssetTable from '../components/shared/AssetTable';
import { Dialog, Transition } from '@headlessui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';

const TransferSchema = Yup.object().shape({
  assetType: Yup.string().required('Asset type is required'),
  quantity: Yup.number()
    .required('Quantity is required')
    .positive('Quantity must be positive')
    .integer('Quantity must be a whole number'),
  fromBase: Yup.string().required('Source base is required'),
  toBase: Yup.string()
    .required('Destination base is required')
    .test('different-bases', 'Source and destination bases must be different', function(value) {
      return value !== this.parent.fromBase;
    })
});

const TransfersPage = () => {
  const [transfers, setTransfers] = useState([]);
  const [bases, setBases] = useState([]);
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [transfersData, basesData, typesData] = await Promise.all([
          mockDataService.getTransfers(),
          mockDataService.getBases(),
          mockDataService.getEquipmentTypes()
        ]);
        
        setTransfers(transfersData);
        setBases(basesData);
        setEquipmentTypes(typesData);
      } catch (error) {
        console.error('Error loading transfers data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  const handleNewTransfer = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      const newTransfer = await mockDataService.addTransfer(values);
      setTransfers([newTransfer, ...transfers]);
      resetForm();
      closeModal();
    } catch (error) {
      console.error('Error adding transfer:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Get status badge style
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return <span className="badge-success">Completed</span>;
      case 'In Transit':
        return <span className="badge-warning">In Transit</span>;
      case 'Pending':
        return <span className="badge-neutral">Pending</span>;
      default:
        return <span className="badge-neutral">{status}</span>;
    }
  };
  
  return (
    <div className="page-transition">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-primary-900">Asset Transfers</h2>
        <button
          onClick={handleNewTransfer}
          className="btn-primary"
        >
          Initiate Transfer
        </button>
      </div>
      
      {loading && transfers.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
          <AssetTable 
            data={transfers.map(transfer => ({
              id: transfer.id,
              date: transfer.date,
              assetType: transfer.assetType,
              quantity: transfer.quantity,
              fromBase: transfer.fromBase,
              toBase: transfer.toBase,
              status: getStatusBadge(transfer.status)
            }))}
          />
        </div>
      )}
      
      {/* New Transfer Modal */}
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
                    Initiate New Transfer
                  </Dialog.Title>
                  
                  <Formik
                    initialValues={{
                      assetType: '',
                      quantity: '',
                      fromBase: '',
                      toBase: ''
                    }}
                    validationSchema={TransferSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting, values }) => (
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
                          <label htmlFor="fromBase" className="block text-sm font-medium text-neutral-700">
                            From Base
                          </label>
                          <Field
                            as="select"
                            id="fromBase"
                            name="fromBase"
                            className="select mt-1"
                          >
                            <option value="">Select Source Base</option>
                            {bases.map(base => (
                              <option key={base.id} value={base.name}>
                                {base.name}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage name="fromBase" component="div" className="mt-1 text-sm text-red-600" />
                        </div>
                        
                        <div>
                          <label htmlFor="toBase" className="block text-sm font-medium text-neutral-700">
                            To Base
                          </label>
                          <Field
                            as="select"
                            id="toBase"
                            name="toBase"
                            className="select mt-1"
                            disabled={!values.fromBase}
                          >
                            <option value="">Select Destination Base</option>
                            {bases
                              .filter(base => base.name !== values.fromBase)
                              .map(base => (
                                <option key={base.id} value={base.name}>
                                  {base.name}
                                </option>
                              ))
                            }
                          </Field>
                          <ErrorMessage name="toBase" component="div" className="mt-1 text-sm text-red-600" />
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
                            {isSubmitting ? 'Initiating...' : 'Initiate Transfer'}
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

export default TransfersPage;