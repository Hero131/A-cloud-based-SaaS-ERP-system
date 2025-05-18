import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BranchFormData } from '../types/branch';
import { branchService } from '../services/branchService';
import BranchForm from '../components/branch/BranchForm';

const CreateBranch: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: BranchFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      await branchService.createBranch(data);
      navigate('/branches');
    } catch (err) {
      setError('Failed to create branch');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Branch</h1>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        <BranchForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default CreateBranch; 