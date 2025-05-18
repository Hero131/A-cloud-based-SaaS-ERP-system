import React, { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState('week');

  const salesData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Sales',
        data: [30000, 45000, 35000, 50000, 49000, 60000, 55000],
        borderColor: 'rgb(14, 165, 233)',
        backgroundColor: 'rgba(14, 165, 233, 0.5)',
      },
    ],
  };

  const categoryData = {
    labels: ['Gold', 'Silver', 'Diamond', 'Platinum'],
    datasets: [
      {
        label: 'Sales by Category',
        data: [45, 25, 20, 10],
        backgroundColor: [
          'rgba(255, 206, 86, 0.5)',
          'rgba(192, 192, 192, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(201, 203, 207, 0.5)',
        ],
        borderColor: [
          'rgb(255, 206, 86)',
          'rgb(192, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Reports & Analytics
          </h2>
        </div>
        <div className="mt-4 flex sm:mt-0 sm:ml-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="input-field"
          >
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="year">Last 12 Months</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="card">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Sales Trend
          </h3>
          <div style={{ height: '300px' }}>
            <Line
              data={salesData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Sales by Category
          </h3>
          <div style={{ height: '300px' }}>
            <Bar
              data={categoryData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="card">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Top Selling Products
          </h3>
          <div className="space-y-4">
            {/* Add top selling products list */}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Customer Insights
          </h3>
          <div className="space-y-4">
            {/* Add customer insights */}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Inventory Status
          </h3>
          <div className="space-y-4">
            {/* Add inventory status */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports; 