import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecordingScreen } from '../../components/RecordingScreen';
import { LevelResultScreen } from '../../components/LevelResultScreen';
import { AssessmentIntroScreen } from './AssessmentIntroScreen';

type AssessmentScreen = 'welcome' | 'recording' | 'result';

export function AssessmentFlow() {
  const navigate = useNavigate();
  const [currentScreen, setCurrentScreen] = useState<AssessmentScreen>('welcome');
  const [userLevel, setUserLevel] = useState<string>('');

  const handleStartTest = () => {
    setCurrentScreen('recording');
  };

  const handleSkip = () => {
    navigate('/learner/teachers');
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
    <div className="min-h-screen" dir="rtl">
      {currentScreen === 'welcome' && (
        <AssessmentIntroScreen onStart={handleStartTest} onSkip={handleSkip} />
      )}
      {currentScreen === 'recording' && (
        <RecordingScreen onComplete={handleTestComplete} onBack={handleBack} />
      )}
      {currentScreen === 'result' && (
        <LevelResultScreen level={userLevel} onViewTutors={handleViewTutors} />
      )}
    </div>
  );
}
