
import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Users, 
  Phone, 
  Mail, 
  Clock, 
  PlusCircle,
  Edit,
  Trash
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Locations = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample location data
  const locations = [
    {
      id: '1',
      name: 'MyGym Central',
      address: '123 MG Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      phone: '+91 98765 43210',
      email: 'central@mygym.com',
      openingTime: '06:00',
      closingTime: '22:00',
      memberCount: 378,
      staffCount: 12,
      isMainBranch: true,
    },
    {
      id: '2',
      name: 'MyGym East',
      address: '456 Sector 21',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001',
      phone: '+91 87654 32109',
      email: 'east@mygym.com',
      openingTime: '05:30',
      closingTime: '22:30',
      memberCount: 245,
      staffCount: 8,
      isMainBranch: false,
    },
    {
      id: '3',
      name: 'MyGym South',
      address: '789 Koramangala',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560034',
      phone: '+91 76543 21098',
      email: 'south@mygym.com',
      openingTime: '06:00',
      closingTime: '23:00',
      memberCount: 412,
      staffCount: 15,
      isMainBranch: false,
    },
    {
      id: '4',
      name: 'MyGym West',
      address: '321 FC Road',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411005',
      phone: '+91 65432 10987',
      email: 'west@mygym.com',
      openingTime: '06:30',
      closingTime: '21:30',
      memberCount: 187,
      staffCount: 6,
      isMainBranch: false,
    },
  ];

  const filteredLocations = locations.filter(location => 
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Locations</h2>
          <p className="text-muted-foreground">
            Manage all your gym branches from one place.
          </p>
        </div>
        <Button className="w-full sm:w-auto">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Location
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-full sm:max-w-sm">
          <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search locations..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            All Locations
          </Button>
          <Button variant="outline" size="sm">
            Maharashtra
          </Button>
          <Button variant="outline" size="sm">
            Karnataka
          </Button>
          <Button variant="outline" size="sm">
            Delhi
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLocations.map((location) => (
          <Card key={location.id} className="overflow-hidden">
            <CardHeader className="bg-orange-50 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <span>{location.name}</span>
                    {location.isMainBranch && (
                      <Badge variant="success">Main Branch</Badge>
                    )}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {location.city}, {location.state}
                  </p>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">Members</div>
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4 text-orange-500" />
                    <span className="font-semibold">{location.memberCount}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">Staff</div>
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4 text-blue-500" />
                    <span className="font-semibold">{location.staffCount}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span className="text-sm">
                    {location.address}, {location.city}, {location.state} - {location.pincode}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{location.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{location.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {location.openingTime} - {location.closingTime}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredLocations.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
          <h3 className="mt-4 text-lg font-medium">No locations found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Locations;
