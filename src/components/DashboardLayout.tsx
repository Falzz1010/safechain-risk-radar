
import React from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <AppSidebar />
        <SidebarInset className="flex-1 min-w-0">
          {/* Mobile header with sidebar trigger */}
          <div className="sticky top-0 z-10 flex h-12 md:h-16 items-center gap-2 border-b border-gray-700/50 bg-gray-900/80 backdrop-blur-sm px-4 md:hidden">
            <SidebarTrigger className="h-8 w-8 text-white hover:bg-gray-700/50" />
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <div className="h-3 w-3 bg-white rounded-sm"></div>
              </div>
              <span className="text-white font-semibold text-sm">SafeChain</span>
            </div>
          </div>
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
