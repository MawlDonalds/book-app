
import { Book, Search, User, TrendingUp, Home } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BottomNav = ({ activeTab, setActiveTab }: BottomNavProps) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'library', icon: Book, label: 'Library' },
    { id: 'discover', icon: Search, label: 'Discover' },
    { id: 'reading', icon: TrendingUp, label: 'Reading' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center py-2 px-3 transition-all duration-200 ${
                isActive 
                  ? 'text-blue-600 transform scale-105' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Icon size={20} className={isActive ? 'mb-1' : 'mb-1'} />
              <span className={`text-xs ${isActive ? 'font-medium' : ''}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 bg-blue-600 rounded-full mt-1"></div>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
