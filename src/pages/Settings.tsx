
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings as SettingsIcon, User } from 'lucide-react';

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="container mx-auto px-4 lg:px-6 pt-8 pb-12">
          <div className="space-y-2 mb-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-gray-500 to-gray-600 flex items-center justify-center">
                <SettingsIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-1">
                  Settings
                </h1>
                <p className="text-gray-400 text-sm lg:text-base">
                  Configure your account and application preferences
                </p>
              </div>
            </div>
          </div>

          <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-white">Account Settings</CardTitle>
              <CardDescription className="text-gray-400">
                Manage your profile and security settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <User className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">Settings panel</p>
                <p className="text-gray-500 text-sm mt-2">Configure your preferences</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
