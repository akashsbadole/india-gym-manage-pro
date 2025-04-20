
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
import { showNotification } from '@/utils/notifications';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AddMemberFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

// Form validation schema aligned with Supabase Member model
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
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [locations, setLocations] = React.useState<any[]>([]);
  const [memberships, setMemberships] = React.useState<any[]>([]);

  // Fetch gym locations and memberships on component mount
  React.useEffect(() => {
    const fetchData = async () => {
      // Fetch gym locations
      const { data: locationsData, error: locationsError } = await supabase
        .from('gym_locations')
        .select('id, name');
      
      if (locationsError) {
        console.error('Error fetching gym locations:', locationsError);
        toast({
          title: 'Error fetching gym locations',
          description: locationsError.message,
          variant: 'destructive',
        });
      } else {
        setLocations(locationsData || []);
      }

      // Fetch memberships
      const { data: membershipsData, error: membershipsError } = await supabase
        .from('memberships')
        .select('id, name, price');
      
      if (membershipsError) {
        console.error('Error fetching memberships:', membershipsError);
        toast({
          title: 'Error fetching memberships',
          description: membershipsError.message,
          variant: 'destructive',
        });
      } else {
        setMemberships(membershipsData || []);
      }
    };

    fetchData();
  }, [toast]);

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
    setIsSubmitting(true);
    
    try {
      // Get current user
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        throw new Error('You must be logged in to add a member');
      }
      
      // Parse the date of birth properly
      const dateOfBirth = values.dateOfBirth ? new Date(values.dateOfBirth).toISOString() : null;

      // Create member in database
      const { data: member, error } = await supabase
        .from('members')
        .insert({
          name: values.name,
          email: values.email || null,
          phone: values.phone,
          address: values.address || null,
          date_of_birth: dateOfBirth,
          gender: values.gender || null,
          emergency_contact: values.emergencyContact || null,
          active: values.active,
          gym_location_id: values.gymLocationId,
          created_by: session.user.id
        })
        .select('id')
        .single();
      
      if (error) {
        throw error;
      }

      // Create membership enrollment
      if (member) {
        const { error: enrollmentError } = await supabase
          .from('membership_enrollments')
          .insert({
            member_id: member.id,
            membership_id: values.membershipId,
            start_date: new Date().toISOString(),
            end_date: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
            status: 'ACTIVE'
          });
        
        if (enrollmentError) {
          throw enrollmentError;
        }
      }
      
      showNotification(
        'Member added successfully!',
        'success',
        {
          description: `${values.name} has been added to the system.`
        }
      );
      
      onSuccess();
    } catch (error: any) {
      console.error('Error creating member:', error);
      showNotification(
        'Failed to add member',
        'error',
        {
          description: error.message || 'There was an error saving the member data. Please try again.'
        }
      );
    } finally {
      setIsSubmitting(false);
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
                        {locations.length > 0 ? (
                          locations.map((location) => (
                            <SelectItem key={location.id} value={location.id}>
                              {location.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="loading" disabled>Loading locations...</SelectItem>
                        )}
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
                        {memberships.length > 0 ? (
                          memberships.map((membership) => (
                            <SelectItem key={membership.id} value={membership.id}>
                              {membership.name} - ₹{membership.price}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="loading" disabled>Loading memberships...</SelectItem>
                        )}
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
              <Button variant="outline" onClick={onClose} type="button">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Adding...' : 'Add Member'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberForm;
