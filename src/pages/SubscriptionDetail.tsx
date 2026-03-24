import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';

import { pageVariants, sectionVariants } from '@/common/animations/page';
import { useAppDispatch, useAppSelector } from '@/common/store/hooks';
import {
  deleteSubscription,
  fetchSubscriptions,
  updateSubscription,
} from '@/features/subscriptions/store/actions';
import { subscriptionActions } from '@/features/subscriptions/store/slice';
import { ChevronLeft, Edit, Pause, Play, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';

import { SubscriptionIcon } from '../features/subscriptions/components/SubscriptionIcon';

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

const formatPrice = (price: number, currency: string) => {
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    RUB: '₽',
    JPY: '¥',
    CNY: '¥',
  };
  return `${symbols[currency] || currency}${price.toFixed(2)}`;
};

const formatFrequency = (cycle: string) => {
  const map: Record<string, string> = {
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
    yearly: 'Yearly',
  };
  return map[cycle] || cycle;
};

function DetailSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-5 w-40" />
      <div className="flex gap-6">
        <div className="flex-[13] rounded-3xl border border-border bg-background p-8">
          <div className="flex items-center gap-5">
            <Skeleton className="size-20 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-7 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
          <div className="h-px bg-border my-6" />
          <div className="flex gap-10">
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-7 w-24" />
            </div>
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-24" />
            </div>
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
        </div>
        <div className="flex-[7] rounded-3xl border border-border bg-background p-8">
          <Skeleton className="h-5 w-16 mb-5" />
          <div className="flex flex-col gap-3">
            <Skeleton className="h-10 rounded-xl" />
            <Skeleton className="h-10 rounded-xl" />
            <Skeleton className="h-10 rounded-xl" />
          </div>
        </div>
      </div>
      <div className="flex gap-6">
        <div className="flex-1 rounded-3xl border border-border bg-background p-8">
          <Skeleton className="h-5 w-40 mb-5" />
          <div className="flex flex-col gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex justify-between py-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const SubscriptionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const subscriptions = useAppSelector((state) => state.subscriptions.items);
  const isLoading = useAppSelector((state) => state.subscriptions.isLoading);
  const subscription = subscriptions.find((s) => s.id === Number(id));
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pauseDialogOpen, setPauseDialogOpen] = useState(false);

  useEffect(() => {
    if (subscriptions.length === 0) {
      dispatch(fetchSubscriptions());
    }
  }, [dispatch, subscriptions.length]);

  const handleEdit = () => {
    if (subscription) {
      dispatch(subscriptionActions.setEditSubscriptionId(subscription.id));
    }
  };

  const handleDelete = async () => {
    if (!subscription) return;
    try {
      await dispatch(deleteSubscription(subscription.id)).unwrap();
      toast.success(`${subscription.name} deleted successfully`);
      navigate('/');
    } catch {
      toast.error('Failed to delete subscription');
    }
    setDeleteDialogOpen(false);
  };

  const handlePauseToggle = async () => {
    if (!subscription) return;
    const newStatus = subscription.status === 'paused' ? 'active' : 'paused';
    try {
      await dispatch(
        updateSubscription({
          id: subscription.id,
          data: { ...subscription, status: newStatus } as never,
        })
      ).unwrap();
      toast.success(
        newStatus === 'paused' ? `${subscription.name} paused` : `${subscription.name} resumed`
      );
    } catch {
      toast.error('Failed to update subscription');
    }
    setPauseDialogOpen(false);
  };

  if (isLoading && !subscription) {
    return <DetailSkeleton />;
  }

  if (!subscription) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <h2 className="text-xl font-semibold mb-2">Subscription not found</h2>
        <p className="text-muted-foreground mb-6">
          The subscription you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          to="/"
          className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ChevronLeft className="size-4" />
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const statusLabel =
    subscription.status === 'active'
      ? 'Active'
      : subscription.status === 'paused'
        ? 'Paused'
        : 'Cancelled';
  const statusColor =
    subscription.status === 'active'
      ? 'bg-green-100 text-green-600'
      : subscription.status === 'paused'
        ? 'bg-yellow-100 text-yellow-600'
        : 'bg-red-100 text-red-600';

  const detailRows = [
    { label: 'Billing Cycle', value: formatFrequency(subscription.billingCycle) },
    { label: 'Currency', value: subscription.currency },
    { label: 'Category', value: subscription.category || '—' },
    { label: 'Created', value: formatDate(subscription.createdAt) },
    { label: 'Next Billing', value: formatDate(subscription.nextBillingDate) },
  ];

  return (
    <motion.div
      className="flex flex-col gap-6"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <motion.div variants={sectionVariants}>
        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit no-underline"
        >
          <ChevronLeft className="size-4" />
          <span>Dashboard</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-medium">{subscription.name}</span>
        </Link>
      </motion.div>

      {/* Row 1: Hero + Actions */}
      <motion.div className="flex gap-6" variants={sectionVariants}>
        <div className="flex-[13] flex flex-col rounded-3xl border border-border bg-background p-8 shadow-[0_4px_12px_#00000005]">
          <div className="flex items-center gap-5">
            <SubscriptionIcon
              name={subscription.name}
              color={subscription.color}
              size="lg"
              className="rounded-full"
            />
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold text-foreground">{subscription.name}</h1>
                <span className={`rounded-lg px-2.5 py-1 text-xs font-medium ${statusColor}`}>
                  {statusLabel}
                </span>
              </div>
              {subscription.description && (
                <p className="text-sm text-muted-foreground">{subscription.description}</p>
              )}
            </div>
          </div>
          <div className="h-px bg-border my-6" />
          <div className="flex gap-10">
            <div className="flex flex-col gap-1">
              <span className="text-[13px] text-muted-foreground">Monthly Cost</span>
              <span className="text-2xl font-semibold text-foreground">
                {formatPrice(subscription.price, subscription.currency)}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[13px] text-muted-foreground">Next Billing</span>
              <span className="text-base font-medium text-foreground">
                {formatDate(subscription.nextBillingDate)}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[13px] text-muted-foreground">Category</span>
              <span className="text-base font-medium text-foreground">
                {subscription.category || '—'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-[7] flex flex-col rounded-3xl border border-border bg-background p-8 gap-5 shadow-[0_4px_12px_#00000005]">
          <h2 className="text-lg font-semibold text-foreground">Actions</h2>
          <div className="flex flex-col gap-3">
            <button
              onClick={handleEdit}
              className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              <Edit className="size-4" />
              Edit Subscription
            </button>
            <button
              onClick={() => setPauseDialogOpen(true)}
              className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              {subscription.status === 'paused' ? (
                <Play className="size-4" />
              ) : (
                <Pause className="size-4" />
              )}
              {subscription.status === 'paused' ? 'Resume Subscription' : 'Pause Subscription'}
            </button>
            <button
              onClick={() => setDeleteDialogOpen(true)}
              className="flex items-center justify-center gap-2 rounded-xl bg-destructive px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              <Trash2 className="size-4" />
              Delete Subscription
            </button>
          </div>
        </div>
      </motion.div>

      {/* Row 2: Subscription Details */}
      <motion.div
        className="rounded-3xl border border-border bg-background p-8 shadow-[0_4px_12px_#00000005]"
        variants={sectionVariants}
      >
        <h2 className="text-lg font-semibold text-foreground mb-5">Subscription Details</h2>
        <div className="flex flex-col">
          {detailRows.map((row, index) => (
            <div key={row.label}>
              {index > 0 && <div className="h-px bg-border" />}
              <div className="flex justify-between items-center py-3">
                <span className="text-sm text-muted-foreground">{row.label}</span>
                <span className="text-sm font-medium text-foreground">{row.value}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete subscription?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {subscription.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-white hover:bg-destructive/90 hover:text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Pause Confirmation */}
      <AlertDialog open={pauseDialogOpen} onOpenChange={setPauseDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {subscription.status === 'paused' ? 'Resume subscription?' : 'Pause subscription?'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {subscription.status === 'paused'
                ? `Are you sure you want to resume ${subscription.name}?`
                : `Are you sure you want to pause ${subscription.name}? You can resume it anytime.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handlePauseToggle}>
              {subscription.status === 'paused' ? 'Resume' : 'Pause'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};
