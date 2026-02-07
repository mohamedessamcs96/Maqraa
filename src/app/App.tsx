import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { RecordingScreen } from './components/RecordingScreen';
import { LevelResultScreen } from './components/LevelResultScreen';
import { TutorListScreen } from './components/TutorListScreen';
import { TutorProfileScreen } from './components/TutorProfileScreen';
import { HomePage } from './components/home/HomePage';
import { MainNavigation } from './components/home/MainNavigation';
import { ReviewDashboard } from './components/review/ReviewDashboard';
import { ReviewSession } from './components/review/ReviewSession';
import { ReviewProgress } from './components/review/ReviewProgress';
import { RecitationHome } from './components/recitation/RecitationHome';
import { RecitationCorrection } from './components/recitation/RecitationCorrection';
import { RecitationHistory } from './components/recitation/RecitationHistory';
import { MemorizationHome } from './components/memorization/MemorizationHome';
import { MemorizationPlan } from './components/memorization/MemorizationPlan';
import { MemorizationTracker } from './components/memorization/MemorizationTracker';
import { IjazahPrograms } from './components/ijazah/IjazahPrograms';
import { IjazahProgress } from './components/ijazah/IjazahProgress';

// Platform Pages
import { LandingPage } from './pages/auth/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignUpPage } from './pages/auth/SignUpPage';
import { LearnerOnboarding } from './pages/learner/LearnerOnboarding';
import { BrowseTeachers } from './pages/learner/BrowseTeachers';
import { TeacherProfile } from './pages/learner/TeacherProfile';
import { LearnerDashboard } from './pages/learner/LearnerDashboard';

export type Screen = 
  | 'welcome' 
  | 'recording' 
  | 'result' 
  | 'tutors' 
  | 'tutor-profile'
  | 'home'
  | 'review'
  | 'review-session'
  | 'review-progress'
  | 'recitation'
  | 'recitation-correction'
  | 'recitation-history'
  | 'memorization'
  | 'memorization-plan'
  | 'memorization-tracker'
  | 'ijazah'
  | 'ijazah-progress';

export interface Tutor {
  id: string;
  name: string;
  title: string;
  image: string;
  rating: number;
  students: number;
  experience: number;
  specialization: string[];
  price: number;
  available: boolean;
  bio: string;
}

