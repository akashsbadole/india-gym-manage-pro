
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ClockIcon, UserCheckIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Switch } from '@/components/ui/switch';

// Form props interface
interface ManualCheckInFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

// Form validation schema based on the Prisma Attendance model
const formSchema = z.object({
  memberId: z.string().min(1, { message: 'Please select a member.' }),
  checkInTime: z.date(),
  checkOutTime: z.date().optional().nullable(),
  checkingOut: z.boolean().default(false),
});

// Sample member data - would come from API in a real app
const members = [
  { id: 'MEM001', name: 'Rahul Kumar' },
  { id: 'MEM002', name: 'Priya Singh' },
  { id: 'MEM003', name: 'Amit Patel' },
  { id: 'MEM004', name: 'Neha Sharma' },
  { id: 'MEM005', name: 'Vikram Joshi' },
];

export default function ManualCheckInForm({ onSuccess, onCancel }: ManualCheckInFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      memberId: '',
      checkInTime: new Date(),
      checkOutTime: null,
      checkingOut: false,
    },
  });

  const checkingOut = form.watch('checkingOut');

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log('Attendance submitted:', values);
    // In a real app, this would make an API call to record attendance
    
    const memberName = members.find(m => m.id === values.memberId)?.name;
    
    // Show success notification
    if (values.checkingOut) {
      toast.success('Member checked out successfully!', {
        description: `${memberName} checked out at ${format(values.checkOutTime || new Date(), 'h:mm a')}`,
      });
    } else {
      toast.success('Member checked in successfully!', {
        description: `${memberName} checked in at ${format(values.checkInTime, 'h:mm a')}`,
      });
    }
    
    onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="memberId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Member</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a member" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {members.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name} ({member.id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="checkingOut"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Check-out instead of check-in
                </FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={checkingOut ? "checkOutTime" : "checkInTime"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{checkingOut ? "Check-out Time" : "Check-in Time"}</FormLabel>
              <div className="flex items-center space-x-4">
                <div className="relative grow">
                  <ClockIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="time"
                    className="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={format(field.value || new Date(), 'HH:mm')}
                    onChange={(e) => {
                      const [hours, minutes] = e.target.value.split(':').map(Number);
                      const date = new Date();
                      date.setHours(hours, minutes, 0);
                      field.onChange(date);
                    }}
                  />
                </div>
                <span className="text-sm text-muted-foreground">{format(new Date(), 'dd MMM yyyy')}</span>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4 pt-4">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {checkingOut ? "Record Check-out" : "Record Check-in"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
