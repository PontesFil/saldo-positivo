import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Metas from './pages/MetasPage';

function NotFound() {
  return <h1>Página não encontrada</h1>;
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('saldo-plus-theme');

    return savedTheme === 'dark';
  });

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
    localStorage.setItem('saldo-plus-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  function handleToggleTheme() {
    setIsDarkMode((currentMode) => !currentMode);
  }

  return (
    <>
      <Header
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
      />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/metas" element={<Metas />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
