import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Branch } from '../types/branch';
import { branchService } from '../services/branchService';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

const Branches: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBranches();
  }, []);

  const loadBranches = async () => {
    try {
      setLoading(true);
      const data = await branchService.getAllBranches(search);
      setBranches(data);
      setError(null);
    } catch (err) {
      setError('Failed to load branches');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this branch?')) {
      try {
        await branchService.deleteBranch(id);
        setBranches(branches.filter(branch => branch.id !== id));
      } catch (err) {
        setError('Failed to delete branch');
        console.error(err);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Branches</h1>
        <Link to="/branches/new">
          <Button>
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Branch
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search branches..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && loadBranches()}
          className="max-w-md"
        />
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map((branch) => (
            <Card key={branch.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{branch.name}</h2>
                  <p className="text-sm text-gray-500">{branch.code}</p>
                </div>
                <Badge variant={branch.isActive ? 'success' : 'danger'}>
                  {branch.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Address:</span> {branch.address}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">City:</span> {branch.city}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Phone:</span> {branch.phone}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">GSTIN:</span> {branch.gstin}
                </p>
              </div>

              <div className="flex justify-end space-x-2">
                <Link to={`/branches/${branch.id}/edit`}>
                  <Button variant="outline" size="sm">
                    <PencilIcon className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(branch.id)}
                >
                  <TrashIcon className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Branches; 