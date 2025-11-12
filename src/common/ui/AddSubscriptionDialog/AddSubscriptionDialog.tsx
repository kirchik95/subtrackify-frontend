import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

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

import { useAddSubscriptionDialog } from './hooks';

export const AddSubscriptionDialog = () => {
  const {
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
  } = useAddSubscriptionDialog();

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
                <Select value={frequency} onValueChange={handleFrequencyChange}>
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
                  <Calendar mode="single" selected={startDate} onSelect={setStartDate} />
                </PopoverContent>
              </Popover>
            </FieldContent>
          </Field>
        </FieldGroup>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitDisabled}>
            Add Subscription
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
