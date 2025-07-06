
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Shield, 
  Activity, 
  Eye, 
  GraduationCap, 
  Search, 
  Settings, 
  Bell, 
  BarChart3,
  Wallet,
  AlertTriangle
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const mainMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: BarChart3 },
  { title: "Smart Contract Audit", url: "/audit", icon: Shield },
  { title: "Wallet Analyzer", url: "/analyzer", icon: Wallet },
  { title: "Visualization", url: "/visualization", icon: Activity },
  { title: "Education", url: "/education", icon: GraduationCap },
];

const securityMenuItems = [
  { title: "Security Alerts", url: "/security-alerts", icon: AlertTriangle },
  { title: "Transaction Monitor", url: "/transaction-monitor", icon: Activity },
  { title: "Threat Intelligence", url: "/threat-intelligence", icon: Eye },
];

const settingsMenuItems = [
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className="border-r border-gray-700/50 bg-gray-800/40 backdrop-blur-md w-full md:w-auto">
      <SidebarHeader className="p-3 md:p-4 border-b border-gray-700/50">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="h-6 w-6 md:h-8 md:w-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
            <Shield className="h-3 w-3 md:h-4 md:w-4 text-white" />
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <h2 className="text-base md:text-lg font-bold text-white truncate">SafeChain</h2>
              <p className="text-xs text-gray-400 truncate">Security Platform</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 md:px-0">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-300 text-xs font-medium uppercase tracking-wider px-2 md:px-0">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link 
                      to={item.url}
                      className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 md:py-2 rounded-lg transition-all duration-200 hover:bg-gray-700/50 min-h-[44px] touch-manipulation"
                    >
                      <item.icon className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                      {!isCollapsed && <span className="text-sm md:text-base truncate">{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-300 text-xs font-medium uppercase tracking-wider px-2 md:px-0">
            Security
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {securityMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link 
                      to={item.url}
                      className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 md:py-2 rounded-lg transition-all duration-200 hover:bg-gray-700/50 min-h-[44px] touch-manipulation"
                    >
                      <item.icon className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                      {!isCollapsed && <span className="text-sm md:text-base truncate">{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-300 text-xs font-medium uppercase tracking-wider px-2 md:px-0">
            Settings
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {settingsMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link 
                      to={item.url}
                      className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 md:py-2 rounded-lg transition-all duration-200 hover:bg-gray-700/50 min-h-[44px] touch-manipulation"
                    >
                      <item.icon className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                      {!isCollapsed && <span className="text-sm md:text-base truncate">{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
