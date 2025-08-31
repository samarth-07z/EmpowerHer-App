import { BookOpen, Code, Microscope, Calculator, Lightbulb, Play, Lock, CheckCircle } from 'lucide-react';
import Navigation from '../components/Navigation';
import SOSButton from '../components/SOSButton';
import Footer from '../components/Footer';

const STEM = () => {
  const modules = [
    { 
      title: 'Introduction to Coding', 
      progress: 100, 
      icon: Code, 
      difficulty: 'Beginner',
      duration: '2h',
      points: 150,
      completed: true 
    },
    { 
      title: 'Data Science Basics', 
      progress: 65, 
      icon: Calculator, 
      difficulty: 'Intermediate',
      duration: '3h',
      points: 200,
      completed: false 
    },
    { 
      title: 'Biology & Health Sciences', 
      progress: 30, 
      icon: Microscope, 
      difficulty: 'Beginner',
      duration: '2.5h',
      points: 175,
      completed: false 
    },
    { 
      title: 'Innovation & Entrepreneurship', 
      progress: 0, 
      icon: Lightbulb, 
      difficulty: 'Advanced',
      duration: '4h',
      points: 250,
      completed: false 
    },
  ];

  const roleModels = [
    {
      name: 'Dr. Marie Curie',
      field: 'Physics & Chemistry',
      achievement: 'First woman to win Nobel Prize',
      image: '🧬'
    },
    {
      name: 'Katherine Johnson',
      field: 'Mathematics & Space',
      achievement: 'NASA mathematician, moon landing calculations',
      image: '🚀'
    },
    {
      name: 'Reshma Saujani',
      field: 'Technology & Education',
      achievement: 'Founder of Girls Who Code',
      image: '💻'
    },
  ];

  const projects = [
    { title: 'Climate Change Tracker App', category: 'Environmental Science', difficulty: 'Intermediate' },
    { title: 'Personal Finance Calculator', category: 'Mathematics', difficulty: 'Beginner' },
    { title: 'Health Symptom Checker', category: 'Medical Technology', difficulty: 'Advanced' },
  ];

  return (
    <div className="min-h-screen relative">
      <Navigation />
      <SOSButton />
      
      <div className="pt-32 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">STEM Learning Hub</h1>
            <p className="text-xl text-muted-foreground">
              Explore science, technology, engineering, and mathematics
            </p>
          </div>

          {/* Learning Modules */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {modules.map((module, index) => {
              const Icon = module.icon;
              return (
                <div key={index} className="glass-card hover-lift cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-xl ${module.completed ? 'bg-success/20' : 'bg-primary/20'}`}>
                        <Icon className={`w-6 h-6 ${module.completed ? 'text-success' : 'text-primary'}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{module.title}</h3>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>{module.difficulty}</span>
                          <span>•</span>
                          <span>{module.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-primary font-semibold">+{module.points} pts</div>
                      {module.completed && <CheckCircle className="w-5 h-5 text-success ml-auto mt-1" />}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{module.progress}%</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          module.completed ? 'bg-success' : 'bg-gradient-to-r from-primary to-accent'
                        }`}
                        style={{ width: `${module.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {module.progress === 0 ? (
                        <Lock className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Play className="w-4 h-4 text-primary" />
                      )}
                      <span className="text-sm">
                        {module.completed ? 'Completed' : module.progress === 0 ? 'Start Learning' : 'Continue'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Role Models */}
            <div className="glass-card">
              <h3 className="text-xl font-semibold mb-6">Inspiring Role Models</h3>
              <div className="space-y-4">
                {roleModels.map((model, index) => (
                  <div key={index} className="p-4 rounded-xl bg-glass/20 border border-glass-border/10">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{model.image}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{model.name}</h4>
                        <p className="text-sm text-primary">{model.field}</p>
                        <p className="text-sm text-muted-foreground">{model.achievement}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Showcase */}
            <div className="glass-card">
              <h3 className="text-xl font-semibold mb-6">Project Challenges</h3>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div key={index} className="p-4 rounded-xl bg-glass/20 border border-glass-border/10 hover-lift cursor-pointer">
                    <h4 className="font-semibold mb-2">{project.title}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{project.category}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        project.difficulty === 'Beginner' ? 'bg-success/20 text-success' :
                        project.difficulty === 'Intermediate' ? 'bg-warning/20 text-warning' :
                        'bg-destructive/20 text-destructive'
                      }`}>
                        {project.difficulty}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 glass-button text-center">
                Submit Your Project
              </button>
            </div>
          </div>

          {/* Interactive Quiz Section */}
          <div className="glass-card text-center">
            <h3 className="text-2xl font-semibold mb-4">Ready for a Challenge?</h3>
            <p className="text-muted-foreground mb-6">
              Test your knowledge with interactive quizzes and compete with peers
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-primary/10 border border-primary/20">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h4 className="text-lg font-semibold mb-2">Daily Quiz</h4>
                <p className="text-sm text-muted-foreground mb-4">Quick 5-minute knowledge check</p>
                <button className="glass-button">Start Quiz</button>
              </div>
              <div className="p-6 rounded-xl bg-accent/10 border border-accent/20">
                <Calculator className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h4 className="text-lg font-semibold mb-2">Challenge Battle</h4>
                <p className="text-sm text-muted-foreground mb-4">Compete with other learners</p>
                <button className="glass-button">Join Battle</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default STEM;