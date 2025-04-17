import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, AlertCircle } from 'lucide-react';
import { showNotification } from '@/utils/notifications';
import mockPrisma from '@/lib/browser-prisma';

// Form props interface
interface CreateTicketFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

// Form validation schema based on the Prisma Inquiry model
const formSchema = z.object({
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  priority: z.enum(['Low', 'Medium', 'High']),
  memberId: z.string().optional(),
});

// Sample member data - would come from API in a real app
const members = [
  { id: 'MEM001', name: 'Rahul Kumar' },
  { id: 'MEM002', name: 'Priya Singh' },
  { id: 'MEM003', name: 'Amit Patel' },
  { id: 'MEM004', name: 'Neha Sharma' },
  { id: 'MEM005', name: 'Vikram Joshi' },
];

export default function CreateTicketForm({ onSuccess, onCancel }: CreateTicketFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: '',
      description: '',
      priority: 'Medium',
      memberId: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('Support ticket submitted:', values);
    
    try {
      // Convert priority to the correct enum value for Prisma
      const priorityMap: Record<string, 'LOW' | 'MEDIUM' | 'HIGH'> = {
        'Low': 'LOW',
        'Medium': 'MEDIUM',
        'High': 'HIGH',
      };
      
      // Create the support ticket in database
      const ticket = await mockPrisma.supportTicket.create({
        data: {
          subject: values.subject,
          description: values.description,
          priority: priorityMap[values.priority],
          memberId: values.memberId === 'none' ? null : values.memberId,
          status: 'OPEN',
        },
      });
      
      // Show success notification
      showNotification(
        'Support ticket created!', 
        'success',
        {
          description: `Ticket #${typeof ticket.id === 'string' ? ticket.id.substring(0, 8) : 'MOCK'} has been created.`,
        }
      );
      
      onSuccess();
    } catch (error) {
      console.error('Error creating support ticket:', error);
      showNotification(
        'Failed to create ticket', 
        'error',
        {
          description: 'There was an error saving your support ticket. Please try again.',
        }
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="Brief description of the issue" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <textarea 
                  className="flex min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                  placeholder="Detailed description of your issue"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="memberId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Related Member (Optional)</FormLabel>
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
                    <SelectItem value="none">None</SelectItem>
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
        </div>

        <div className="bg-orange-50 p-4 rounded-md border border-orange-200">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-orange-800">Response Time</h4>
              <p className="text-sm text-orange-700">
                Our support team typically responds within 24 hours. High priority tickets will be addressed more quickly.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            <MessageSquare className="mr-2 h-4 w-4" />
            Submit Ticket
          </Button>
        </div>
      </form>
    </Form>
  );
}
