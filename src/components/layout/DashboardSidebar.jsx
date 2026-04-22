import React from 'react';

export default function DashboardSidebar({ isCollapsed, onToggle }) {
  return (
    <aside
      className={`dashboard-sidebar ${isCollapsed ? 'is-collapsed' : ''}`}
    >
      <div className="dashboard-sidebar__card">
        <div className="dashboard-sidebar__header">
          {!isCollapsed && (
            <h2 className="dashboard-sidebar__title">Navegação</h2>
          )}
          <button
            className="btn btn-secondary dashboard-sidebar__toggle"
            type="button"
            onClick={onToggle}
            aria-label={
              isCollapsed
                ? 'Expandir navegação lateral'
                : 'Recolher navegação lateral'
            }
          >
            {isCollapsed ? '›' : '‹'}
          </button>
        </div>
        <nav aria-label="Navegação da visão geral">
          <a
            className="dashboard-sidebar__link"
            href="#summary"
            title={isCollapsed ? 'Resumo financeiro' : undefined}
          >
            {isCollapsed ? (
              <span className="dashboard-sidebar__link-icon">R</span>
            ) : (
              <span className="dashboard-sidebar__link-text">
                Resumo financeiro
              </span>
            )}
          </a>
          <a
            className="dashboard-sidebar__link"
            href="#add-transaction"
            title={isCollapsed ? 'Adicionar transação' : undefined}
          >
            {isCollapsed ? (
              <span className="dashboard-sidebar__link-icon">A</span>
            ) : (
              <span className="dashboard-sidebar__link-text">
                Adicionar transação
              </span>
            )}
          </a>
          <a
            className="dashboard-sidebar__link"
            href="#expenses-chart"
            title={isCollapsed ? 'Despesas por categoria' : undefined}
          >
            {isCollapsed ? (
              <span className="dashboard-sidebar__link-icon">D</span>
            ) : (
              <span className="dashboard-sidebar__link-text">
                Despesas por categoria
              </span>
            )}
          </a>
          <a
            className="dashboard-sidebar__link"
            href="#transactions"
            title={isCollapsed ? 'Transações' : undefined}
          >
            {isCollapsed ? (
              <span className="dashboard-sidebar__link-icon">T</span>
            ) : (
              <span className="dashboard-sidebar__link-text">Transações</span>
            )}
          </a>
        </nav>
      </div>
    </aside>
  );
}
