import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

import HomePage from './pages/HomePage';
import EventPage from './pages/EventPage';
import TeamPage from './pages/TeamPage';
import ContactPage from './pages/ContactPage';
import AchievementsPage from './pages/AchievementsPage';

import CodeClash2024Page from './pages/CodeClash2024Page';
import RustEdPage from './pages/RustEdPage';
import OnceUponACrimePage from './pages/OnceUponACrimePage';
import TError3Page from './pages/TError3Page';
import ByondCodePage from './pages/ByondCodePage';
import HeadNodePage from './pages/HeadNodePage';

import Login from './pages/Login';
import Register from './pages/Register';
import EventRegistration from './pages/EventRegistration';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route 
        path="/event-registration/:eventId" 
        element={
          <ProtectedRoute>
            <EventRegistration />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute adminOnly>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />

      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />

        <Route path="/events/codeclash-2024" element={<CodeClash2024Page />} />
        <Route path="/events/rust-ed" element={<RustEdPage />} />
        <Route path="/events/once-upon-a-crime" element={<OnceUponACrimePage />} />
        <Route path="/events/t-error-3" element={<TError3Page />} />
        <Route path="/events/byond-code" element={<ByondCodePage />} />
        <Route path="/events/head-node" element={<HeadNodePage />} />
      </Route>
    </Routes>
  );
}

export default App;