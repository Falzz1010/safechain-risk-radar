
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, BarChart3 } from 'lucide-react';
import DocumentationModal from './DocumentationModal';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: '/', label: 'Beranda' },
    { path: '/audit', label: 'Audit' },
    { path: '/analyzer', label: 'Analyzer' },
    { path: '/visualization', label: 'Visualization' },
    { path: '/education', label: 'Edukasi' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800 shadow-lg">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group flex-shrink-0">
            <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-200" />
            <span className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-200 truncate">
              SafeChain
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md whitespace-nowrap ${
                  isActive(item.path)
                    ? 'text-blue-400 bg-blue-400/10 border-b-2 border-blue-400'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Dashboard Link for Authenticated Users */}
            {user && (
              <Link
                to="/dashboard"
                className={`px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md whitespace-nowrap flex items-center gap-2 ${
                  isActive('/dashboard')
                    ? 'text-green-400 bg-green-400/10 border-b-2 border-green-400'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                Dashboard
              </Link>
            )}

            {/* Auth Link */}
            {!user && (
              <Link
                to="/auth"
                className={`px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md whitespace-nowrap ${
                  isActive('/auth')
                    ? 'text-blue-400 bg-blue-400/10 border-b-2 border-blue-400'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                Login
              </Link>
            )}
            
            {/* Documentation Button */}
            <DocumentationModal />
          </div>

          {/* Mobile Documentation Button - Show only on tablet */}
          <div className="hidden md:flex lg:hidden">
            <DocumentationModal />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md transition-colors duration-200 flex-shrink-0"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-3 sm:py-4 border-t border-gray-800 animate-fade-in">
            <div className="flex flex-col space-y-1 sm:space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3 py-2 sm:py-3 text-sm font-medium transition-all duration-200 rounded-md ${
                    isActive(item.path)
                      ? 'text-blue-400 bg-blue-400/10'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Dashboard Link for Authenticated Users */}
              {user && (
                <Link
                  to="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3 py-2 sm:py-3 text-sm font-medium transition-all duration-200 rounded-md flex items-center gap-2 ${
                    isActive('/dashboard')
                      ? 'text-green-400 bg-green-400/10'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <BarChart3 className="h-4 w-4" />
                  Dashboard
                </Link>
              )}

              {/* Mobile Auth Link */}
              {!user && (
                <Link
                  to="/auth"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3 py-2 sm:py-3 text-sm font-medium transition-all duration-200 rounded-md ${
                    isActive('/auth')
                      ? 'text-blue-400 bg-blue-400/10'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  Login
                </Link>
              )}
              
              {/* Mobile Documentation Button */}
              <div className="pt-2 md:hidden">
                <DocumentationModal />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
