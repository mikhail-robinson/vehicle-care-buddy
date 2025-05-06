
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Car, Settings } from 'lucide-react';

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 flex justify-between items-center">
      <div className="flex items-center">
        <SidebarTrigger className="mr-4 text-gray-700 hover:text-gray-900" />
        <div className="flex items-center">
          <Car className="h-6 w-6 text-dashboard-accent mr-2" />
          <h1 className="text-xl font-semibold text-gray-800">Vehicle Care Buddy</h1>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate('/settings')}
        >
          <Settings className="h-5 w-5 text-gray-600" />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
