import { useState } from 'react';

import { toast } from 'sonner';

import { createSubscription } from '../../../features/subscriptions/store/actions';
import { subscriptionActions } from '../../../features/subscriptions/store/slice';
import type { BillingCycle } from '../../entities/Subscription';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export const useAddSubscriptionDialog = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.subscriptions.addSubscriptionDialogOpen);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [nextBillingDate, setNextBillingDate] = useState<Date | undefined>(new Date());
  const [category, setCategory] = useState('');

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setCurrency('USD');
    setBillingCycle('monthly');
    setNextBillingDate(new Date());
    setCategory('');
  };

  const handleSubmit = async () => {
    const priceNumber = parseFloat(price);

    if (!name || !price || isNaN(priceNumber) || priceNumber <= 0 || !nextBillingDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await dispatch(
        createSubscription({
          name,
          description: description || undefined,
          price: priceNumber,
          currency: currency || undefined,
          billingCycle,
          nextBillingDate: nextBillingDate.toISOString(),
          category: category || undefined,
        })
      ).unwrap();

      dispatch(subscriptionActions.setAddSubscriptionOpen(false));

      // Show success toast
      toast.success('Subscription added successfully', {
        description: `${name} - ${currency} ${priceNumber.toFixed(2)} (${billingCycle})`,
      });

      // Reset form
      resetForm();
    } catch (error) {
      toast.error('Failed to create subscription', {
        description: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
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

  const handleBillingCycleChange = (value: string) => {
    setBillingCycle(value as BillingCycle);
  };

  const isSubmitDisabled = !name || !price || !nextBillingDate;

  return {
    open,
    name,
    setName,
    description,
    setDescription,
    price,
    setPrice,
    currency,
    setCurrency,
    billingCycle,
    handleBillingCycleChange,
    nextBillingDate,
    setNextBillingDate,
    category,
    setCategory,
    handleSubmit,
    handleOpenChange,
    handleCancel,
    isSubmitDisabled,
  };
};
