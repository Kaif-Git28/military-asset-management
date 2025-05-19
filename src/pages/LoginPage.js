import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { authService } from '../services/api';

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required'),
  password: Yup.string()
    .required('Password is required')
});

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState({ checked: false, working: false });

  // Check if API is available when component mounts
  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        await authService.testConnection();
        setApiStatus({ checked: true, working: true });
      } catch (error) {
        console.error("API connection test failed:", error);
        setApiStatus({ checked: true, working: false });
      }
    };

    checkApiStatus();
  }, []);
  
  const handleSubmit = async (values) => {
    try {
      setError('');
      setIsLoading(true);
      await login(values.username, values.password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Failed to log in. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <img
            className="mx-auto h-14 w-auto"
            src="https://cdn-icons-png.flaticon.com/128/6941/6941697.png"
            alt="Military Asset Management"
          />
          <h2 className="mt-6 text-3xl font-bold text-primary-900">
            Military Asset Management
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Secure access required. Authorized personnel only.
          </p>
        </div>
        
        {apiStatus.checked && !apiStatus.working && (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Backend API is not responding. Please make sure the server is running.
                </p>
              </div>
            </div>
          </div>
        )}
        
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-neutral-700">
                    Username
                  </label>
                  <Field
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    className="input mt-1 w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter your username"
                  />
                  <ErrorMessage name="username" component="div" className="mt-1 text-sm text-red-600" />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className="input mt-1 w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-600" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-700">
                      Remember me
                    </label>
                  </div>
                  
                  <div className="text-sm">
                    <a href="#forgot-password" className="font-medium text-primary-600 hover:text-primary-500">
                      Forgot your password?
                    </a>
                  </div>
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading || (apiStatus.checked && !apiStatus.working)}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
              
              <div className="text-center text-sm text-neutral-600">
                <p>Demo User Credentials:</p>
                <ul className="mt-1 space-y-1">
                  <li><strong>Admin:</strong> admin / admin123</li>
                </ul>
              </div>
            </Form>
          )}
        </Formik>

        <div className="mt-8 border-t pt-6">
          <h3 className="text-center text-sm font-medium text-gray-500 mb-4">Test Accounts</h3>
          <div className="bg-blue-50 p-4 rounded-md shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 mb-2">
                <h4 className="font-semibold text-gray-700">Admin User</h4>
                <p className="text-xs text-gray-600">Username: <span className="font-mono">admin</span></p>
                <p className="text-xs text-gray-600">Password: <span className="font-mono">admin123</span></p>
              </div>
              
              <div className="border-t pt-2 col-span-2">
                <h4 className="font-semibold text-gray-700">Base Commander</h4>
                <p className="text-xs text-gray-600">Username: <span className="font-mono">commander</span></p>
                <p className="text-xs text-gray-600">Password: <span className="font-mono">commander123</span></p>
              </div>
              
              <div className="border-t pt-2 col-span-2">
                <h4 className="font-semibold text-gray-700">Logistics Officer</h4>
                <p className="text-xs text-gray-600">Username: <span className="font-mono">logistics</span></p>
                <p className="text-xs text-gray-600">Password: <span className="font-mono">logistics123</span></p>
              </div>
              
              <div className="border-t pt-2 col-span-2">
                <h4 className="font-semibold text-gray-700">Staff Member</h4>
                <p className="text-xs text-gray-600">Username: <span className="font-mono">staff</span></p>
                <p className="text-xs text-gray-600">Password: <span className="font-mono">staff123</span></p>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-gray-500 mt-3">
            These accounts are for demonstration purposes only
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;