// Legacy App Component for old screens
function LegacyApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [userLevel, setUserLevel] = useState<string>('');
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'review' | 'recitation' | 'memorization' | 'ijazah'>('home');

  const handleStartTest = () => {
    setCurrentScreen('recording');
  };

  const handleTestComplete = () => {
    setTimeout(() => {
      const levels = ['مبتدئ', 'متوسط', 'متقدم', 'محترف'];
      const randomLevel = levels[Math.floor(Math.random() * levels.length)];
      setUserLevel(randomLevel);
      setCurrentScreen('result');
    }, 2000);
  };

  const handleViewTutors = () => {
    setCurrentScreen('tutors');
  };

  const handleSelectTutor = (tutor: Tutor) => {
    setSelectedTutor(tutor);
    setCurrentScreen('tutor-profile');
  };

  const handleBack = () => {
    if (currentScreen === 'tutor-profile') {
      setCurrentScreen('tutors');
    } else if (currentScreen === 'tutors') {
      setCurrentScreen('result');
    } else if (currentScreen === 'result') {
      setCurrentScreen('welcome');
    } else if (currentScreen === 'recording') {
      setCurrentScreen('welcome');
    } else if (currentScreen === 'home') {
      setCurrentScreen('welcome');
    }
  };

  const handleNavigateSection = (section: 'home' | 'review' | 'recitation' | 'memorization' | 'ijazah') => {
    setActiveTab(section);
    switch (section) {
      case 'home':
        setCurrentScreen('home');
        break;
      case 'review':
        setCurrentScreen('review');
        break;
      case 'recitation':
        setCurrentScreen('recitation');
        break;
      case 'memorization':
        setCurrentScreen('memorization');
        break;
      case 'ijazah':
        setCurrentScreen('ijazah');
        break;
    }
  };

  return (
    <div className="h-full min-h-screen w-full bg-gradient-to-br from-emerald-50 to-teal-50 md:flex md:items-center md:justify-center">
      <div className="w-full min-h-screen md:min-h-0 md:h-[90vh] md:max-h-[900px] max-w-md mx-auto md:rounded-3xl bg-white shadow-2xl overflow-y-auto relative">
        {/* Welcome Flow */}
        {currentScreen === 'welcome' && (
          <WelcomeScreen onStartTest={handleStartTest} />
        )}
        {currentScreen === 'recording' && (
          <RecordingScreen onComplete={handleTestComplete} onBack={handleBack} />
        )}
        {currentScreen === 'result' && (
          <LevelResultScreen level={userLevel} onViewTutors={handleViewTutors} />
        )}
        {currentScreen === 'tutors' && (
          <TutorListScreen onSelectTutor={handleSelectTutor} onBack={handleBack} />
        )}
        {currentScreen === 'tutor-profile' && selectedTutor && (
          <TutorProfileScreen tutor={selectedTutor} onBack={handleBack} />
        )}

        {/* Main App Flow */}
        {currentScreen === 'home' && (
          <HomePage onNavigate={handleNavigateSection} />
        )}

        {/* Review Section */}
        {currentScreen === 'review' && (
          <ReviewDashboard 
            onStartSession={() => setCurrentScreen('review-session')}
            onViewProgress={() => setCurrentScreen('review-progress')}
          />
        )}
        {currentScreen === 'review-session' && (
          <ReviewSession 
            onComplete={() => setCurrentScreen('review')}
            onBack={() => setCurrentScreen('review')}
          />
        )}
        {currentScreen === 'review-progress' && (
          <ReviewProgress onBack={() => setCurrentScreen('review')} />
        )}

        {/* Recitation Section */}
        {currentScreen === 'recitation' && (
          <RecitationHome 
            onStartRecording={() => setCurrentScreen('recitation-correction')}
            onViewHistory={() => setCurrentScreen('recitation-history')}
          />
        )}
        {currentScreen === 'recitation-correction' && (
          <RecitationCorrection onBack={() => setCurrentScreen('recitation')} />
        )}
        {currentScreen === 'recitation-history' && (
          <RecitationHistory 
            onBack={() => setCurrentScreen('recitation')}
            onViewCorrection={() => setCurrentScreen('recitation-correction')}
          />
        )}

        {/* Memorization Section */}
        {currentScreen === 'memorization' && (
          <MemorizationHome 
            onStartNew={() => setCurrentScreen('memorization-plan')}
            onViewPlan={() => setCurrentScreen('memorization-plan')}
            onViewTracker={() => setCurrentScreen('memorization-tracker')}
          />
        )}
        {currentScreen === 'memorization-plan' && (
          <MemorizationPlan onBack={() => setCurrentScreen('memorization')} />
        )}
        {currentScreen === 'memorization-tracker' && (
          <MemorizationTracker onBack={() => setCurrentScreen('memorization')} />
        )}

        {/* Ijazah Section */}
        {currentScreen === 'ijazah' && (
          <IjazahPrograms 
            onSelectProgram={() => {}}
            onViewProgress={() => setCurrentScreen('ijazah-progress')}
          />
        )}
        {currentScreen === 'ijazah-progress' && (
          <IjazahProgress onBack={() => setCurrentScreen('ijazah')} />
        )}

        {/* Bottom Navigation - Only show in main app screens */}
        {(currentScreen === 'home' || currentScreen === 'review' || currentScreen === 'review-session' || currentScreen === 'review-progress' ||
          currentScreen === 'recitation' || currentScreen === 'recitation-correction' || currentScreen === 'recitation-history' ||
          currentScreen === 'memorization' || currentScreen === 'memorization-plan' || currentScreen === 'memorization-tracker' ||
          currentScreen === 'ijazah' || currentScreen === 'ijazah-progress') && (
          <MainNavigation activeTab={activeTab} onTabChange={handleNavigateSection} />
        )}
      </div>
    </div>
  );
}

// Wrapper component for TeacherProfile with route params
function TeacherProfileWrapper() {
  const { id } = useParams<{ id: string }>();
  const navigate = (path: string) => {
    window.location.href = path;
  };
  
  return <TeacherProfile teacherId={id || '1'} onNavigate={navigate} />;
}

// Main App Component with Routing
export default function App() {
  return (
    <Router>
      <Routes>
        {/* Platform Pages */}
        <Route path="/" element={<LandingPage onNavigate={(path) => window.location.href = path} />} />
        <Route path="/landing" element={<LandingPage onNavigate={(path) => window.location.href = path} />} />
        <Route path="/login" element={<LoginPage onNavigate={(path) => window.location.href = path} />} />
        <Route path="/signup" element={<SignUpPage onNavigate={(path) => window.location.href = path} />} />
        
        {/* Learner Pages */}
        <Route path="/learner/onboarding" element={<LearnerOnboarding onNavigate={(path) => window.location.href = path} />} />
        <Route path="/learner/teachers" element={<BrowseTeachers onNavigate={(path) => window.location.href = path} />} />
        <Route path="/learner/teacher/:id" element={<TeacherProfileWrapper />} />
        <Route path="/learner/dashboard" element={<LearnerDashboard onNavigate={(path) => window.location.href = path} />} />
        
        {/* Legacy App - redirect to old welcome flow */}
        <Route path="/app" element={<LegacyApp />} />
        
        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
