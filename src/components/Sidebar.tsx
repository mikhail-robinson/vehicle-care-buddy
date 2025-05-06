
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Car, Clock, Settings, Info } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: Car },
    { name: 'Service History', path: '/history', icon: Clock },
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Help', path: '/help', icon: Info },
  ];

  return (
    <ShadcnSidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <Car className="h-6 w-6 text-dashboard-accent" />
          <h2 className="text-lg font-semibold">Vehicle Care</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton asChild isActive={isActive(item.path)}>
                <Link to={item.path} className="flex items-center gap-2">
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="text-sm text-gray-500">
          Vehicle Care Buddy v1.0
        </div>
      </SidebarFooter>
    </ShadcnSidebar>
  );
};

export default Sidebar;
