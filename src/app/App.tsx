import { useState } from 'react';
import { WelcomeScreen } from '@/app/components/WelcomeScreen';
import { RecordingScreen } from '@/app/components/RecordingScreen';
import { LevelResultScreen } from '@/app/components/LevelResultScreen';
import { TutorListScreen } from '@/app/components/TutorListScreen';
import { TutorProfileScreen } from '@/app/components/TutorProfileScreen';

export type Screen = 'welcome' | 'recording' | 'result' | 'tutors' | 'tutor-profile';

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

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [userLevel, setUserLevel] = useState<string>('');
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);

  const handleStartTest = () => {
    setCurrentScreen('recording');
  };

  const handleTestComplete = () => {
    // Simulate AI analysis
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
    }
  };

  return (
    <div className="h-full min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="w-full h-full max-w-md md:h-[90vh] md:max-h-[900px] md:rounded-3xl bg-white shadow-2xl overflow-y-auto">
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
      </div>
    </div>
  );
}
