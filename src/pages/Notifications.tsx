
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Settings } from 'lucide-react';

const Notifications = () => {
  return (
    <DashboardLayout>
      <div className="space-y-4 md:space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center">
            <Bell className="h-4 w-4 md:h-5 md:w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">
              Notifications
            </h1>
            <p className="text-gray-400 text-sm md:text-base">
              Manage your notification preferences and alerts
            </p>
          </div>
        </div>

        <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">Notification Center</CardTitle>
            <CardDescription className="text-gray-400">
              Configure and manage your notification settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 md:py-12">
              <Settings className="h-12 w-12 md:h-16 md:w-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No new notifications</p>
              <p className="text-gray-500 text-sm mt-2">All caught up!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
