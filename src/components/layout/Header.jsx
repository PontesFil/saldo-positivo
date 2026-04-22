import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/logo-saldo.svg';

export default function Header({ isDarkMode, onToggleTheme }) {
  return (
    <header className="app-header">
      <nav className="app-nav">
        <Link to="/" className="app-logo">
          <img src={logo} alt="Saldo+" />
        </Link>
        <NavLink to="/">Visão geral</NavLink>
        <NavLink to="/metas">Metas</NavLink>
        <NavLink to="/about">Sobre</NavLink>
        <button
          className="btn btn-secondary theme-toggle theme-toggle-btn"
          type="button"
          onClick={onToggleTheme}
        >
          {isDarkMode ? 'Modo claro' : 'Modo escuro'}
        </button>
      </nav>
    </header>
  );
}
