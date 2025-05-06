
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
            {children}
          </main>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};

export default Layout;
