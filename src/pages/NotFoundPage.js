import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg text-center">
        <div>
          <img
            className="mx-auto h-14 w-auto"
            src="https://cdn-icons-png.flaticon.com/128/6941/6941697.png"
            alt="Military Asset Management"
          />
          <h2 className="mt-6 text-3xl font-bold text-primary-900">
            404 - Page Not Found
          </h2>
          <p className="mt-2 text-neutral-600">
            The requested resource could not be located.
          </p>
        </div>
        
        <div className="mt-6">
          <Link
            to="/dashboard"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;