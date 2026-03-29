import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

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

import { CategorySelect } from '../CategorySelect';
import { ColorPicker } from '../ColorPicker';
import { useAddSubscriptionDialog } from './hooks';

export const AddSubscriptionDialog = () => {
  const {
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
    categoryId,
    setCategoryId,
    color,
    setColor,
    errors,
    handleSubmit,
    handleOpenChange,
    handleCancel,
    isSubmitDisabled,
  } = useAddSubscriptionDialog();

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Subscription</DialogTitle>
          <DialogDescription>
            Add a new subscription to track your recurring expenses.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <FieldLabel>Name *</FieldLabel>
            <FieldContent>
              <Input
                placeholder="Netflix, Spotify, etc."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={cn(errors.name && 'border-destructive focus-visible:ring-destructive')}
              />
              {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
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
                    errors.price && 'border-destructive focus-visible:ring-destructive'
                  )}
                />
                {errors.price && <p className="text-sm text-destructive mt-1">{errors.price}</p>}
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
                <Select value={billingCycle} onValueChange={handleBillingCycleChange}>
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
                <CategorySelect value={categoryId} onChange={setCategoryId} />
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
                      errors.nextBillingDate && 'border-destructive'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {nextBillingDate ? format(nextBillingDate, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={nextBillingDate}
                    onSelect={setNextBillingDate}
                  />
                </PopoverContent>
              </Popover>
              {errors.nextBillingDate && (
                <p className="text-sm text-destructive mt-1">{errors.nextBillingDate}</p>
              )}
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
