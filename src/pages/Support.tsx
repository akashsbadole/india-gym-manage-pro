
import React, { useState } from 'react';
import { 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  Mail, 
  ExternalLink,
  FileText,
  Search,
  ChevronRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import CreateTicketForm from '@/components/support/CreateTicketForm';
import { toast } from 'sonner';

const Support = () => {
  const [activeTab, setActiveTab] = useState('help');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateTicketForm, setShowCreateTicketForm] = useState(false);

  // Sample FAQ data
  const faqs = [
    {
      id: '1',
      question: 'How do I add a new member?',
      answer: 'Go to the Members page and click on "Add New Member". Fill in the required details and click Save.',
      category: 'members',
    },
    {
      id: '2',
      question: 'How can I generate a payment receipt?',
      answer: 'Navigate to the Payments page, find the payment you want to receipt for, and click on the "Generate Receipt" option.',
      category: 'payments',
    },
    {
      id: '3',
      question: 'How do I set up automatic payment reminders?',
      answer: 'Go to Settings > Notifications > Payment Reminders and configure your preferred reminder schedule.',
      category: 'payments',
    },
    {
      id: '4',
      question: 'Can I manage multiple gym locations?',
      answer: 'Yes! MyGymWebApp supports multiple locations. Navigate to Locations page to add and manage different branches.',
      category: 'locations',
    },
    {
      id: '5',
      question: 'How do I track member attendance?',
      answer: 'Use the Attendance page to check members in and out, or enable the QR code check-in feature in Settings.',
      category: 'attendance',
    },
  ];

  // Sample ticket data
  const tickets = [
    {
      id: 'TIC001',
      subject: 'Cannot generate monthly report',
      description: 'When I try to generate the monthly revenue report, the page shows an error.',
      status: 'OPEN',
      priority: 'High',
      createdAt: '2025-04-14T10:30:00',
      lastUpdated: '2025-04-14T14:45:00',
      assignedTo: 'Support Team',
    },
    {
      id: 'TIC002',
      subject: 'Need help with membership renewal',
      description: 'How do I set up automatic renewal for premium members?',
      status: 'IN_PROGRESS',
      priority: 'Medium',
      createdAt: '2025-04-12T16:20:00',
      lastUpdated: '2025-04-15T11:15:00',
      assignedTo: 'Raj Kumar',
    },
    {
      id: 'TIC003',
      subject: 'Payment gateway integration issue',
      description: 'Unable to connect to the payment gateway for online payments.',
      status: 'RESOLVED',
      priority: 'High',
      createdAt: '2025-04-10T09:45:00',
      lastUpdated: '2025-04-13T13:20:00',
      assignedTo: 'Tech Support',
    },
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTickets = tickets.filter(ticket =>
    ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'OPEN':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Open</Badge>;
      case 'IN_PROGRESS':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case 'RESOLVED':
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>;
      case 'CLOSED':
        return <Badge variant="outline">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const submitContactForm = (e) => {
    e.preventDefault();
    toast.success('Message sent successfully!', {
      description: 'Our support team will get back to you within 24 hours.',
    });
    // Reset form (in a real app)
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Support</h2>
          <p className="text-muted-foreground">
            Get help with using MyGymWebApp and manage support tickets.
          </p>
        </div>
        <Button className="w-full sm:w-auto" onClick={() => setShowCreateTicketForm(true)}>
          <MessageSquare className="mr-2 h-4 w-4" />
          Create Support Ticket
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-1">
        <div className="flex space-x-1 overflow-x-auto">
          <Button 
            variant={activeTab === 'help' ? 'default' : 'ghost'} 
            onClick={() => setActiveTab('help')}
            className="rounded-md"
          >
            <HelpCircle className="mr-2 h-4 w-4" />
            Help Center
          </Button>
          <Button 
            variant={activeTab === 'tickets' ? 'default' : 'ghost'} 
            onClick={() => setActiveTab('tickets')}
            className="rounded-md"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            My Tickets
          </Button>
          <Button 
            variant={activeTab === 'contact' ? 'default' : 'ghost'} 
            onClick={() => setActiveTab('contact')}
            className="rounded-md"
          >
            <Phone className="mr-2 h-4 w-4" />
            Contact Us
          </Button>
        </div>
      </div>

      <div className="relative w-full">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={activeTab === 'help' ? "Search help articles..." : "Search your tickets..."}
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

      {activeTab === 'help' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:border-orange-200 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-orange-500" />
                  Member Management
                </CardTitle>
                <CardDescription>
                  Learn about adding, editing and managing members
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="ghost" className="w-full justify-between">
                  <span>View Articles</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="cursor-pointer hover:border-orange-200 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-orange-500" />
                  Payments & Billing
                </CardTitle>
                <CardDescription>
                  Guides for payment processing and financial reports
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="ghost" className="w-full justify-between">
                  <span>View Articles</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="cursor-pointer hover:border-orange-200 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-orange-500" />
                  Attendance & Check-ins
                </CardTitle>
                <CardDescription>
                  Help with tracking member attendance and check-ins
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="ghost" className="w-full justify-between">
                  <span>View Articles</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>

          <h3 className="text-xl font-semibold mt-8">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <Card key={faq.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-start">
                      <HelpCircle className="h-5 w-5 mr-2 text-orange-500 shrink-0 mt-0.5" />
                      <span>{faq.question}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="ml-7 text-muted-foreground">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <Search className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-4 text-lg font-medium">No results found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search query or browse all help articles.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'tickets' && (
        <div className="space-y-4">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <Card key={ticket.id} className="hover:border-orange-200 transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-start">
                        {ticket.status === 'OPEN' && <AlertCircle className="h-5 w-5 mr-2 text-yellow-500 shrink-0 mt-0.5" />}
                        {ticket.status === 'IN_PROGRESS' && <Clock className="h-5 w-5 mr-2 text-blue-500 shrink-0 mt-0.5" />}
                        {ticket.status === 'RESOLVED' && <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 shrink-0 mt-0.5" />}
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{ticket.subject}</h4>
                            {getStatusBadge(ticket.status)}
                            <span className="text-xs text-muted-foreground">#{ticket.id}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{ticket.description}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Created: </span>
                          {formatDate(ticket.createdAt)}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Last Updated: </span>
                          {formatDate(ticket.lastUpdated)}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Assigned To: </span>
                          {ticket.assignedTo}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Priority: </span>
                          <span className={ticket.priority === 'High' ? 'text-red-600' : 'text-blue-600'}>
                            {ticket.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex md:flex-col gap-2">
                      <Button className="flex-1 md:w-full" size="sm">View Details</Button>
                      {ticket.status !== 'RESOLVED' && 
                        <Button variant="outline" className="flex-1 md:w-full" size="sm">Update</Button>
                      }
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <h3 className="mt-4 text-lg font-medium">No tickets found</h3>
              <p className="text-muted-foreground">
                You don't have any support tickets matching your search.
              </p>
              <Button className="mt-4" onClick={() => setShowCreateTicketForm(true)}>Create a New Ticket</Button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'contact' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>
                Fill out the form below to get in touch with our support team.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={submitContactForm}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Name</label>
                    <Input placeholder="Enter your name" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input type="email" placeholder="Enter your email" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input placeholder="Enter message subject" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <textarea 
                    className="w-full h-32 px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Describe your issue or question"
                    required
                  ></textarea>
                </div>
                <Button type="submit" className="w-full md:w-auto">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Reach out to us directly using the following contact methods.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Phone Support</h4>
                  <p className="text-sm text-muted-foreground">+91 123 456 7890</p>
                  <p className="text-xs text-muted-foreground">Mon-Fri, 9 AM to 6 PM IST</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Email Support</h4>
                  <p className="text-sm text-muted-foreground">support@mygymwebapp.com</p>
                  <p className="text-xs text-muted-foreground">24/7 response within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MessageSquare className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Live Chat</h4>
                  <p className="text-sm text-muted-foreground">Available in your dashboard</p>
                  <p className="text-xs text-muted-foreground">Mon-Fri, 10 AM to 5 PM IST</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <ExternalLink className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Knowledge Base</h4>
                  <p className="text-sm text-muted-foreground">Visit our help center</p>
                  <p className="text-xs text-muted-foreground">Comprehensive guides & tutorials</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Dialog open={showCreateTicketForm} onOpenChange={setShowCreateTicketForm}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Support Ticket</DialogTitle>
            <DialogDescription>
              Submit a ticket to our support team for assistance.
            </DialogDescription>
          </DialogHeader>
          <CreateTicketForm 
            onSuccess={() => setShowCreateTicketForm(false)}
            onCancel={() => setShowCreateTicketForm(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Support;
