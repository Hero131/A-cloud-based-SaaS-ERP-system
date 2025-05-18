import React, { useState } from 'react';
import { Tab } from '@headlessui/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Settings: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = [
    { name: 'General', content: <GeneralSettings /> },
    { name: 'Branches', content: <BranchSettings /> },
    { name: 'Users', content: <UserSettings /> },
    { name: 'Tax & Billing', content: <TaxSettings /> },
    { name: 'Payment', content: <PaymentSettings /> },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Settings
          </h2>
        </div>
      </div>

      <div className="mt-6">
        <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
          <Tab.List className="flex space-x-1 rounded-xl bg-primary-900/20 p-1">
            {tabs.map((tab) => (
              <Tab
                key={tab.name}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-primary-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white text-primary-700 shadow'
                      : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'
                  )
                }
              >
                {tab.name}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-6">
            {tabs.map((tab, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames(
                  'rounded-xl bg-white p-6',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-primary-400 focus:outline-none focus:ring-2'
                )}
              >
                {tab.content}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

const GeneralSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">Company Information</h3>
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="company-name" className="form-label">
              Company Name
            </label>
            <input
              type="text"
              name="company-name"
              id="company-name"
              className="input-field"
            />
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="gstin" className="form-label">
              GSTIN
            </label>
            <input
              type="text"
              name="gstin"
              id="gstin"
              className="input-field"
            />
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              rows={3}
              className="input-field"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">Contact Information</h3>
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="input-field"
            />
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              className="input-field"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button type="button" className="btn-primary">
          Save Changes
        </button>
      </div>
    </div>
  );
};

const BranchSettings: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900">Branch Management</h3>
      {/* Add branch management content */}
    </div>
  );
};

const UserSettings: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900">User Management</h3>
      {/* Add user management content */}
    </div>
  );
};

const TaxSettings: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900">Tax & Billing Settings</h3>
      {/* Add tax and billing settings content */}
    </div>
  );
};

const PaymentSettings: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900">Payment Gateway Settings</h3>
      {/* Add payment gateway settings content */}
    </div>
  );
};

export default Settings; 