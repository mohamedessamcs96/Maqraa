import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WelcomeScreen } from '../../components/WelcomeScreen';
import { RecordingScreen } from '../../components/RecordingScreen';
import { LevelResultScreen } from '../../components/LevelResultScreen';

type AssessmentScreen = 'welcome' | 'recording' | 'result';

export function AssessmentFlow() {
  const navigate = useNavigate();
  const [currentScreen, setCurrentScreen] = useState<AssessmentScreen>('welcome');
  const [userLevel, setUserLevel] = useState<string>('');

  const handleStartTest = () => {
    setCurrentScreen('recording');
  };

  const handleTestComplete = () => {
    // Simulate test processing
    setTimeout(() => {
      const levels = ['مبتدئ', 'متوسط', 'متقدم', 'محترف'];
      const randomLevel = levels[Math.floor(Math.random() * levels.length)];
      setUserLevel(randomLevel);
      setCurrentScreen('result');
    }, 2000);
  };

  const handleViewTutors = () => {
    // Navigate to browse teachers page within the new platform
    navigate('/learner/teachers');
  };

  const handleBack = () => {
    if (currentScreen === 'recording') {
      setCurrentScreen('welcome');
    } else if (currentScreen === 'result') {
      // Go back to landing page
      navigate('/');
    }
  };

  return (
    <div className="w-full h-full min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-3 md:p-4">
      <div className="w-full h-full min-h-screen sm:min-h-auto sm:max-w-md sm:rounded-3xl bg-white shadow-2xl overflow-y-auto">
        {currentScreen === 'welcome' && (
          <WelcomeScreen onStartTest={handleStartTest} />
        )}
        {currentScreen === 'recording' && (
          <RecordingScreen onComplete={handleTestComplete} onBack={handleBack} />
        )}
        {currentScreen === 'result' && (
          <LevelResultScreen level={userLevel} onViewTutors={handleViewTutors} />
        )}
      </div>
    </div>
  );
}
