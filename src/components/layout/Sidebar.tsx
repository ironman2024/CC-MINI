import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  BookOpen, 
  GraduationCap, 
  ClipboardCheck, 
  BarChart2,
  Award,
  Settings
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <Home size={20} /> },
    { name: 'Students', path: '/students', icon: <Users size={20} /> },
    { name: 'Courses', path: '/courses', icon: <BookOpen size={20} /> },
    { name: 'Professors', path: '/professors', icon: <GraduationCap size={20} /> },
    { name: 'Enrollments', path: '/enrollments', icon: <ClipboardCheck size={20} /> },
    { name: 'Marks', path: '/marks', icon: <Award size={20} /> },
    { name: 'Reports', path: '/reports', icon: <BarChart2 size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> }
  ];
  
  const handleNavigation = (path: string) => {
    navigate(path);
    // Close sidebar on mobile
    if (window.innerWidth < 768) {
      closeSidebar();
    }
  };
  
  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-14 left-0 bottom-0 w-64 bg-white shadow-md z-30 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <nav className="flex flex-col h-full">
          <div className="flex-1 py-4">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center w-full px-4 py-3 text-left ${
                  location.pathname === item.path 
                    ? 'bg-blue-50 text-[#0070D2] border-l-4 border-[#0070D2]' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </div>
          
          <div className="p-4 border-t">
            <div className="bg-blue-50 rounded-md p-3">
              <h4 className="text-sm font-semibold text-blue-800 mb-1">Need Help?</h4>
              <p className="text-xs text-gray-600 mb-2">
                Access documentation and support resources
              </p>
              <button className="text-xs text-[#0070D2] hover:underline">
                View Help Center
              </button>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;