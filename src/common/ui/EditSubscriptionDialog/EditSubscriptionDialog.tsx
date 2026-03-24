import { useState } from 'react';

import type { Subscription } from '@/common/api/subscriptions';
import type { BillingCycle } from '@/common/entities/Subscription';
import { useAppDispatch, useAppSelector } from '@/common/store/hooks';
import { updateSubscription } from '@/features/subscriptions/store/actions';
import { subscriptionActions } from '@/features/subscriptions/store/slice';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldContent, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { ColorPicker } from '../ColorPicker';

interface FormErrors {
  name?: string;
  price?: string;
  nextBillingDate?: string;
}

interface EditFormProps {
  subscription: Subscription;
  onClose: () => void;
}

function EditForm({ subscription, onClose }: EditFormProps) {
  const dispatch = useAppDispatch();
  const [name, setName] = useState(subscription.name);
  const [description, setDescription] = useState(subscription.description || '');
  const [price, setPrice] = useState(subscription.price.toString());
  const [currency, setCurrency] = useState(subscription.currency);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(subscription.billingCycle);
  const [nextBillingDate, setNextBillingDate] = useState<Date | undefined>(
    new Date(subscription.nextBillingDate)
  );
  const [category, setCategory] = useState(subscription.category || '');
  const [color, setColor] = useState<string | undefined>(subscription.color);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

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
        updateSubscription({
          id: subscription.id,
          data: {
            name,
            description: description || undefined,
            price: priceNumber,
            currency,
            billingCycle,
            nextBillingDate: nextBillingDate!.toISOString(),
            category: category || undefined,
            color,
          },
        })
      ).unwrap();

      onClose();
      toast.success('Subscription updated successfully');
    } catch (error) {
      toast.error('Failed to update subscription', {
        description: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  };

  const displayErrors = submitted ? errors : {};

  return (
    <DialogContent className="max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Edit Subscription</DialogTitle>
        <DialogDescription>Update the details of your subscription.</DialogDescription>
      </DialogHeader>
      <FieldGroup>
        <Field>
          <FieldLabel>Name *</FieldLabel>
          <FieldContent>
            <Input
              placeholder="Netflix, Spotify, etc."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={cn(
                displayErrors.name && 'border-destructive focus-visible:ring-destructive'
              )}
            />
            {displayErrors.name && (
              <p className="text-sm text-destructive mt-1">{displayErrors.name}</p>
            )}
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Description</FieldLabel>
          <FieldContent>
            <Textarea
              placeholder="Optional description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </FieldContent>
        </Field>
        <div className="flex gap-4">
          <Field className="flex-1">
            <FieldLabel>Price *</FieldLabel>
            <FieldContent>
              <Input
                type="number"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                step="0.01"
                min="0"
                className={cn(
                  displayErrors.price && 'border-destructive focus-visible:ring-destructive'
                )}
              />
              {displayErrors.price && (
                <p className="text-sm text-destructive mt-1">{displayErrors.price}</p>
              )}
            </FieldContent>
          </Field>
          <Field className="flex-1">
            <FieldLabel>Currency</FieldLabel>
            <FieldContent>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="RUB">RUB (₽)</SelectItem>
                  <SelectItem value="JPY">JPY (¥)</SelectItem>
                  <SelectItem value="CNY">CNY (¥)</SelectItem>
                </SelectContent>
              </Select>
            </FieldContent>
          </Field>
        </div>
        <div className="flex gap-4">
          <Field className="flex-1">
            <FieldLabel>Billing Cycle *</FieldLabel>
            <FieldContent>
              <Select
                value={billingCycle}
                onValueChange={(v) => setBillingCycle(v as BillingCycle)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select billing cycle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </FieldContent>
          </Field>
          <Field className="flex-1">
            <FieldLabel>Category</FieldLabel>
            <FieldContent>
              <Input
                placeholder="e.g., Entertainment, Software"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </FieldContent>
          </Field>
        </div>
        <Field>
          <FieldLabel>Color</FieldLabel>
          <FieldContent>
            <ColorPicker value={color} onChange={setColor} />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Next Billing Date *</FieldLabel>
          <FieldContent>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    displayErrors.nextBillingDate && 'border-destructive'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {nextBillingDate ? format(nextBillingDate, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={nextBillingDate} onSelect={setNextBillingDate} />
              </PopoverContent>
            </Popover>
            {displayErrors.nextBillingDate && (
              <p className="text-sm text-destructive mt-1">{displayErrors.nextBillingDate}</p>
            )}
          </FieldContent>
        </Field>
      </FieldGroup>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Save Changes</Button>
      </DialogFooter>
    </DialogContent>
  );
}

export const EditSubscriptionDialog = () => {
  const editId = useAppSelector((state) => state.subscriptions.editSubscriptionId);
  const subscription = useAppSelector((state) =>
    state.subscriptions.items.find((s) => s.id === editId)
  );
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(subscriptionActions.setEditSubscriptionId(null));
  };

  return (
    <Dialog open={editId !== null} onOpenChange={(open) => !open && handleClose()}>
      {subscription && (
        <EditForm key={subscription.id} subscription={subscription} onClose={handleClose} />
      )}
    </Dialog>
  );
};
