import React, { useState } from 'react';
import { SearchIcon, PlusIcon } from '@heroicons/react/outline';

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  totalPurchaseAmount: number;
  loyaltyPoints: number;
  lastPurchaseDate: string;
}

const Customers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Sample data - Replace with actual API call
  const customers: Customer[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '+91 9876543210',
      totalPurchaseAmount: 150000,
      loyaltyPoints: 1500,
      lastPurchaseDate: '2024-03-15',
    },
    // Add more sample customers
  ];

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
  );

  return (
    <div className="h-full flex">
      {/* Customer List */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="sm:flex sm:items-center sm:justify-between mb-6">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Customers
            </h2>
          </div>
          <div className="mt-4 flex sm:mt-0 sm:ml-4">
            <button
              type="button"
              className="btn-primary inline-flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Customer
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="input-field pl-10"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredCustomers.map((customer) => (
              <li key={customer.id}>
                <button
                  className="block hover:bg-gray-50 w-full text-left"
                  onClick={() => setSelectedCustomer(customer)}
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-primary-600 truncate">
                          {customer.firstName} {customer.lastName}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {customer.email} • {customer.phone}
                        </p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <p className="text-sm text-gray-900">
                          ₹{customer.totalPurchaseAmount.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          {customer.loyaltyPoints} points
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Customer Details */}
      {selectedCustomer && (
        <div className="w-96 bg-white border-l border-gray-200 p-6 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {selectedCustomer.firstName} {selectedCustomer.lastName}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{selectedCustomer.email}</p>
              <p className="text-sm text-gray-500">{selectedCustomer.phone}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900">Purchase History</h4>
              <dl className="mt-2 space-y-1">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Total Spent</dt>
                  <dd className="text-sm text-gray-900">
                    ₹{selectedCustomer.totalPurchaseAmount.toLocaleString()}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Loyalty Points</dt>
                  <dd className="text-sm text-gray-900">{selectedCustomer.loyaltyPoints}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Last Purchase</dt>
                  <dd className="text-sm text-gray-900">{selectedCustomer.lastPurchaseDate}</dd>
                </div>
              </dl>
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                className="flex-1 btn-primary"
              >
                New Sale
              </button>
              <button
                type="button"
                className="flex-1 btn-secondary"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers; 