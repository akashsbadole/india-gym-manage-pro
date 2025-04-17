
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import prisma from '@/lib/prisma';
import { showNotification } from '@/utils/notifications';

interface AddMemberFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

// Form validation schema aligned with Prisma Member model
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }).optional().or(z.literal('')),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }),
  address: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  emergencyContact: z.string().optional(),
  gymLocationId: z.string({ required_error: 'Please select a gym location.' }),
  active: z.boolean().default(true),
  membershipId: z.string({ required_error: 'Please select a membership plan.' }),
});

const AddMemberForm: React.FC<AddMemberFormProps> = ({ onClose, onSuccess }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      dateOfBirth: '',
      gender: '',
      emergencyContact: '',
      active: true,
      gymLocationId: '',
      membershipId: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('Form submitted:', values);
    
    try {
      // Parse the date of birth properly
      const dateOfBirth = values.dateOfBirth ? new Date(values.dateOfBirth) : undefined;
      
      // Create user in database
      const member = await prisma.member.create({
        data: {
          name: values.name,
          email: values.email || null,
          phone: values.phone,
          address: values.address || null,
          dateOfBirth: dateOfBirth,
          gender: values.gender || null,
          emergencyContact: values.emergencyContact || null,
          active: values.active,
          gymLocation: {
            connect: { id: values.gymLocationId }
          },
          createdBy: {
            // Assuming a default user for now, in a real app this would be the logged-in user
            connect: { id: 'USR001' }
          },
          memberships: {
            connect: { id: values.membershipId }
          }
        },
      });
      
      showNotification(
        'Member added successfully!',
        'success',
        {
          description: `${values.name} has been added to the system.`
        }
      );
      
      onSuccess();
    } catch (error) {
      console.error('Error creating member:', error);
      showNotification(
        'Failed to add member',
        'error',
        {
          description: 'There was an error saving the member data. Please try again.'
        }
      );
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Member</DialogTitle>
          <DialogDescription>
            Enter the details of the new member. All fields marked with * are required.
          </DialogDescription>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="+91 9876543210" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="example@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="emergencyContact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emergency Contact</FormLabel>
                    <FormControl>
                      <Input placeholder="Emergency contact number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gymLocationId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gym Location *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gym location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="loc1">Mumbai Central</SelectItem>
                        <SelectItem value="loc2">Delhi Heights</SelectItem>
                        <SelectItem value="loc3">Bangalore East</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="membershipId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Membership Plan *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select membership plan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="mem1">Basic - ₹1,999/month</SelectItem>
                        <SelectItem value="mem2">Premium - ₹4,999/month</SelectItem>
                        <SelectItem value="mem3">VIP - ₹9,999/month</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Active Member</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Mark this member as active to allow gym access
                    </p>
                  </div>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Add Member</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberForm;
