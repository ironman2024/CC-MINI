import React, { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Tabs from '../components/common/Tabs';
import { useData } from '../contexts/DataContext';
import { User, Settings as SettingsIcon, Shield, Database, Bell, RefreshCw } from 'lucide-react';

const Settings: React.FC = () => {
  const { data } = useData();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [savedMessage, setSavedMessage] = useState('');
  
  const handleSavePreferences = () => {
    setSavedMessage('Preferences saved successfully');
    setTimeout(() => setSavedMessage(''), 3000);
  };
  
  const tabs = [
    {
      id: 'account',
      label: 'Account',
      content: (
        <Card>
          <h3 className="text-lg font-medium mb-4">Account Information</h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4 mb-6">
              {data.currentUser.avatar ? (
                <img 
                  src={data.currentUser.avatar} 
                  alt={data.currentUser.name}
                  className="w-16 h-16 rounded-full object-cover" 
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <User size={32} className="text-blue-600" />
                </div>
              )}
              <div>
                <h4 className="text-xl font-medium">{data.currentUser.name}</h4>
                <p className="text-gray-500">{data.currentUser.email}</p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  {data.currentUser.role}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={data.currentUser.name}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={data.currentUser.email}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={data.currentUser.role}
                  disabled
                  className="block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option>Admin</option>
                  <option>Instructor</option>
                  <option>Student</option>
                  <option>Registrar</option>
                </select>
                <p className="mt-1 text-xs text-gray-500">Role changes require administrator approval</p>
              </div>
            </div>
            
            <div className="pt-4 flex justify-end">
              <Button>Update Profile</Button>
            </div>
          </div>
        </Card>
      )
    },
    {
      id: 'preferences',
      label: 'Preferences',
      content: (
        <Card>
          <h3 className="text-lg font-medium mb-4">Application Preferences</h3>
          
          {savedMessage && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-800 rounded-md p-3">
              {savedMessage}
            </div>
          )}
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Notifications</h4>
                <p className="text-sm text-gray-500">Receive alerts for important system events</p>
              </div>
              <div className="flex items-center">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notificationsEnabled}
                    onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Dark Mode</h4>
                <p className="text-sm text-gray-500">Use darker colors for nighttime viewing</p>
              </div>
              <div className="flex items-center">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={darkModeEnabled}
                    onChange={() => setDarkModeEnabled(!darkModeEnabled)}
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Auto-Save Data</h4>
                <p className="text-sm text-gray-500">Automatically save changes to local storage</p>
              </div>
              <div className="flex items-center">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={autoSaveEnabled}
                    onChange={() => setAutoSaveEnabled(!autoSaveEnabled)}
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            
            <div className="pt-4 flex justify-end">
              <Button onClick={handleSavePreferences}>Save Preferences</Button>
            </div>
          </div>
        </Card>
      )
    },
    {
      id: 'security',
      label: 'Security',
      content: (
        <Card>
          <h3 className="text-lg font-medium mb-4">Security Settings</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">Change Password</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mt-4">
                <Button>Update Password</Button>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-500 mb-3">
                Add an extra layer of security to your account by enabling two-factor authentication.
              </p>
              <Button variant="secondary">Enable 2FA</Button>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Recent Login Activity</h4>
              <div className="bg-gray-50 rounded-md p-3 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <div className="font-medium">San Francisco, CA, USA</div>
                    <div className="text-gray-500">Chrome on Windows</div>
                  </div>
                  <div className="text-gray-500">
                    Just now
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <div className="font-medium">San Francisco, CA, USA</div>
                    <div className="text-gray-500">Safari on macOS</div>
                  </div>
                  <div className="text-gray-500">
                    Yesterday at 2:43 PM
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )
    },
    {
      id: 'system',
      label: 'System',
      content: (
        <Card>
          <h3 className="text-lg font-medium mb-4">System Information</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">Application Details</h4>
              <div className="bg-gray-50 rounded-md p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Application Name:</span>
                    <span className="ml-2 font-medium">StudentForce</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Version:</span>
                    <span className="ml-2 font-medium">1.0.0</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Environment:</span>
                    <span className="ml-2 font-medium">Development</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Last Updated:</span>
                    <span className="ml-2 font-medium">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Data Management</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-gray-50 rounded-md p-3">
                  <div>
                    <div className="font-medium">Local Storage</div>
                    <div className="text-sm text-gray-500">Export or clear all application data</div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="secondary">Export</Button>
                    <Button size="sm" variant="warning">Clear</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-gray-50 rounded-md p-3">
                  <div>
                    <div className="font-medium">Reset to Defaults</div>
                    <div className="text-sm text-gray-500">Restore application to initial state</div>
                  </div>
                  <Button size="sm" variant="danger">Reset</Button>
                </div>
                <div className="flex items-center justify-between bg-gray-50 rounded-md p-3">
                  <div>
                    <div className="font-medium">Generate Sample Data</div>
                    <div className="text-sm text-gray-500">Create mock data for testing</div>
                  </div>
                  <Button size="sm" variant="primary">Generate</Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )
    }
  ];
  
  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Manage your account and application preferences"
      />
      
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3">
          <Card className="p-0">
            <ul className="divide-y">
              <li>
                <a href="#account" className="flex items-center p-3 hover:bg-gray-50">
                  <User size={20} className="text-gray-400 mr-3" />
                  <span>Account</span>
                </a>
              </li>
              <li>
                <a href="#preferences" className="flex items-center p-3 hover:bg-gray-50">
                  <SettingsIcon size={20} className="text-gray-400 mr-3" />
                  <span>Preferences</span>
                </a>
              </li>
              <li>
                <a href="#security" className="flex items-center p-3 hover:bg-gray-50">
                  <Shield size={20} className="text-gray-400 mr-3" />
                  <span>Security</span>
                </a>
              </li>
              <li>
                <a href="#system" className="flex items-center p-3 hover:bg-gray-50">
                  <Database size={20} className="text-gray-400 mr-3" />
                  <span>System</span>
                </a>
              </li>
              <li>
                <a href="#notifications" className="flex items-center p-3 hover:bg-gray-50">
                  <Bell size={20} className="text-gray-400 mr-3" />
                  <span>Notifications</span>
                </a>
              </li>
              <li>
                <a href="#updates" className="flex items-center p-3 hover:bg-gray-50">
                  <RefreshCw size={20} className="text-gray-400 mr-3" />
                  <span>Updates</span>
                </a>
              </li>
            </ul>
          </Card>
        </div>
        
        <div className="col-span-12 md:col-span-9">
          <Tabs tabs={tabs} />
        </div>
      </div>
    </div>
  );
};

export default Settings;