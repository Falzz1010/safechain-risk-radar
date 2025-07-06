
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
    <Sidebar className="border-r border-gray-700/50 bg-gray-800/40 backdrop-blur-md">
      <SidebarHeader className="p-4 border-b border-gray-700/50">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
            <Shield className="h-4 w-4 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-bold text-white">SafeChain</h2>
              <p className="text-xs text-gray-400">Security Platform</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-300 text-xs font-medium uppercase tracking-wider">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link 
                      to={item.url}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-gray-700/50"
                    >
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-300 text-xs font-medium uppercase tracking-wider">
            Security
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {securityMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link 
                      to={item.url}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-gray-700/50"
                    >
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-300 text-xs font-medium uppercase tracking-wider">
            Settings
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link 
                      to={item.url}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-gray-700/50"
                    >
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span>{item.title}</span>}
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
