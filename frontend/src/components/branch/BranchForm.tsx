import React from 'react';
import { useForm } from 'react-hook-form';
import { BranchFormData } from '../../types/branch';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

interface BranchFormProps {
  initialData?: Partial<BranchFormData>;
  onSubmit: (data: BranchFormData) => void;
  isLoading?: boolean;
}

const BranchForm: React.FC<BranchFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<BranchFormData>({
    defaultValues: initialData
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Input
              label="Branch Name"
              {...register('name', { required: 'Branch name is required' })}
              error={errors.name?.message}
            />
          </div>

          <div>
            <Input
              label="Branch Code"
              {...register('code', { required: 'Branch code is required' })}
              error={errors.code?.message}
            />
          </div>

          <div className="md:col-span-2">
            <Input
              label="Address"
              {...register('address', { required: 'Address is required' })}
              error={errors.address?.message}
            />
          </div>

          <div>
            <Input
              label="City"
              {...register('city', { required: 'City is required' })}
              error={errors.city?.message}
            />
          </div>

          <div>
            <Input
              label="State"
              {...register('state', { required: 'State is required' })}
              error={errors.state?.message}
            />
          </div>

          <div>
            <Input
              label="Country"
              {...register('country', { required: 'Country is required' })}
              error={errors.country?.message}
            />
          </div>

          <div>
            <Input
              label="Pincode"
              {...register('pincode', { required: 'Pincode is required' })}
              error={errors.pincode?.message}
            />
          </div>

          <div>
            <Input
              label="Phone"
              type="tel"
              {...register('phone', { required: 'Phone number is required' })}
              error={errors.phone?.message}
            />
          </div>

          <div>
            <Input
              label="Email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              error={errors.email?.message}
            />
          </div>

          <div>
            <Input
              label="GSTIN"
              {...register('gstin', { required: 'GSTIN is required' })}
              error={errors.gstin?.message}
            />
          </div>

          <div>
            <Input
              label="Opening Time"
              type="time"
              {...register('openingTime', { required: 'Opening time is required' })}
              error={errors.openingTime?.message}
            />
          </div>

          <div>
            <Input
              label="Closing Time"
              type="time"
              {...register('closingTime', { required: 'Closing time is required' })}
              error={errors.closingTime?.message}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            {initialData ? 'Update Branch' : 'Create Branch'}
          </Button>
        </div>
      </Card>
    </form>
  );
};

export default BranchForm; 