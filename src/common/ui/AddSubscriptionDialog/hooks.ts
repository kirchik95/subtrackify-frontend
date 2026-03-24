import { useState } from 'react';

import { toast } from 'sonner';

import { createSubscription } from '../../../features/subscriptions/store/actions';
import { subscriptionActions } from '../../../features/subscriptions/store/slice';
import type { BillingCycle } from '../../entities/Subscription';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

interface FormErrors {
  name?: string;
  price?: string;
  nextBillingDate?: string;
}

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
  const [color, setColor] = useState<string | undefined>(undefined);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setCurrency('USD');
    setBillingCycle('monthly');
    setNextBillingDate(new Date());
    setCategory('');
    setColor(undefined);
    setErrors({});
    setSubmitted(false);
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    const priceNumber = parseFloat(price);
    if (!price || isNaN(priceNumber) || priceNumber <= 0) {
      newErrors.price = 'Please enter a valid price';
    }
    if (!nextBillingDate) newErrors.nextBillingDate = 'Date is required';
    return newErrors;
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const priceNumber = parseFloat(price);

    try {
      await dispatch(
        createSubscription({
          name,
          description: description || undefined,
          price: priceNumber,
          currency: currency || undefined,
          billingCycle,
          nextBillingDate: nextBillingDate!.toISOString(),
          category: category || undefined,
          color,
        })
      ).unwrap();

      dispatch(subscriptionActions.setAddSubscriptionOpen(false));

      toast.success('Subscription added successfully', {
        description: `${name} - ${currency} ${priceNumber.toFixed(2)} (${billingCycle})`,
      });

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
      resetForm();
    }
  };

  const handleCancel = () => {
    dispatch(subscriptionActions.setAddSubscriptionOpen(false));
    resetForm();
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
    color,
    setColor,
    errors: submitted ? errors : {},
    handleSubmit,
    handleOpenChange,
    handleCancel,
    isSubmitDisabled,
  };
};
