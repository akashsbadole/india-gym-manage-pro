
import { toast, Toaster, Toast } from 'sonner';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationOptions {
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  onDismiss?: () => void;
  onAutoClose?: () => void;
}

/**
 * Shows a notification using the Sonner toast library
 */
export const showNotification = (
  message: string,
  type: NotificationType = 'info',
  options: NotificationOptions = {}
) => {
  const { description, duration, action, onDismiss, onAutoClose } = options;
  
  switch (type) {
    case 'success':
      toast.success(message, { description, duration, action, onDismiss, onAutoClose });
      break;
    case 'error':
      toast.error(message, { description, duration, action, onDismiss, onAutoClose });
      break;
    case 'warning':
      toast.warning(message, { description, duration, action, onDismiss, onAutoClose });
      break;
    case 'info':
    default:
      toast.info(message, { description, duration, action, onDismiss, onAutoClose });
      break;
  }
};

/**
 * Shows a payment reminder notification
 */
export const showPaymentReminder = (memberName: string, dueDate: string, amount: number) => {
  toast.warning('Payment Reminder', {
    description: `${memberName}'s payment of ₹${amount} is due on ${dueDate}`,
    duration: 7000,
    action: {
      label: 'Send Reminder',
      onClick: () => {
        console.log(`Sending reminder to ${memberName}`);
        toast.success('Reminder sent!');
      }
    }
  });
};

/**
 * Shows a membership expiry notification
 */
export const showMembershipExpiry = (memberName: string, expiryDate: string) => {
  toast.warning('Membership Expiring', {
    description: `${memberName}'s membership expires on ${expiryDate}`,
    duration: 7000,
    action: {
      label: 'Renew',
      onClick: () => {
        console.log(`Renewing membership for ${memberName}`);
        toast.success('Renewal initiated!');
      }
    }
  });
};

/**
 * Shows a new check-in notification
 */
export const showCheckInNotification = (memberName: string, locationName: string) => {
  toast.info('New Check-in', {
    description: `${memberName} just checked in at ${locationName}`,
    duration: 5000,
  });
};

/**
 * Shows a new member notification
 */
export const showNewMemberNotification = (memberName: string) => {
  toast.success('New Member Added', {
    description: `${memberName} has been added as a new member`,
    duration: 5000,
    action: {
      label: 'View',
      onClick: () => {
        console.log(`Viewing new member: ${memberName}`);
      }
    }
  });
};
