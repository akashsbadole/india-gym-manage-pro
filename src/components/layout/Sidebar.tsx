
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Users, 
  CreditCard, 
  CalendarClock, 
  BarChart3, 
  Building2, 
  Bell, 
  HelpCircle, 
  Settings,
  Dumbbell
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Sidebar = () => {
  const isMobile = useIsMobile();
  
  if (isMobile) return null;
  
  return (
    <aside className="w-64 border-r border-gray-200 bg-white h-screen hidden md:block">
      <div className="flex flex-col h-full">
        <div className="flex items-center h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Dumbbell className="h-7 w-7 text-orange-600" />
            <span className="text-lg font-bold text-gray-900">MyGymWebApp</span>
          </div>
        </div>
        
        <nav className="flex-1 pt-5 pb-4 px-4 space-y-1 overflow-y-auto">
          <NavItem to="/" icon={<Home className="h-5 w-5" />} title="Dashboard" />
          <NavItem to="/members" icon={<Users className="h-5 w-5" />} title="Members" />
          <NavItem to="/payments" icon={<CreditCard className="h-5 w-5" />} title="Payments" />
          <NavItem to="/attendance" icon={<CalendarClock className="h-5 w-5" />} title="Attendance" />
          <NavItem to="/reports" icon={<BarChart3 className="h-5 w-5" />} title="Reports" />
          <NavItem to="/locations" icon={<Building2 className="h-5 w-5" />} title="Locations" />
          <NavItem to="/notifications" icon={<Bell className="h-5 w-5" />} title="Notifications" />
          
          <div className="mt-8 pt-4 border-t border-gray-200">
            <NavItem to="/support" icon={<HelpCircle className="h-5 w-5" />} title="Support" />
            <NavItem to="/settings" icon={<Settings className="h-5 w-5" />} title="Settings" />
          </div>
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <div className="bg-orange-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-orange-800">Pro Plan</p>
            <p className="text-xs text-orange-600 mt-1">Access all premium features</p>
            <button className="mt-2 w-full text-xs bg-orange-600 text-white py-1.5 rounded-md hover:bg-orange-700 transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

const NavItem = ({ to, icon, title }: { to: string; icon: React.ReactNode; title: string }) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => cn(
        "flex items-center space-x-2 px-3 py-2.5 rounded-lg text-sm transition-colors",
        isActive 
          ? "bg-orange-50 text-orange-700 font-medium" 
          : "text-gray-700 hover:bg-gray-100"
      )}
    >
      {icon}
      <span>{title}</span>
    </NavLink>
  );
};

export default Sidebar;
