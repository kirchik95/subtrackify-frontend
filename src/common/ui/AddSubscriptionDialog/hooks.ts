import { useState } from 'react';

import { toast } from 'sonner';

import { subscriptionActions } from '../../../features/subscriptions/store/slice';
import type { SubscriptionFrequency } from '../../entities/Subscription';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export const useAddSubscriptionDialog = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.subscriptions.addSubscriptionDialogOpen);
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [frequency, setFrequency] = useState<SubscriptionFrequency>('monthly');
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());

  const resetForm = () => {
    setName('');
    setCost('');
    setFrequency('monthly');
    setStartDate(new Date());
  };

  const handleSubmit = () => {
    const costNumber = parseFloat(cost);

    if (!name || !cost || isNaN(costNumber) || costNumber <= 0 || !startDate) {
      return;
    }

    dispatch(
      subscriptionActions.addSubscription({
        name,
        cost: costNumber,
        frequency,
        startDate: startDate.toISOString(),
      })
    );

    dispatch(subscriptionActions.setAddSubscriptionOpen(false));

    // Show success toast
    toast.success('Subscription added successfully', {
      description: `${name} - $${costNumber.toFixed(2)} (${frequency})`,
    });

    // Reset form
    resetForm();
  };

  const handleOpenChange = (newOpen: boolean) => {
    dispatch(subscriptionActions.setAddSubscriptionOpen(newOpen));
    if (!newOpen) {
      // Reset form when closing
      resetForm();
    }
  };

  const handleCancel = () => {
    dispatch(subscriptionActions.setAddSubscriptionOpen(false));
  };

  const handleFrequencyChange = (value: string) => {
    setFrequency(value as SubscriptionFrequency);
  };

  const isSubmitDisabled = !name || !cost || !startDate;

  return {
    open,
    name,
    setName,
    cost,
    setCost,
    frequency,
    handleFrequencyChange,
    startDate,
    setStartDate,
    handleSubmit,
    handleOpenChange,
    handleCancel,
    isSubmitDisabled,
  };
};
