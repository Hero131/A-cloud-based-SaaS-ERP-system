import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Lazy load pages
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const POS = React.lazy(() => import('./pages/POS'));
const Customers = React.lazy(() => import('./pages/Customers'));
const Reports = React.lazy(() => import('./pages/Reports'));
const Settings = React.lazy(() => import('./pages/Settings'));
const Branches = React.lazy(() => import('./pages/Branches'));
const CreateBranch = React.lazy(() => import('./pages/CreateBranch'));
const EditBranch = React.lazy(() => import('./pages/EditBranch'));

const App: React.FC = () => {
  return (
    <Router>
      <MainLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pos" element={<POS />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/branches" element={<Branches />} />
            <Route path="/branches/new" element={<CreateBranch />} />
            <Route path="/branches/:id/edit" element={<EditBranch />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </Router>
  );
};

export default App;
