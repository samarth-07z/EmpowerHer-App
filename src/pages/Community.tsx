import { Users, MessageCircle, Star, Video, Calendar, Heart, TrendingUp } from 'lucide-react';
import Navigation from '../components/Navigation';
import SOSButton from '../components/SOSButton';
import Footer from '../components/Footer';

const Community = () => {
  const mentors = [
    {
      name: 'Dr. Sarah Chen',
      expertise: 'Career Development',
      rating: 4.9,
      sessions: 127,
      nextSlot: 'Today 3:00 PM',
      image: '👩‍💼'
    },
    {
      name: 'Maya Patel',
      expertise: 'Tech Leadership',
      rating: 4.8,
      sessions: 89,
      nextSlot: 'Tomorrow 10:00 AM',
      image: '👩‍💻'
    },
    {
      name: 'Dr. Lisa Rodriguez',
      expertise: 'Work-Life Balance',
      rating: 4.9,
      sessions: 156,
      nextSlot: 'Wed 2:00 PM',
      image: '👩‍⚕️'
    },
  ];

  const discussions = [
    {
      title: 'Breaking into Tech as a Career Changer',
      author: 'Jessica M.',
      replies: 23,
      upvotes: 45,
      time: '2h ago',
      tags: ['Career', 'Technology']
    },
    {
      title: 'Balancing Motherhood and Professional Growth',
      author: 'Amanda K.',
      replies: 18,
      upvotes: 32,
      time: '5h ago',
      tags: ['Work-Life', 'Parenting']
    },
    {
      title: 'Negotiating Salary: Tips and Strategies',
      author: 'Priya S.',
      replies: 31,
      upvotes: 67,
      time: '1d ago',
      tags: ['Career', 'Finance']
    },
  ];

  const events = [
    {
      title: 'Women in STEM Networking Night',
      date: 'Dec 15, 2024',
      time: '6:00 PM',
      attendees: 45,
      type: 'Virtual'
    },
    {
      title: 'Leadership Workshop Series',
      date: 'Dec 18, 2024',
      time: '2:00 PM',
      attendees: 32,
      type: 'In-person'
    },
    {
      title: 'Monthly Mentorship Mixer',
      date: 'Dec 20, 2024',
      time: '7:00 PM',
      attendees: 78,
      type: 'Virtual'
    },
  ];

  return (
    <div className="min-h-screen relative">
      <Navigation />
      <SOSButton />
      
      <div className="pt-32 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Community Hub</h1>
            <p className="text-xl text-muted-foreground">
              Connect, learn, and grow together
            </p>
          </div>

          {/* Mentors Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Featured Mentors</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {mentors.map((mentor, index) => (
                <div key={index} className="glass-card hover-lift cursor-pointer">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{mentor.image}</div>
                    <h3 className="text-lg font-semibold">{mentor.name}</h3>
                    <p className="text-primary text-sm">{mentor.expertise}</p>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-warning fill-current" />
                        <span>{mentor.rating}</span>
                      </div>
                      <span className="text-muted-foreground">{mentor.sessions} sessions</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Next available: {mentor.nextSlot}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 glass-button text-sm flex items-center justify-center space-x-1">
                      <MessageCircle size={16} />
                      <span>Message</span>
                    </button>
                    <button className="flex-1 glass-button text-sm flex items-center justify-center space-x-1 border-green-500 text-green-600">
                      <Video size={16} />
                      <span>Book Call</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Discussion Board */}
            <div className="glass-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Community Discussions</h3>
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              
              <div className="space-y-4">
                {discussions.map((discussion, index) => (
                  <div key={index} className="p-4 rounded-xl bg-glass/20 border border-glass-border/10 hover-lift cursor-pointer">
                    <h4 className="font-semibold mb-2">{discussion.title}</h4>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                      <span>by {discussion.author}</span>
                      <span>{discussion.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <MessageCircle size={16} />
                          <span>{discussion.replies}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart size={16} />
                          <span>{discussion.upvotes}</span>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        {discussion.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 glass-button text-center">
                Start New Discussion
              </button>
            </div>

            {/* Upcoming Events */}
            <div className="glass-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Upcoming Events</h3>
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              
              <div className="space-y-4">
                {events.map((event, index) => (
                  <div key={index} className="p-4 rounded-xl bg-glass/20 border border-glass-border/10 hover-lift cursor-pointer">
                    <h4 className="font-semibold mb-2">{event.title}</h4>
                    <div className="space-y-1 text-sm text-muted-foreground mb-3">
                      <div>{event.date} at {event.time}</div>
                      <div className="flex items-center justify-between">
                        <span>{event.attendees} attending</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          event.type === 'Virtual' ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent'
                        }`}>
                          {event.type}
                        </span>
                      </div>
                    </div>
                    <button className="w-full glass-button text-sm">
                      Join Event
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Community Stats */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="glass-card text-center">
              <Users className="w-8 h-8 mx-auto mb-3 text-primary" />
              <div className="text-2xl font-bold mb-1">2,450</div>
              <div className="text-sm text-muted-foreground">Active Members</div>
            </div>
            <div className="glass-card text-center">
              <MessageCircle className="w-8 h-8 mx-auto mb-3 text-accent" />
              <div className="text-2xl font-bold mb-1">1,023</div>
              <div className="text-sm text-muted-foreground">Discussions</div>
            </div>
            <div className="glass-card text-center">
              <Video className="w-8 h-8 mx-auto mb-3 text-success" />
              <div className="text-2xl font-bold mb-1">456</div>
              <div className="text-sm text-muted-foreground">Mentorship Sessions</div>
            </div>
            <div className="glass-card text-center">
              <Calendar className="w-8 h-8 mx-auto mb-3 text-warning" />
              <div className="text-2xl font-bold mb-1">78</div>
              <div className="text-sm text-muted-foreground">Events This Month</div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Community;