
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Bell, Mail, Smartphone, AlertTriangle, Shield, Activity, Settings as SettingsIcon } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useToast } from '@/hooks/use-toast';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  category: string;
  email: boolean;
  push: boolean;
  sms: boolean;
}

export default function Notifications() {
  const { toast } = useToast();
  const [emailAddress, setEmailAddress] = useState('user@example.com');
  const [phoneNumber, setPhoneNumber] = useState('+1234567890');
  
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: '1',
      title: 'Security Alerts',
      description: 'Critical security threats and vulnerabilities',
      category: 'Security',
      email: true,
      push: true,
      sms: true
    },
    {
      id: '2',
      title: 'Audit Completion',
      description: 'Smart contract audit results',
      category: 'Audit',
      email: true,
      push: true,
      sms: false
    },
    {
      id: '3',
      title: 'Wallet Activity',
      description: 'Suspicious wallet transactions',
      category: 'Monitoring',
      email: true,
      push: false,
      sms: false
    },
    {
      id: '4',
      title: 'Weekly Reports',
      description: 'Weekly security summary reports',
      category: 'Reports',
      email: true,
      push: false,
      sms: false
    },
    {
      id: '5',
      title: 'System Updates',
      description: 'Platform updates and maintenance',
      category: 'System',
      email: false,
      push: true,
      sms: false
    }
  ]);

  const updateSetting = (id: string, type: 'email' | 'push' | 'sms', value: boolean) => {
    setSettings(prev => prev.map(setting => 
      setting.id === id ? { ...setting, [type]: value } : setting
    ));
    
    toast({
      title: "✅ Updated",
      description: "Notification preferences saved",
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Security': return <Shield className="h-5 w-5 text-red-400" />;
      case 'Audit': return <AlertTriangle className="h-5 w-5 text-orange-400" />;
      case 'Monitoring': return <Activity className="h-5 w-5 text-blue-400" />;
      case 'Reports': return <Mail className="h-5 w-5 text-green-400" />;
      case 'System': return <SettingsIcon className="h-5 w-5 text-purple-400" />;
      default: return <Bell className="h-5 w-5 text-gray-400" />;
    }
  };

  const saveContactInfo = () => {
    toast({
      title: "✅ Saved",
      description: "Contact information updated successfully",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 lg:px-6 pt-20 sm:pt-24 pb-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <Bell className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-white">Notification Settings</h1>
                <p className="text-gray-400">Manage how you receive security alerts and updates</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contact Information
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Update your contact details for notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Email Address</label>
                  <Input
                    type="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className="bg-gray-900/50 border-gray-600 text-gray-100"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Phone Number</label>
                  <Input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="bg-gray-900/50 border-gray-600 text-gray-100"
                  />
                </div>
                
                <Button 
                  onClick={saveContactInfo}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                >
                  Save Contact Info
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50 mt-6">
              <CardHeader>
                <CardTitle className="text-white text-sm">Notification Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Email Notifications</span>
                  <span className="text-white">{settings.filter(s => s.email).length}/{settings.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Push Notifications</span>
                  <span className="text-white">{settings.filter(s => s.push).length}/{settings.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">SMS Notifications</span>
                  <span className="text-white">{settings.filter(s => s.sms).length}/{settings.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notification Preferences */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Notification Preferences</CardTitle>
                <CardDescription className="text-gray-400">
                  Choose how you want to receive different types of notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Header Row */}
                  <div className="grid grid-cols-12 gap-4 pb-2 border-b border-gray-700/50">
                    <div className="col-span-6">
                      <h3 className="text-sm font-medium text-gray-300">Notification Type</h3>
                    </div>
                    <div className="col-span-2 text-center">
                      <Mail className="h-4 w-4 text-gray-400 mx-auto mb-1" />
                      <span className="text-xs text-gray-400">Email</span>
                    </div>
                    <div className="col-span-2 text-center">
                      <Bell className="h-4 w-4 text-gray-400 mx-auto mb-1" />
                      <span className="text-xs text-gray-400">Push</span>
                    </div>
                    <div className="col-span-2 text-center">
                      <Smartphone className="h-4 w-4 text-gray-400 mx-auto mb-1" />
                      <span className="text-xs text-gray-400">SMS</span>
                    </div>
                  </div>

                  {/* Settings Rows */}
                  {settings.map((setting) => (
                    <div key={setting.id} className="grid grid-cols-12 gap-4 items-center py-3 border-b border-gray-700/30 last:border-b-0">
                      <div className="col-span-6">
                        <div className="flex items-center gap-3">
                          {getCategoryIcon(setting.category)}
                          <div>
                            <h4 className="text-white font-medium">{setting.title}</h4>
                            <p className="text-sm text-gray-400">{setting.description}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-span-2 flex justify-center">
                        <Switch
                          checked={setting.email}
                          onCheckedChange={(checked) => updateSetting(setting.id, 'email', checked)}
                        />
                      </div>
                      
                      <div className="col-span-2 flex justify-center">
                        <Switch
                          checked={setting.push}
                          onCheckedChange={(checked) => updateSetting(setting.id, 'push', checked)}
                        />
                      </div>
                      
                      <div className="col-span-2 flex justify-center">
                        <Switch
                          checked={setting.sms}
                          onCheckedChange={(checked) => updateSetting(setting.id, 'sms', checked)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
