import React from 'react';
import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  ChartBarIcon,
} from '@heroicons/react/outline';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const stats = [
  {
    name: 'Total Sales',
    value: '₹45,231',
    change: '+20.1%',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Active Customers',
    value: '2,338',
    change: '+15.3%',
    icon: UserGroupIcon,
  },
  {
    name: 'Products Sold',
    value: '1,234',
    change: '+12.5%',
    icon: ShoppingCartIcon,
  },
  {
    name: 'Average Order Value',
    value: '₹3,671',
    change: '+8.2%',
    icon: ChartBarIcon,
  },
];

const salesData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Sales',
      data: [30, 40, 35, 50, 49, 60],
      borderColor: 'rgb(14, 165, 233)',
      backgroundColor: 'rgba(14, 165, 233, 0.5)',
    },
  ],
};

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.name} className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <item.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{item.value}</div>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm font-medium text-green-600">{item.change}</span>
              <span className="text-sm text-gray-500"> from last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Sales Overview</h3>
        <div className="mt-6" style={{ height: '300px' }}>
          <Line
            data={salesData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
                title: {
                  display: false,
                },
              },
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="card">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Sales</h3>
          <div className="mt-6">
            {/* Add recent sales table here */}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Top Products</h3>
          <div className="mt-6">
            {/* Add top products list here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 