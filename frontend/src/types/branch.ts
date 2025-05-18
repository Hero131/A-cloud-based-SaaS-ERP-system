export interface Branch {
  id: number;
  name: string;
  code: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  phone: string;
  email: string;
  gstin: string;
  openingTime: string;
  closingTime: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  users?: {
    id: number;
    firstName: string;
    lastName: string;
    role: string;
  }[];
}

export interface BranchStats {
  userCount: number;
  productCount: number;
}

export interface BranchFormData {
  name: string;
  code: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  phone: string;
  email: string;
  gstin: string;
  openingTime: string;
  closingTime: string;
} 