import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Home, Search, Bell, Mail, Bookmark, User, TrendingUp } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: Home, label: 'Início', active: true },
    { icon: Search, label: 'Explorar' },
    { icon: Bell, label: 'Notificações' },
    { icon: Mail, label: 'Mensagens' },
    { icon: Bookmark, label: 'Salvos' },
    { icon: User, label: 'Perfil' },
    { icon: TrendingUp, label: 'Tendências' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:z-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4 pt-20 md:pt-4">
          <nav className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Button
                  key={index}
                  variant={item.active ? 'default' : 'ghost'}
                  className="w-full justify-start text-left"
                  onClick={() => {
                    onClose();
                  }}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
          
          <Card className="mt-6 p-4">
            <h3 className="font-semibold mb-2">Tendências</h3>
            <div className="space-y-2 text-sm">
              <div className="text-gray-600">
                <p className="font-medium">#ReactJS</p>
                <p className="text-xs">12.5K posts</p>
              </div>
              <div className="text-gray-600">
                <p className="font-medium">#WebDev</p>
                <p className="text-xs">8.2K posts</p>
              </div>
              <div className="text-gray-600">
                <p className="font-medium">#JavaScript</p>
                <p className="text-xs">15.1K posts</p>
              </div>
            </div>
          </Card>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;