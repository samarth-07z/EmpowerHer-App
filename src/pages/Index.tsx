import { Shield, Heart, BookOpen, Users, Award, MapPin, Clock, Star, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import SOSButton from '../components/SOSButton';
import Footer from '../components/Footer';

const Index = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Points Earned', value: '2,450', icon: Star, color: 'text-accent' },
    { label: 'Safety Reports', value: '12', icon: Shield, color: 'text-primary' },
    { label: 'Wellness Streak', value: '7 days', icon: Heart, color: 'text-success' },
    { label: 'Modules Completed', value: '8', icon: BookOpen, color: 'text-warning' },
  ];

  const quickActions = [
    { name: 'Safety Map', icon: MapPin, path: '/safety', description: 'View safety reports in your area' },
    { name: 'Health Log', icon: Heart, path: '/health', description: 'Track your wellness journey' },
    { name: 'STEM Learning', icon: BookOpen, path: '/stem', description: 'Explore new skills and knowledge' },
    { name: 'Community', icon: Users, path: '/community', description: 'Connect with mentors and peers' },
  ];

  const recentActivities = [
    { action: 'Completed Self-Defense Module', time: '2h ago', points: '+50 pts' },
    { action: 'Safety Check-in at Central Park', time: '5h ago', points: '+20 pts' },
    { action: 'Wellness Log Entry', time: '1d ago', points: '+15 pts' },
    { action: 'Community Discussion Reply', time: '2d ago', points: '+10 pts' },
  ];

  const handleQuickActionClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen relative">
      <Navigation />
      <SOSButton />
      
      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-3 md:mb-4 gradient-text fade-in">
              EmpowerHer
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-8 md:mb-8 slide-up px-4">
              Your comprehensive platform for safety, wellness, learning, and community support
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12 md:mb-16">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="glass-card hover-lift p-4 md:p-6" style={{ animationDelay: `${index * 100}ms` }}>
                    <Icon className={`w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 md:mb-3 ${stat.color}`} />
                    <div className="text-lg md:text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <div 
                    key={action.name} 
                    className="glass-card hover-lift cursor-pointer group p-4 md:p-6"
                    style={{ animationDelay: `${index * 150}ms` }}
                    onClick={() => handleQuickActionClick(action.path)}
                  >
                    <Icon className="w-10 h-10 md:w-12 md:h-12 text-purple-600 mb-3 md:mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg md:text-xl font-semibold mb-2">{action.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{action.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="glass-card mb-8 md:mb-12 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">Recent Activities</h2>
            <div className="space-y-4 md:space-y-6">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 md:p-5 rounded-xl bg-purple-800/10 hover:bg-purple-700/20 border border-purple-600/20 transition-all duration-300">
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-800/30 to-purple-700/30 rounded-xl flex items-center justify-center">
                      <Star className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm md:text-base">{activity.action}</div>
                      <div className="text-xs md:text-sm text-muted-foreground">{activity.time}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm md:text-base font-bold text-purple-400">{activity.points}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Level Progress */}
          <div className="glass-card">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h3 className="text-lg md:text-xl font-semibold">Level Progress</h3>
              <Award className="w-5 h-5 text-accent" />
            </div>
            <div className="text-center mb-4 md:mb-6">
              <div className="gradient-text text-xl md:text-2xl font-bold mb-2">Guardian Level</div>
              <div className="text-sm md:text-base text-muted-foreground">550 points to Protector</div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-muted/30 rounded-full h-2 md:h-3 mb-3 md:mb-4">
              <div className="bg-gradient-to-r from-primary to-accent h-2 md:h-3 rounded-full" style={{ width: '78%' }}></div>
            </div>
            
            <div className="flex justify-between text-xs md:text-sm text-muted-foreground mb-4 md:mb-6">
              <span>2,450 / 3,000 points</span>
              <span>78%</span>
            </div>
            
            {/* Next Rewards */}
            <div className="p-3 md:p-4 rounded-xl bg-primary/10 border border-primary/20">
              <div className="text-sm font-medium text-primary mb-1">Next Level Reward</div>
              <div className="text-xs md:text-sm text-muted-foreground">Unlock exclusive mentor access + double points weekend</div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
