import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-20 mb-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="glass-container py-6 px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Heart className="w-4 h-4 text-purple-500" />
            <span className="text-sm text-muted-foreground">
              Made with passion by
            </span>
            <span className="text-sm font-semibold text-purple-600">
              Z coders
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            © {currentYear} Z coders. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
