import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const MovementDetailModal = ({ isOpen, closeModal, data, type }) => {
  const getTitle = () => {
    switch (type) {
      case 'purchases':
        return 'Purchase Details';
      case 'transferIn':
        return 'Transfers In';
      case 'transferOut':
        return 'Transfers Out';
      default:
        return 'Movement Details';
    }
  };
  
  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-start justify-between mb-4">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-primary-900"
                  >
                    {getTitle()}
                  </Dialog.Title>
                  <button
                    type="button"
                    className="ml-auto bg-white rounded-md text-neutral-400 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    onClick={closeModal}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                
                <div className="table-container">
                  <table className="table">
                    <thead className="table-header">
                      <tr>
                        <th className="table-header-cell">Date</th>
                        <th className="table-header-cell">Asset Type</th>
                        <th className="table-header-cell">Quantity</th>
                        {type === 'transferIn' || type === 'transferOut' ? (
                          <th className="table-header-cell">{type === 'transferIn' ? 'From Base' : 'To Base'}</th>
                        ) : (
                          <th className="table-header-cell">Base</th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="table-body">
                      {data.map((item) => (
                        <tr key={item.id} className="table-row">
                          <td className="table-cell">{item.date}</td>
                          <td className="table-cell">{item.assetType}</td>
                          <td className="table-cell">{item.quantity}</td>
                          <td className="table-cell">{item.base}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MovementDetailModal;