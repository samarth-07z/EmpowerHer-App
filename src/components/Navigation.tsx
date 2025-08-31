import { useState } from 'react';
import { Menu, X, Shield, Heart, BookOpen, Users, Award } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: Shield },
    { name: 'Safety', path: '/safety', icon: Shield },
    { name: 'Health', path: '/health', icon: Heart },
    { name: 'STEM', path: '/stem', icon: BookOpen },
    { name: 'Community', path: '/community', icon: Users },
    { name: 'Rewards', path: '/rewards', icon: Award },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:block fixed top-6 left-1/2 transform -translate-x-1/2 z-40">
        <div className="glass-container px-8 py-4">
          <div className="flex items-center justify-between w-full max-w-7xl">
            {/* Logo */}
            <div className="flex items-center space-x-3 mr-20">
  <div className="w-12 h-12 bg-gradient-to-br from-purple-800 to-purple-700 rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
    <img
      src="/icons/favicon.png"
      alt="EmpowerHer logo"
      className="w-7 h-7 object-contain"
      width={28}
      height={28}
      loading="eager"
    />
  </div>
</div>

            
            {/* Centered Brand Name */}
            <div className="gradient-text font-bold text-2xl absolute left-1/2 transform -translate-x-1/2">
              {/* EmpowerHer */}
            </div>
            
            {/* Navigation Items */}
            <div className="flex items-center space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-5 py-3 rounded-xl transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-800/30 to-purple-700/30 text-purple-200 border border-purple-600/30 shadow-lg'
                          : 'text-muted-foreground hover:text-foreground hover:bg-purple-800/10 hover:border hover:border-purple-600/20'
                      }`
                    }
                  >
                    <Icon size={20} />
                    <span className="text-sm font-medium">{item.name}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Tablet Navigation */}
      <nav className="hidden md:block lg:hidden fixed top-4 left-4 right-4 z-40">
        <div className="glass-container px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-800 to-purple-700 rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
  <img
    src="/icons/favicon.png"
    alt="EmpowerHer logo"
    className="w-6 h-6 object-contain"
    width={24}
    height={24}
  />
</div>

              <div className="gradient-text font-bold text-xl">
                EmpowerHer
              </div>
            </div>
            
            {/* Navigation Items */}
            <div className="flex items-center space-x-4">
              {navItems.slice(0, 4).map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-800/30 to-purple-700/30 text-purple-200 border border-purple-600/30 shadow-lg'
                          : 'text-muted-foreground hover:text-foreground hover:bg-purple-800/10 hover:border hover:border-purple-600/20'
                      }`
                    }
                    title={item.name}
                  >
                    <Icon size={20} />
                  </NavLink>
                );
              })}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-12 h-12 rounded-xl hover:bg-purple-800/10 hover:border hover:border-purple-600/20 transition-colors"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          
          {isOpen && (
            <div className="mt-4 pt-4 border-t border-glass-border/20">
              <div className="grid grid-cols-2 gap-2">
                {navItems.slice(4).map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                          isActive
                            ? 'bg-gradient-to-r from-purple-800/30 to-purple-700/30 text-purple-200 border border-purple-600/30'
                            : 'text-muted-foreground hover:text-foreground hover:bg-purple-800/10 hover:border hover:border-purple-600/20'
                        }`
                      }
                    >
                      <Icon size={18} />
                      <span className="font-medium text-sm">{item.name}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed top-4 left-4 right-4 z-40">
        <div className="glass-container px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-800 to-purple-700 rounded-lg flex items-center justify-center shadow-lg overflow-hidden">
  <img
    src="/icons/favicon.png"
    alt="EmpowerHer logo"
    className="w-5 h-5 object-contain"
    width={20}
    height={20}
  />
</div>

              <div className="gradient-text font-bold text-lg">
                EmpowerHer
              </div>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-purple-800/10 hover:border hover:border-purple-600/20 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          {isOpen && (
            <div className="mt-4 pt-4 border-t border-glass-border/20">
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-4 py-4 rounded-xl transition-all duration-300 ${
                          isActive
                            ? 'bg-gradient-to-r from-purple-800/30 to-purple-700/30 text-purple-200 border border-purple-600/30'
                            : 'text-muted-foreground hover:text-foreground hover:bg-purple-800/10 hover:border hover:border-purple-600/20'
                        }`
                      }
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.name}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navigation;