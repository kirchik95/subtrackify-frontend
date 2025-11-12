import { useState } from 'react';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';

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

import { subscriptionActions } from '../../../features/subscriptions/store/slice';
import type { SubscriptionFrequency } from '../../entities/Subscription';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export const AddSubscriptionDialog = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.subscriptions.addSubscriptionDialogOpen);
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [frequency, setFrequency] = useState<SubscriptionFrequency>('monthly');
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());

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
    setName('');
    setCost('');
    setFrequency('monthly');
    setStartDate(new Date());
  };

  const handleOpenChange = (newOpen: boolean) => {
    dispatch(subscriptionActions.setAddSubscriptionOpen(newOpen));
    if (!newOpen) {
      // Reset form when closing
      setName('');
      setCost('');
      setFrequency('monthly');
      setStartDate(new Date());
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Subscription</DialogTitle>
          <DialogDescription>
            Add a new subscription to track your recurring expenses.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <FieldLabel>Name</FieldLabel>
            <FieldContent>
              <Input
                placeholder="Netflix, Spotify, etc."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FieldContent>
          </Field>
          <div className="flex gap-4">
            <Field className="flex-1">
              <FieldLabel>Cost</FieldLabel>
              <FieldContent>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  step="0.01"
                  min="0"
                />
              </FieldContent>
            </Field>
            <Field className="flex-1">
              <FieldLabel>Frequency</FieldLabel>
              <FieldContent>
                <Select
                  value={frequency}
                  onValueChange={(value) => setFrequency(value as SubscriptionFrequency)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="annually">Annually</SelectItem>
                  </SelectContent>
                </Select>
              </FieldContent>
            </Field>
          </div>
          <Field>
            <FieldLabel>Start Date</FieldLabel>
            <FieldContent>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FieldContent>
          </Field>
        </FieldGroup>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => dispatch(subscriptionActions.setAddSubscriptionOpen(false))}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!name || !cost || !startDate}>
            Add Subscription
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
