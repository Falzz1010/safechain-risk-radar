
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings as SettingsIcon, User, Shield, Palette, Database, Download, Upload } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useToast } from '@/hooks/use-toast';

export default function Settings() {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    company: 'Tech Corp',
    bio: 'Security enthusiast and blockchain developer'
  });

  const [preferences, setPreferences] = useState({
    darkMode: true,
    autoRefresh: true,
    soundAlerts: false,
    compactView: false,
    showRiskScores: true
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    sessionTimeout: '30',
    ipWhitelist: '',
    apiAccess: false
  });

  const saveProfile = () => {
    toast({
      title: "✅ Profile Updated",
      description: "Your profile information has been saved",
    });
  };

  const savePreferences = () => {
    toast({
      title: "✅ Preferences Saved",
      description: "Your preferences have been updated",
    });
  };

  const saveSecurity = () => {
    toast({
      title: "✅ Security Updated",
      description: "Your security settings have been saved",
    });
  };

  const exportData = () => {
    toast({
      title: "📁 Export Started",
      description: "Your data export will be ready shortly",
    });
  };

  const importData = () => {
    toast({
      title: "📁 Import Started",
      description: "Your data is being imported",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 lg:px-6 pt-20 sm:pt-24 pb-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-gray-600 to-gray-700 flex items-center justify-center">
                <SettingsIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-white">Settings</h1>
                <p className="text-gray-400">Manage your account and application preferences</p>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800/40 backdrop-blur-sm border-gray-700/50 p-1 rounded-lg">
            <TabsTrigger value="profile" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700/50">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="preferences" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700/50">
              <Palette className="h-4 w-4 mr-2" />
              Preferences
            </TabsTrigger>
            <TabsTrigger value="security" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700/50">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="data" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700/50">
              <Database className="h-4 w-4 mr-2" />
              Data
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Profile Information</CardTitle>
                <CardDescription className="text-gray-400">
                  Update your personal information and account details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Full Name</label>
                    <Input
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      className="bg-gray-900/50 border-gray-600 text-gray-100"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Email Address</label>
                    <Input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className="bg-gray-900/50 border-gray-600 text-gray-100"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Company</label>
                    <Input
                      value={profile.company}
                      onChange={(e) => setProfile({...profile, company: e.target.value})}
                      className="bg-gray-900/50 border-gray-600 text-gray-100"
                    />
                  </div>
                  
                  <div className="space-y-2 lg:col-span-2">
                    <label className="text-sm font-medium text-gray-300">Bio</label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                      className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-md text-gray-100 resize-none"
                      rows={3}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={saveProfile} className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                    Save Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Application Preferences</CardTitle>
                <CardDescription className="text-gray-400">
                  Customize your application experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-700/50 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">Dark Mode</h4>
                      <p className="text-sm text-gray-400">Use dark theme throughout the application</p>
                    </div>
                    <Switch
                      checked={preferences.darkMode}
                      onCheckedChange={(checked) => setPreferences({...preferences, darkMode: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-700/50 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">Auto Refresh</h4>
                      <p className="text-sm text-gray-400">Automatically refresh data every 30 seconds</p>
                    </div>
                    <Switch
                      checked={preferences.autoRefresh}
                      onCheckedChange={(checked) => setPreferences({...preferences, autoRefresh: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-700/50 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">Sound Alerts</h4>
                      <p className="text-sm text-gray-400">Play sounds for security alerts</p>
                    </div>
                    <Switch
                      checked={preferences.soundAlerts}
                      onCheckedChange={(checked) => setPreferences({...preferences, soundAlerts: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-700/50 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">Compact View</h4>
                      <p className="text-sm text-gray-400">Use compact layout for tables and lists</p>
                    </div>
                    <Switch
                      checked={preferences.compactView}
                      onCheckedChange={(checked) => setPreferences({...preferences, compactView: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-700/50 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">Show Risk Scores</h4>
                      <p className="text-sm text-gray-400">Display risk scores in analysis results</p>
                    </div>
                    <Switch
                      checked={preferences.showRiskScores}
                      onCheckedChange={(checked) => setPreferences({...preferences, showRiskScores: checked})}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={savePreferences} className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Security Settings</CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your account security and access controls
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-700/50 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                    </div>
                    <Switch
                      checked={security.twoFactor}
                      onCheckedChange={(checked) => setSecurity({...security, twoFactor: checked})}
                    />
                  </div>
                  
                  <div className="p-4 border border-gray-700/50 rounded-lg space-y-3">
                    <div>
                      <h4 className="text-white font-medium">Session Timeout</h4>
                      <p className="text-sm text-gray-400">Automatically sign out after inactivity (minutes)</p>
                    </div>
                    <Input
                      type="number"
                      value={security.sessionTimeout}
                      onChange={(e) => setSecurity({...security, sessionTimeout: e.target.value})}
                      className="bg-gray-900/50 border-gray-600 text-gray-100 max-w-32"
                    />
                  </div>
                  
                  <div className="p-4 border border-gray-700/50 rounded-lg space-y-3">
                    <div>
                      <h4 className="text-white font-medium">IP Whitelist</h4>
                      <p className="text-sm text-gray-400">Restrict access to specific IP addresses (comma-separated)</p>
                    </div>
                    <Input
                      value={security.ipWhitelist}
                      onChange={(e) => setSecurity({...security, ipWhitelist: e.target.value})}
                      placeholder="192.168.1.1, 10.0.0.1"
                      className="bg-gray-900/50 border-gray-600 text-gray-100"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-700/50 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">API Access</h4>
                      <p className="text-sm text-gray-400">Enable API access for third-party integrations</p>
                    </div>
                    <Switch
                      checked={security.apiAccess}
                      onCheckedChange={(checked) => setSecurity({...security, apiAccess: checked})}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={saveSecurity} className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
                    Save Security Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data">
            <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Data Management</CardTitle>
                <CardDescription className="text-gray-400">
                  Export, import, and manage your data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="p-6 border border-gray-700/50 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                      <Download className="h-6 w-6 text-blue-400" />
                      <div>
                        <h4 className="text-white font-medium">Export Data</h4>
                        <p className="text-sm text-gray-400">Download all your audit history and settings</p>
                      </div>
                    </div>
                    <Button onClick={exportData} className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                      Export All Data
                    </Button>
                  </div>
                  
                  <div className="p-6 border border-gray-700/50 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                      <Upload className="h-6 w-6 text-green-400" />
                      <div>
                        <h4 className="text-white font-medium">Import Data</h4>
                        <p className="text-sm text-gray-400">Restore data from a previous export</p>
                      </div>
                    </div>
                    <Button onClick={importData} variant="outline" className="w-full border-gray-600 text-gray-300">
                      Import Data
                    </Button>
                  </div>
                </div>
                
                <div className="p-6 border border-red-700/50 rounded-lg bg-red-900/10 space-y-4">
                  <div className="flex items-center gap-3">
                    <SettingsIcon className="h-6 w-6 text-red-400" />
                    <div>
                      <h4 className="text-red-400 font-medium">Danger Zone</h4>
                      <p className="text-sm text-gray-400">Irreversible and destructive actions</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                      Delete All Audit History
                    </Button>
                    <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
