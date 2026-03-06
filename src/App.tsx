import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import TodayPage from './pages/TodayPage';
import SessionPage from './pages/SessionPage';
import CalendarPage from './pages/CalendarPage';
import ProgressPage from './pages/ProgressPage';
import TemplatesPage from './pages/TemplatesPage';
import ExportPage from './pages/ExportPage';
import SharePage from './pages/SharePage';
import SettingsPage from './pages/SettingsPage';
import WelcomePage from './pages/WelcomePage';
import { getProfile } from './db/operations';
import type { UserProfile } from './types';

export default function App() {
  const [profile, setProfile] = useState<UserProfile | null | undefined>(undefined);

  const checkProfile = async () => {
    const p = await getProfile();
    setProfile(p ?? null);
  };

  useEffect(() => {
    checkProfile();
  }, []);

  // Loading state
  if (profile === undefined) {
    return null;
  }

  // No account yet → welcome screen
  if (profile === null) {
    return <WelcomePage onCreated={checkProfile} />;
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<TodayPage />} />
        <Route path="/session/:id" element={<SessionPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/export" element={<ExportPage />} />
        <Route path="/share" element={<SharePage />} />
        <Route path="/settings" element={<SettingsPage profile={profile} onProfileUpdate={checkProfile} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
