import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Menu, Search, Bell, User, ChevronDown } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { data } = useData();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-[#0070D2] text-white p-3 shadow-md fixed top-0 left-0 right-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="mr-4 p-1 hover:bg-blue-600 rounded-md md:hidden"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center">
            <span className="text-xl font-bold">StudentForce</span>
          </div>
        </div>
        
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-300" />
            </div>
            <input 
              type="text" 
              className="block w-full bg-blue-600 border border-blue-500 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-white"
              placeholder="Search..." 
            />
          </div>
        </div>
        
        <div className="flex items-center">
          <button className="p-2 hover:bg-blue-600 rounded-full relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
          </button>
          
          <div className="relative ml-4">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center hover:bg-blue-600 rounded-full p-1"
            >
              {data.currentUser.avatar ? (
                <img 
                  src={data.currentUser.avatar} 
                  alt={data.currentUser.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-white" 
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center">
                  <User size={16} />
                </div>
              )}
              <span className="ml-2 hidden md:block">{data.currentUser.name}</span>
              <ChevronDown size={16} className="ml-1 hidden md:block" />
            </button>
            
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-700 z-20">
                <div className="px-4 py-2 border-b">
                  <p className="text-sm font-medium">{data.currentUser.name}</p>
                  <p className="text-xs text-gray-500">{data.currentUser.email}</p>
                  <p className="text-xs font-medium mt-1 bg-blue-100 text-blue-800 rounded px-2 py-0.5 inline-block">
                    {data.currentUser.role}
                  </p>
                </div>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Profile</a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Settings</a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100 border-t">Log Out</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;