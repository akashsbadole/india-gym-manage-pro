import React, { useState } from 'react';
import { 
  LifeBuoy, 
  MessageSquare, 
  PlusCircle, 
  Search, 
  HelpCircle,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Mail,
  Send,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import CreateTicketForm from '@/components/support/CreateTicketForm';
import { showNotification } from '@/utils/notifications';

const Support = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateTicketForm, setShowCreateTicketForm] = useState(false);

  const faqs = [
    {
      id: '1',
      question: 'How do I update my membership plan?',
      answer: 'You can update your membership plan by visiting the Memberships section in your account settings. Choose the plan you want to switch to and follow the on-screen instructions.'
    },
    {
      id: '2',
      question: 'What are the gym operating hours?',
      answer: 'Our gym is open from 5:00 AM to 11:00 PM on weekdays, and 6:00 AM to 10:00 PM on weekends and holidays.'
    },
    {
      id: '3',
      question: 'How do I book a personal trainer?',
      answer: 'You can book a personal trainer through the Services section on our website or app. Choose your preferred trainer, select available time slots, and proceed with the booking.'
    },
    {
      id: '4',
      question: 'Can I freeze my membership temporarily?',
      answer: 'Yes, you can freeze your membership for up to 3 months per year. Contact our customer support or visit the membership section to freeze your membership.'
    },
    {
      id: '5',
      question: 'How do I cancel my membership?',
      answer: 'To cancel your membership, please visit our gym in person or send a cancellation request through the contact form. Note that a 30-day notice is required for cancellation.'
    },
  ];

  const tickets = [
    {
      id: 'TIC001',
      subject: 'Payment not processed',
      status: 'OPEN',
      priority: 'HIGH',
      createdAt: '2025-04-10T10:30:00',
      assignedTo: 'Amit Sharma',
    },
    {
      id: 'TIC002',
      subject: 'Unable to book fitness class',
      status: 'IN_PROGRESS',
      priority: 'MEDIUM',
      createdAt: '2025-04-12T14:15:00',
      assignedTo: 'Neha Patel',
    },
    {
      id: 'TIC003',
      subject: 'Membership card not working',
      status: 'RESOLVED',
      priority: 'HIGH',
      createdAt: '2025-04-08T09:20:00',
      assignedTo: 'Rahul Verma',
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'OPEN':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Open</Badge>;
      case 'IN_PROGRESS':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case 'RESOLVED':
        return <Badge variant="success">Resolved</Badge>;
      case 'CLOSED':
        return <Badge variant="outline">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'HIGH':
        return <Badge variant="destructive">High</Badge>;
      case 'MEDIUM':
        return <Badge variant="outline" className="bg-orange-100 text-orange-800">Medium</Badge>;
      case 'LOW':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const submitContactForm = (e) => {
    e.preventDefault();
    showNotification(
      'Message sent successfully!',
      'success',
      {
        description: 'Our support team will get back to you within 24 hours.',
      }
    );
    // Reset form (in a real app)
  };

  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Support</h2>
          <p className="text-muted-foreground">
            Get help with your account, membership, or gym facilities.
          </p>
        </div>
        <Button className="w-full sm:w-auto" onClick={() => setShowCreateTicketForm(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Support Ticket
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-3 md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Your Support Tickets
              </CardTitle>
              <CardDescription>
                Track and manage your support requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              {tickets.length > 0 ? (
                <div className="space-y-4">
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{ticket.subject}</span>
                          {getPriorityBadge(ticket.priority)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Ticket #{ticket.id} • Created on {formatDate(ticket.createdAt)}
                        </div>
                        <div className="text-sm">
                          Assigned to: {ticket.assignedTo}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                        {getStatusBadge(ticket.status)}
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">No support tickets</h3>
                  <p className="text-muted-foreground">
                    You don't have any active support tickets.
                  </p>
                  <Button className="mt-4" onClick={() => setShowCreateTicketForm(true)}>
                    Create a Ticket
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="mr-2 h-5 w-5" />
                Help Center
              </CardTitle>
              <CardDescription>
                Frequently asked questions and answers
              </CardDescription>
              <div className="relative mt-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search FAQs..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-9 w-9"
                    onClick={() => setSearchQuery('')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {filteredFaqs.length > 0 ? (
                <div className="space-y-4">
                  {filteredFaqs.map((faq) => (
                    <div key={faq.id} className="border rounded-lg overflow-hidden">
                      <button
                        className="flex items-center justify-between w-full p-4 text-left font-medium"
                        onClick={() => toggleFaq(faq.id)}
                      >
                        <span>{faq.question}</span>
                        {expandedFaq === faq.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                      {expandedFaq === faq.id && (
                        <div className="p-4 pt-0 text-sm text-muted-foreground">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">No results found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search query.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="col-span-3 md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LifeBuoy className="mr-2 h-5 w-5" />
                Contact Support
              </CardTitle>
              <CardDescription>
                Get in touch with our support team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={submitContactForm} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <div className="relative">
                    <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Your name" className="pl-8" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Your email" className="pl-8" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <textarea 
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                    placeholder="How can we help you?"
                  />
                </div>
                <Button type="submit" className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t space-y-4">
                <div className="flex items-start space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Response Time</p>
                    <p className="text-xs text-muted-foreground">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Support Hours</p>
                    <p className="text-xs text-muted-foreground">
                      Monday to Friday: 9 AM - 6 PM
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Emergency Support</p>
                    <p className="text-xs text-muted-foreground">
                      Call +91 98765 43210 for urgent issues
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showCreateTicketForm} onOpenChange={setShowCreateTicketForm}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Support Ticket</DialogTitle>
            <DialogDescription>
              Submit a new support ticket to get help from our team.
            </DialogDescription>
          </DialogHeader>
          <CreateTicketForm 
            onSuccess={() => {
              setShowCreateTicketForm(false);
              showNotification(
                'Support ticket created!',
                'success',
                {
                  description: 'We will respond to your ticket as soon as possible.',
                }
              );
            }}
            onCancel={() => setShowCreateTicketForm(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Support;
