import React, { useState, useEffect } from 'react';
import { mockDataService } from '../services/mockDataService';
import { Dialog, Transition } from '@headlessui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AssetTable from '../components/shared/AssetTable';
import { Tab } from '@headlessui/react';

const AssignmentSchema = Yup.object().shape({
  assetType: Yup.string().required('Asset type is required'),
  quantity: Yup.number()
    .required('Quantity is required')
    .positive('Quantity must be positive')
    .integer('Quantity must be a whole number'),
  base: Yup.string().required('Base is required'),
  assignedTo: Yup.string().required('Assignment recipient is required')
});

const ExpenditureSchema = Yup.object().shape({
  assetType: Yup.string().required('Asset type is required'),
  quantity: Yup.number()
    .required('Quantity is required')
    .positive('Quantity must be positive')
    .integer('Quantity must be a whole number'),
  base: Yup.string().required('Base is required'),
  reason: Yup.string().required('Reason is required'),
  authorizedBy: Yup.string().required('Authorization is required')
});

const AssignmentsPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [expenditures, setExpenditures] = useState([]);
  const [bases, setBases] = useState([]);
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('assignment');
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [assignmentsData, expendituresData, basesData, typesData] = await Promise.all([
          mockDataService.getAssignments(),
          mockDataService.getExpenditures(),
          mockDataService.getBases(),
          mockDataService.getEquipmentTypes()
        ]);
        
        setAssignments(assignmentsData);
        setExpenditures(expendituresData);
        setBases(basesData);
        setEquipmentTypes(typesData);
      } catch (error) {
        console.error('Error loading assignments data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  const handleNewAssignment = () => {
    setModalType('assignment');
    setIsModalOpen(true);
  };
  
  const handleNewExpenditure = () => {
    setModalType('expenditure');
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const handleSubmitAssignment = async (values, { resetForm }) => {
    try {
      setLoading(true);
      const newAssignment = await mockDataService.addAssignment(values);
      setAssignments([newAssignment, ...assignments]);
      resetForm();
      closeModal();
    } catch (error) {
      console.error('Error adding assignment:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmitExpenditure = async (values, { resetForm }) => {
    try {
      setLoading(true);
      const newExpenditure = await mockDataService.addExpenditure(values);
      setExpenditures([newExpenditure, ...expenditures]);
      resetForm();
      closeModal();
    } catch (error) {
      console.error('Error adding expenditure:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Get status badge style for assignments
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <span className="badge-success">Active</span>;
      case 'Returned':
        return <span className="badge-neutral">Returned</span>;
      default:
        return <span className="badge-neutral">{status}</span>;
    }
  };
  
  return (
    <div className="page-transition">
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <h2 className="text-xl font-semibold text-primary-900">Assignments & Expenditures</h2>
        <div className="flex space-x-3">
          <button
            onClick={handleNewAssignment}
            className="btn-primary"
          >
            New Assignment
          </button>
          <button
            onClick={handleNewExpenditure}
            className="btn-outline"
          >
            Record Expenditure
          </button>
        </div>
      </div>
      
      {loading && assignments.length === 0 && expenditures.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-lg bg-neutral-100 p-1 mb-4">
              <Tab 
                className={({ selected }) =>
                  `w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-white ring-opacity-60 focus:outline-none focus:ring-2 ${
                    selected
                      ? 'bg-white shadow text-primary-700'
                      : 'text-neutral-700 hover:bg-white/[0.12] hover:text-primary-600'
                  }`
                }
              >
                Assignments
              </Tab>
              <Tab 
                className={({ selected }) =>
                  `w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-white ring-opacity-60 focus:outline-none focus:ring-2 ${
                    selected
                      ? 'bg-white shadow text-primary-700'
                      : 'text-neutral-700 hover:bg-white/[0.12] hover:text-primary-600'
                  }`
                }
              >
                Expenditures
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <AssetTable
                  data={assignments.map(assignment => ({
                    id: assignment.id,
                    date: assignment.date,
                    assetType: assignment.assetType,
                    quantity: assignment.quantity,
                    base: assignment.base,
                    assignedTo: assignment.assignedTo,
                    status: getStatusBadge(assignment.status)
                  }))}
                />
              </Tab.Panel>
              <Tab.Panel>
                <AssetTable
                  data={expenditures.map(expenditure => ({
                    id: expenditure.id,
                    date: expenditure.date,
                    assetType: expenditure.assetType,
                    quantity: expenditure.quantity,
                    base: expenditure.base,
                    reason: expenditure.reason,
                    authorizedBy: expenditure.authorizedBy
                  }))}
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      )}
      
      {/* Modal for new assignment/expenditure */}
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
                    {modalType === 'assignment' ? 'New Assignment' : 'Record Expenditure'}
                  </Dialog.Title>
                  
                  {modalType === 'assignment' ? (
                    <Formik
                      initialValues={{
                        assetType: '',
                        quantity: '',
                        base: '',
                        assignedTo: ''
                      }}
                      validationSchema={AssignmentSchema}
                      onSubmit={handleSubmitAssignment}
                    >
                      {({ isSubmitting }) => (
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
                          
                          <div>
                            <label htmlFor="assignedTo" className="block text-sm font-medium text-neutral-700">
                              Assigned To
                            </label>
                            <Field
                              type="text"
                              id="assignedTo"
                              name="assignedTo"
                              className="input mt-1"
                              placeholder="e.g., Squad Alpha-1, Security Team"
                            />
                            <ErrorMessage name="assignedTo" component="div" className="mt-1 text-sm text-red-600" />
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
                              {isSubmitting ? 'Saving...' : 'Create Assignment'}
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  ) : (
                    <Formik
                      initialValues={{
                        assetType: '',
                        quantity: '',
                        base: '',
                        reason: '',
                        authorizedBy: ''
                      }}
                      validationSchema={ExpenditureSchema}
                      onSubmit={handleSubmitExpenditure}
                    >
                      {({ isSubmitting }) => (
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
                          
                          <div>
                            <label htmlFor="reason" className="block text-sm font-medium text-neutral-700">
                              Reason
                            </label>
                            <Field
                              as="textarea"
                              id="reason"
                              name="reason"
                              rows="3"
                              className="input mt-1"
                              placeholder="e.g., Combat damage, Training exercise"
                            />
                            <ErrorMessage name="reason" component="div" className="mt-1 text-sm text-red-600" />
                          </div>
                          
                          <div>
                            <label htmlFor="authorizedBy" className="block text-sm font-medium text-neutral-700">
                              Authorized By
                            </label>
                            <Field
                              type="text"
                              id="authorizedBy"
                              name="authorizedBy"
                              className="input mt-1"
                              placeholder="e.g., Capt. Johnson"
                            />
                            <ErrorMessage name="authorizedBy" component="div" className="mt-1 text-sm text-red-600" />
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
                              {isSubmitting ? 'Recording...' : 'Record Expenditure'}
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default AssignmentsPage;