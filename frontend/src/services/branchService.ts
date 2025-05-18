import axios from 'axios';
import { Branch, BranchStats, BranchFormData } from '../types/branch';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const branchService = {
  getAllBranches: async (search?: string, isActive?: boolean): Promise<Branch[]> => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (isActive !== undefined) params.append('isActive', isActive.toString());
    
    const response = await axios.get(`${API_URL}/branches?${params.toString()}`);
    return response.data.data.branches;
  },

  getBranch: async (id: number): Promise<Branch> => {
    const response = await axios.get(`${API_URL}/branches/${id}`);
    return response.data.data.branch;
  },

  createBranch: async (data: BranchFormData): Promise<Branch> => {
    const response = await axios.post(`${API_URL}/branches`, data);
    return response.data.data.branch;
  },

  updateBranch: async (id: number, data: Partial<BranchFormData>): Promise<Branch> => {
    const response = await axios.patch(`${API_URL}/branches/${id}`, data);
    return response.data.data.branch;
  },

  deleteBranch: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/branches/${id}`);
  },

  getBranchStats: async (id: number): Promise<BranchStats> => {
    const response = await axios.get(`${API_URL}/branches/${id}/stats`);
    return response.data.data.stats;
  }
}; 