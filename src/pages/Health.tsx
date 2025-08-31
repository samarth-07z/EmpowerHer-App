import { Heart, Activity, Droplets, Moon, Calendar, TrendingUp, Plus, X } from 'lucide-react';
import { useState } from 'react';
import Navigation from '../components/Navigation';
import SOSButton from '../components/SOSButton';
import Footer from '../components/Footer';

const Health = () => {
  const [showCycleCalendar, setShowCycleCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [cycleData, setCycleData] = useState<{[key: string]: {symptoms: string[], flow: string, mood: string}}>({});
  
  const todayMetrics = [
    { label: 'Water Intake', value: '6/8', target: '8 glasses', icon: Droplets, color: 'text-blue-500' },
    { label: 'Sleep Hours', value: '7.5h', target: '8h target', icon: Moon, color: 'text-purple-500' },
    { label: 'Active Minutes', value: '45', target: '60 min goal', icon: Activity, color: 'text-green-500' },
    { label: 'Mood Score', value: '8/10', target: 'Great day!', icon: Heart, color: 'text-pink-500' },
  ];

  const weeklyProgress = [
    { day: 'Mon', mood: 8, water: 7, sleep: 7.5, active: 30 },
    { day: 'Tue', mood: 7, water: 8, sleep: 8, active: 45 },
    { day: 'Wed', mood: 9, water: 6, sleep: 6.5, active: 60 },
    { day: 'Thu', mood: 8, water: 8, sleep: 7, active: 40 },
    { day: 'Fri', mood: 9, water: 7, sleep: 8.5, active: 55 },
    { day: 'Sat', mood: 8, water: 6, sleep: 9, active: 75 },
    { day: 'Sun', mood: 8, water: 6, sleep: 7.5, active: 45 },
  ];

  const challenges = [
    { name: '30-Day Hydration Challenge', progress: 23, total: 30, reward: '100 pts' },
    { name: 'Mindful Mornings', progress: 7, total: 14, reward: '75 pts' },
    { name: 'Active Lifestyle', progress: 12, total: 21, reward: '150 pts' },
  ];

  return (
    <div className="min-h-screen relative">
      <Navigation />
      <SOSButton />
      
      <div className="pt-32 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Health & Wellness</h1>
            <p className="text-xl text-muted-foreground">
              Track your journey to holistic well-being
            </p>
          </div>

          {/* Today's Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {todayMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={metric.label} className="glass-card text-center hover-lift">
                  <Icon className={`w-8 h-8 mx-auto mb-3 ${metric.color}`} />
                  <div className="text-2xl font-bold mb-1">{metric.value}</div>
                  <div className="text-sm text-muted-foreground mb-1">{metric.label}</div>
                  <div className="text-xs text-muted-foreground">{metric.target}</div>
                </div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Weekly Progress Chart */}
            <div className="glass-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Weekly Progress</h3>
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              
              <div className="space-y-4">
                {weeklyProgress.map((day, index) => (
                  <div key={day.day} className="flex items-center justify-between p-3 rounded-xl bg-glass/20">
                    <div className="font-medium w-12">{day.day}</div>
                    <div className="flex-1 flex space-x-2">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span>Mood</span>
                          <span>{day.mood}/10</span>
                        </div>
                        <div className="w-full bg-muted/30 rounded-full h-2">
                          <div 
                            className="bg-pink-500 h-2 rounded-full" 
                            style={{ width: `${(day.mood / 10) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span>Water</span>
                          <span>{day.water}/8</span>
                        </div>
                        <div className="w-full bg-muted/30 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${(day.water / 8) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Health Challenges */}
            <div className="glass-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Active Challenges</h3>
                <Plus className="w-5 h-5 text-primary cursor-pointer" />
              </div>
              
              <div className="space-y-4">
                {challenges.map((challenge, index) => (
                  <div key={index} className="p-4 rounded-xl bg-glass/20 border border-glass-border/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{challenge.name}</div>
                      <div className="text-sm text-primary font-semibold">{challenge.reward}</div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                      <span>{challenge.progress} / {challenge.total} days</span>
                      <span>{Math.round((challenge.progress / challenge.total) * 100)}%</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-accent h-2 rounded-full" 
                        style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="glass-card text-center cursor-pointer hover-lift">
              <Droplets className="w-12 h-12 mx-auto mb-4 text-blue-500" />
              <h3 className="text-lg font-semibold mb-2">Log Water Intake</h3>
              <p className="text-muted-foreground text-sm">Track your daily hydration</p>
            </div>
            
            <div className="glass-card text-center cursor-pointer hover-lift">
              <Moon className="w-12 h-12 mx-auto mb-4 text-purple-500" />
              <h3 className="text-lg font-semibold mb-2">Sleep Tracker</h3>
              <p className="text-muted-foreground text-sm">Monitor your sleep patterns</p>
            </div>
            
            <div 
              className="glass-card text-center cursor-pointer hover-lift"
              onClick={() => setShowCycleCalendar(true)}
            >
              <Calendar className="w-12 h-12 mx-auto mb-4 text-pink-500" />
              <h3 className="text-lg font-semibold mb-2">Cycle Tracker</h3>
              <p className="text-muted-foreground text-sm">Track your menstrual cycle</p>
            </div>
          </div>

          {/* Wellness Tips */}
          <div className="mt-8 glass-card">
            <h3 className="text-xl font-semibold mb-6">Today's Wellness Tips</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                <h4 className="font-semibold mb-2">💧 Stay Hydrated</h4>
                <p className="text-sm text-muted-foreground">
                  Drink a glass of water every hour to maintain optimal hydration levels throughout the day.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
                <h4 className="font-semibold mb-2">🧘 Mindful Moments</h4>
                <p className="text-sm text-muted-foreground">
                  Take 5-minute breaks for deep breathing exercises to reduce stress and improve focus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Cycle Calendar Modal */}
      {showCycleCalendar && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-container max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Cycle Tracker</h3>
              <button
                onClick={() => setShowCycleCalendar(false)}
                className="p-2 rounded-lg hover:bg-purple-800/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-6">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                  {day}
                </div>
              ))}
              
              {Array.from({ length: 35 }, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - 17 + i);
                const dateKey = date.toISOString().split('T')[0];
                const isToday = date.toDateString() === new Date().toDateString();
                const hasData = cycleData[dateKey];
                
                return (
                  <div
                    key={i}
                    className={`
                      p-2 text-center text-sm cursor-pointer rounded-lg transition-all
                      ${isToday ? 'bg-pink-500 text-white font-semibold' : ''}
                      ${hasData ? 'bg-pink-200 text-pink-800' : 'hover:bg-purple-100'}
                      ${date < new Date() ? 'opacity-60' : ''}
                    `}
                    onClick={() => setSelectedDate(date)}
                  >
                    {date.getDate()}
                  </div>
                );
              })}
            </div>
            
            {/* Date Details */}
            {selectedDate && (
              <div className="border-t border-glass-border/20 pt-4">
                <h4 className="font-semibold mb-3">
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h4>
                
                <div className="space-y-4">
                  {/* Flow Intensity */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Flow Intensity</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Light', 'Medium', 'Heavy'].map(flow => (
                        <button
                          key={flow}
                          className={`p-2 rounded-lg text-sm transition-colors ${
                            cycleData[selectedDate.toISOString().split('T')[0]]?.flow === flow
                              ? 'bg-pink-500 text-white'
                              : 'bg-purple-100 hover:bg-purple-200'
                          }`}
                          onClick={() => {
                            const dateKey = selectedDate.toISOString().split('T')[0];
                            setCycleData(prev => ({
                              ...prev,
                              [dateKey]: {
                                ...prev[dateKey],
                                flow: flow
                              }
                            }));
                          }}
                        >
                          {flow}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Mood */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Mood</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Happy', 'Calm', 'Irritable', 'Anxious', 'Energetic', 'Tired'].map(mood => (
                        <button
                          key={mood}
                          className={`p-2 rounded-lg text-sm transition-colors ${
                            cycleData[selectedDate.toISOString().split('T')[0]]?.mood === mood
                              ? 'bg-purple-500 text-white'
                              : 'bg-purple-100 hover:bg-purple-200'
                          }`}
                          onClick={() => {
                            const dateKey = selectedDate.toISOString().split('T')[0];
                            setCycleData(prev => ({
                              ...prev,
                              [dateKey]: {
                                ...prev[dateKey],
                                mood: mood
                              }
                            }));
                          }}
                        >
                          {mood}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Symptoms */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Symptoms</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Cramps', 'Bloating', 'Fatigue', 'Headache', 'Back Pain', 'Breast Tenderness'].map(symptom => {
                        const dateKey = selectedDate.toISOString().split('T')[0];
                        const isSelected = cycleData[dateKey]?.symptoms?.includes(symptom);
                        
                        return (
                          <button
                            key={symptom}
                            className={`p-2 rounded-lg text-sm transition-colors ${
                              isSelected
                                ? 'bg-pink-500 text-white'
                                : 'bg-purple-100 hover:bg-purple-200'
                            }`}
                            onClick={() => {
                              const dateKey = selectedDate.toISOString().split('T')[0];
                              const currentSymptoms = cycleData[dateKey]?.symptoms || [];
                              const newSymptoms = isSelected
                                ? currentSymptoms.filter(s => s !== symptom)
                                : [...currentSymptoms, symptom];
                              
                              setCycleData(prev => ({
                                ...prev,
                                [dateKey]: {
                                  ...prev[dateKey],
                                  symptoms: newSymptoms
                                }
                              }));
                            }}
                          >
                            {symptom}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Save Button */}
            <div className="mt-6 pt-4 border-t border-glass-border/20">
              <button
                className="w-full glass-button"
                onClick={() => {
                  alert('Cycle data saved successfully!');
                  setShowCycleCalendar(false);
                }}
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Health;