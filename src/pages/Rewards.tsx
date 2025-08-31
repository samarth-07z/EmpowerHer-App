import { Award, Star, ShoppingBag, Gift, Zap, Crown, TrendingUp, Trophy, Medal } from 'lucide-react';
import Navigation from '../components/Navigation';
import SOSButton from '../components/SOSButton';
import Footer from '../components/Footer';

const Rewards = () => {
  const vouchers = [
    { brand: 'Amazon', logo: '/icons/amazon.png', pointCost: 500, stock: 15, category: 'Shopping' },
    { brand: 'Apple', logo: '/icons/apple.png', pointCost: 1000, stock: 8, category: 'Technology' },
    { brand: 'Spotify', logo: '/icons/spotify.png', pointCost: 150, stock: 25, category: 'Entertainment' },
    { brand: 'Nike', logo: '/icons/tool.png', pointCost: 750, stock: 12, category: 'Fashion' },
    { brand: 'Starbucks', logo: '/icons/starbucks.png', pointCost: 200, stock: 30, category: 'Food & Drink' },
    { brand: 'Netflix', logo: '/icons/netflix.png', pointCost: 250, stock: 20, category: 'Entertainment' },
    { brand: 'Sephora', logo: '/icons/sephora.png', pointCost: 600, stock: 18, category: 'Beauty' },
    { brand: 'Steam', logo: '/icons/steam.png', pointCost: 350, stock: 22, category: 'Gaming' },
    { brand: 'Myntra', logo: '/icons/tool2.jpg', pointCost: 350, stock: 22, category: 'Fashion' }
  ];

  const recentRedemptions = [
    { item: 'Amazon Gift Card', points: 500, date: '2 days ago', status: 'Delivered' },
    { item: 'Spotify Premium', points: 300, date: '1 week ago', status: 'Active' },
    { item: 'Starbucks Voucher', points: 200, date: '2 weeks ago', status: 'Used' },
  ];

  const pointHistory = [
    { action: 'Completed Safety Module', points: '+50', date: '2h ago' },
    { action: 'Daily Wellness Check-in', points: '+15', date: '1d ago' },
    { action: 'Community Discussion Reply', points: '+10', date: '2d ago' },
    { action: 'Redeemed Amazon Voucher', points: '-500', date: '2d ago' },
    { action: 'Safety Report Verified', points: '+25', date: '3d ago' },
  ];

  const leaderboard = [
    { rank: 1, name: 'Sarah Johnson', points: 8450, level: 'Guardian', avatar: '👑', isCurrentUser: false },
    { rank: 2, name: 'Maria Rodriguez', points: 7230, level: 'Guardian', avatar: '🥈', isCurrentUser: false },
    { rank: 3, name: 'Emily Chen', points: 6890, level: 'Guardian', avatar: '🥉', isCurrentUser: false },
    { rank: 4, name: 'Lisa Thompson', points: 5670, level: 'Protector', avatar: '💎', isCurrentUser: false },
    { rank: 5, name: 'You', points: 2450, level: 'Guardian', avatar: '⭐', isCurrentUser: true },
    { rank: 6, name: 'Jessica Kim', points: 2340, level: 'Protector', avatar: '🌟', isCurrentUser: false },
    { rank: 7, name: 'Amanda Wilson', points: 2180, level: 'Protector', avatar: '✨', isCurrentUser: false },
    { rank: 8, name: 'Rachel Davis', points: 1950, level: 'Protector', avatar: '💫', isCurrentUser: false },
    { rank: 9, name: 'Nicole Brown', points: 1820, level: 'Protector', avatar: '🌙', isCurrentUser: false },
    { rank: 10, name: 'Ashley Miller', points: 1690, level: 'Protector', avatar: '☀️', isCurrentUser: false },
  ];

  const currentPoints = 2450;
  const currentLevel = 'Guardian';
  const nextLevel = 'Protector';
  const pointsToNext = 550;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />;
      case 2: return <Medal className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />;
      case 3: return <Medal className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />;
      default: return <span className="text-xs md:text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank <= 3) {
      return (
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          rank === 1 ? 'bg-yellow-500/20 text-yellow-600' :
          rank === 2 ? 'bg-gray-400/20 text-gray-600' :
          'bg-amber-600/20 text-amber-700'
        }`}>
          {rank === 1 ? '🥇 Champion' : rank === 2 ? '🥈 Runner-up' : '🥉 Third Place'}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen relative">
      <Navigation />
      <SOSButton />
      
      <div className="pt-24 md:pt-32 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 gradient-text">Rewards Store</h1>
            <p className="text-lg md:text-xl text-muted-foreground px-4">
              Redeem your points for amazing rewards
            </p>
          </div>

          {/* Points Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
            <div className="glass-card text-center p-4 md:p-6">
              <Star className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 text-purple-400 animate-glass-float" />
              <div className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">{currentPoints.toLocaleString()}</div>
              <div className="text-sm md:text-base text-muted-foreground">Available Points</div>
            </div>
            
            <div className="glass-card text-center p-4 md:p-6">
              <Crown className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 text-purple-500" />
              <div className="text-xl md:text-2xl font-bold mb-1 md:mb-2">{currentLevel}</div>
              <div className="text-sm md:text-base text-muted-foreground">Current Level</div>
              <div className="mt-2 md:mt-3 text-xs md:text-sm text-purple-400">{pointsToNext} points to {nextLevel}</div>
            </div>
            
            <div className="glass-card text-center p-4 md:p-6">
              <Zap className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 text-warning" />
              <div className="text-xl md:text-2xl font-bold mb-1 md:mb-2">Top 10</div>
              <div className="text-sm md:text-base text-muted-foreground">Leaderboard Rank</div>
              <div className="mt-2 md:mt-3 text-xs md:text-sm text-warning">🎉 Double Rewards Active!</div>
            </div>
          </div>

          {/* Leaderboard Section */}
          <div className="glass-card mb-8 md:mb-12">
            <div className="flex items-center justify-between mb-4 md:mb-6 p-4 md:p-6 pb-0">
              <h3 className="text-2xl md:text-3xl font-semibold">🏆 Top 10 Leaderboard</h3>
              <div className="flex items-center space-x-2">
                <Crown className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                <span className="text-xs md:text-sm font-medium text-warning">Double Rewards for Top 10!</span>
              </div>
            </div>
            
            <div className="px-4 md:px-6 space-y-2 md:space-y-3">
              {leaderboard.map((user, index) => (
                <div 
                  key={user.rank} 
                  className={`p-3 md:p-4 rounded-xl transition-all duration-300 ${
                    user.isCurrentUser 
                      ? 'bg-purple-800/20 border border-purple-600/30' 
                      : 'bg-glass/20 border border-glass-border/10 hover-lift'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 md:space-x-4 min-w-0 flex-1">
                      <div className="flex items-center space-x-2">
                        {getRankIcon(user.rank)}
                        <span className="text-xl md:text-2xl">{user.avatar}</span>
                      </div>
                      
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-2">
                          <span className={`font-semibold text-sm md:text-base truncate ${user.isCurrentUser ? 'text-purple-400' : ''}`}>
                            {user.name}
                          </span>
                          {user.isCurrentUser && (
                            <span className="px-2 py-1 bg-purple-800/20 text-purple-400 text-xs rounded-full flex-shrink-0">
                              You
                            </span>
                          )}
                        </div>
                        <div className="text-xs md:text-sm text-muted-foreground truncate">{user.level}</div>
                      </div>
                    </div>
                    
                    <div className="text-right ml-3">
                      <div className="flex items-center space-x-2">
                        <Star className="w-3 h-3 md:w-4 md:h-4 text-purple-400 flex-shrink-0" />
                        <span className="font-bold text-sm md:text-base">{user.points.toLocaleString()}</span>
                      </div>
                      {getRankBadge(user.rank)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 md:mt-6 mx-4 md:mx-6 mb-4 md:mb-6 p-3 md:p-4 rounded-xl bg-warning/10 border border-warning/20">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="w-4 h-4 md:w-5 md:h-5 text-warning" />
                <span className="font-semibold text-warning text-sm md:text-base">Double Rewards Active!</span>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">
                All users in the top 10 receive double points on all activities and 2x voucher redemption value!
              </p>
            </div>
          </div>

          {/* Voucher Categories */}
          <div className="mb-6 md:mb-8">
            <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
              {['All', 'Shopping', 'Technology', 'Entertainment', 'Fashion', 'Beauty', 'Gaming'].map((category) => (
                <button
                  key={category}
                  className={`glass-button text-xs md:text-sm py-2 px-3 md:px-4 ${
                    category === 'All' ? 'bg-primary/20 text-primary' : ''
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Vouchers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
            {vouchers.map((voucher, index) => (
              <div key={index} className="glass-card hover-lift cursor-pointer group p-4 md:p-6">
                <div className="text-center mb-3 md:mb-4">
                  <div className="flex justify-center items-center mb-2">
                    <img 
                      src={voucher.logo} 
                      alt={`${voucher.brand} logo`}
                      className="w-12 h-12 md:w-16 md:h-16 object-contain"
                      onError={(e) => {
                        // Fallback to a default icon if SVG fails to load
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    {/* Fallback icon if SVG doesn't load */}
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center hidden">
                      <ShoppingBag className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-base md:text-lg font-semibold">{voucher.brand}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">{voucher.category}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 md:w-4 md:h-4 text-accent" />
                      <span className="font-semibold text-sm md:text-base">{voucher.pointCost} pts</span>
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground">
                      {voucher.stock} left
                    </div>
                  </div>
                  
                  <button 
                    className={`w-full text-xs md:text-sm transition-all py-2 md:py-3 rounded-xl ${
                      currentPoints >= voucher.pointCost 
                        ? 'bg-yellow-500 hover:bg-yellow-600 text-white font-semibold shadow-lg hover:shadow-xl' 
                        : 'opacity-50 cursor-not-allowed bg-gray-400 text-gray-600'
                    }`}
                    disabled={currentPoints < voucher.pointCost}
                  >
                    {currentPoints >= voucher.pointCost ? 'Redeem Now' : 'Insufficient Points'}
                  </button>
                </div>
                
                {voucher.stock < 5 && (
                  <div className="mt-2 text-xs text-destructive text-center">
                    ⚡ Limited Stock!
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            {/* Recent Redemptions */}
            <div className="glass-card">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h3 className="text-lg md:text-xl font-semibold">Recent Redemptions</h3>
                <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </div>
              
              <div className="space-y-3 md:space-y-4">
                {recentRedemptions.map((redemption, index) => (
                  <div key={index} className="p-3 md:p-4 rounded-xl bg-glass/20 border border-glass-border/10">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm md:text-base truncate">{redemption.item}</div>
                        <div className="text-xs md:text-sm text-muted-foreground">{redemption.date}</div>
                      </div>
                      <div className="text-right ml-3">
                        <div className="text-destructive font-semibold text-sm md:text-base">-{redemption.points} pts</div>
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          redemption.status === 'Delivered' ? 'bg-success/20 text-success' :
                          redemption.status === 'Active' ? 'bg-primary/20 text-primary' :
                          'bg-muted/20 text-muted-foreground'
                        }`}>
                          {redemption.status}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Points History */}
            <div className="glass-card">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h3 className="text-lg md:text-xl font-semibold">Points History</h3>
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </div>
              
              <div className="space-y-3 md:space-y-4">
                {pointHistory.map((entry, index) => (
                  <div key={index} className="p-3 md:p-4 rounded-xl bg-glass/20 border border-glass-border/10">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm md:text-base truncate">{entry.action}</div>
                        <div className="text-xs md:text-sm text-muted-foreground">{entry.date}</div>
                      </div>
                      <div className={`font-semibold text-sm md:text-base ml-3 ${
                        entry.points.startsWith('+') ? 'text-success' : 'text-destructive'
                      }`}>
                        {entry.points}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Special Offers */}
          <div className="mt-8 md:mt-12 glass-card text-center">
            <Gift className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 text-accent animate-glass-float" />
            <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Special Offers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="p-4 md:p-6 rounded-xl bg-primary/10 border border-primary/20">
                <h4 className="text-base md:text-lg font-semibold mb-1 md:mb-2">Weekend Double Points</h4>
                <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                  Earn 2x points on all activities this weekend!
                </p>
                <div className="text-primary font-semibold text-sm md:text-base">Ends in 2 days</div>
              </div>
              <div className="p-4 md:p-6 rounded-xl bg-accent/10 border border-accent/20">
                <h4 className="text-base md:text-lg font-semibold mb-1 md:mb-2">Referral Bonus</h4>
                <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                  Invite a friend and both get 100 bonus points!
                </p>
                <button className="glass-button text-sm md:text-base py-2 md:py-3">Invite Friends</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Rewards;