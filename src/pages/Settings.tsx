
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
  return (
    <Layout>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
          <p className="text-gray-500">Manage your application preferences</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <SettingsIcon className="h-5 w-5 text-dashboard-accent mr-2" />
                  <CardTitle>Application Settings</CardTitle>
                </div>
                <CardDescription>
                  Configure general application preferences
                </CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notifications">Maintenance Notifications</Label>
                        <p className="text-sm text-gray-500">
                          Receive notifications for upcoming maintenance
                        </p>
                      </div>
                      <Switch id="notifications" defaultChecked />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="darkMode">Dark Mode</Label>
                        <p className="text-sm text-gray-500">
                          Toggle dark mode for the application
                        </p>
                      </div>
                      <Switch id="darkMode" />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="dataSync">Auto Data Sync</Label>
                        <p className="text-sm text-gray-500">
                          Automatically sync data with cloud storage
                        </p>
                      </div>
                      <Switch id="dataSync" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="col-span-2 md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>API Configuration</CardTitle>
                <CardDescription>
                  Configure API connection settings
                </CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="apiUrl">API URL</Label>
                    <Input id="apiUrl" defaultValue="/api" />
                  </div>
                  <Button className="w-full">Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
