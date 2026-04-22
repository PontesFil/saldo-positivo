import React, { useEffect, useState } from 'react';
import formatCurrency from '../../utils/formatCurrency';

function normalizeGoals(savedGoals) {
  return savedGoals.map((goal) => ({
    id: goal.id || Date.now() + Math.random(),
    name: goal.name || goal.nomeMeta || '',
    targetAmount: Number(goal.targetAmount || goal.valorMeta || 0),
    currentAmount: Number(goal.currentAmount || goal.valorAtual || 0),
  }));
}

function getGoalProgress(goal) {
  if (!goal.targetAmount) {
    return 0;
  }

  return Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
}

export default function Metas() {
  const [goalName, setGoalName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [editingGoalId, setEditingGoalId] = useState(null);
  const [activeGoalId, setActiveGoalId] = useState(null);
  const [goals, setGoals] = useState(() => {
    const savedGoals = localStorage.getItem('metas');

    if (!savedGoals) {
      return [];
    }

    return normalizeGoals(JSON.parse(savedGoals));
  });

  useEffect(() => {
    localStorage.setItem('metas', JSON.stringify(goals));
  }, [goals]);

  function resetForm() {
    setGoalName('');
    setGoalAmount('');
    setCurrentAmount('');
    setEditingGoalId(null);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const normalizedGoal = {
      id: editingGoalId || Date.now(),
      name: goalName,
      targetAmount: Number(goalAmount),
      currentAmount: Number(currentAmount),
    };

    if (editingGoalId) {
      setGoals((currentGoals) =>
        currentGoals.map((goal) =>
          goal.id === editingGoalId ? normalizedGoal : goal,
        ),
      );
    } else {
      setGoals((currentGoals) => [...currentGoals, normalizedGoal]);
    }

    resetForm();
  }

  function handleEditGoal(goal) {
    setGoalName(goal.name);
    setGoalAmount(String(goal.targetAmount));
    setCurrentAmount(String(goal.currentAmount));
    setEditingGoalId(goal.id);
    setActiveGoalId(goal.id);
  }

  function handleDeleteGoal(goalId) {
    const confirmed = window.confirm(
      'Tem certeza que deseja excluir esta meta?',
    );

    if (!confirmed) {
      return;
    }

    setGoals((currentGoals) =>
      currentGoals.filter((goal) => goal.id !== goalId),
    );

    if (editingGoalId === goalId) {
      resetForm();
    }

    if (activeGoalId === goalId) {
      setActiveGoalId(null);
    }
  }

  function handleCancelEdit() {
    resetForm();
  }

  function handleToggleGoalActions(goalId) {
    setActiveGoalId((currentGoalId) =>
      currentGoalId === goalId ? null : goalId,
    );
  }

  return (
    <main className="page-content dashboard-container">
      <h1 className="dashboard-title">Metas financeiras</h1>

      <section className="dashboard-section" aria-labelledby="goals-form-title">
        <h2 id="goals-form-title" className="section-title">
          {editingGoalId ? 'Editar meta' : 'Criar nova meta'}
        </h2>
        <p className="section-description">
          Registre objetivos importantes, acompanhe o valor atual e visualize o
          avanço de cada meta.
        </p>

        <form className="transaction-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="goal-name">Nome da meta</label>
            <input
              id="goal-name"
              type="text"
              required
              placeholder="Ex: Reserva de emergência"
              value={goalName}
              onChange={(event) => setGoalName(event.target.value)}
            />
          </div>

          <div className="goals-form-grid">
            <div className="form-field">
              <label htmlFor="goal-amount">Valor desejado</label>
              <div className="currency-field">
                <span className="currency-prefix">R$</span>
                <input
                  id="goal-amount"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  required
                  placeholder="0,00"
                  value={goalAmount}
                  onChange={(event) => setGoalAmount(event.target.value)}
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="goal-current-amount">Valor atual</label>
              <div className="currency-field">
                <span className="currency-prefix">R$</span>
                <input
                  id="goal-current-amount"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  required
                  placeholder="0,00"
                  value={currentAmount}
                  onChange={(event) => setCurrentAmount(event.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button className="btn btn-primary" type="submit">
              {editingGoalId ? 'Salvar meta' : 'Adicionar meta'}
            </button>
            {editingGoalId && (
              <button
                className="btn btn-secondary"
                type="button"
                onClick={handleCancelEdit}
              >
                Cancelar edição
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="dashboard-section" aria-labelledby="goals-list-title">
        <h2 id="goals-list-title" className="section-title">
          Minhas metas
        </h2>

        {goals.length === 0 ? (
          <p className="empty-state">
            Você ainda não cadastrou metas financeiras.
          </p>
        ) : (
          <div className="goals-grid">
            {goals.map((goal) => {
              const progress = getGoalProgress(goal);
              const isActive = activeGoalId === goal.id;

              return (
                <article
                  key={goal.id}
                  className={`goal-card ${isActive ? 'goal-card--active' : ''}`}
                  onClick={() => handleToggleGoalActions(goal.id)}
                >
                  <div className="goal-card__header">
                    <div>
                      <h3 className="goal-card__title">{goal.name}</h3>
                      <p className="goal-card__label">
                        {formatCurrency(goal.currentAmount)} de{' '}
                        {formatCurrency(goal.targetAmount)}
                      </p>
                    </div>
                    <span className="goal-card__percentage">
                      {Math.round(progress)}%
                    </span>
                  </div>

                  <div className="goal-progress" aria-hidden="true">
                    <div
                      className="goal-progress__fill"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <p className="goal-card__amount">
                    {progress >= 100 ? 'Meta concluída' : 'Clique para ações'}
                  </p>

                  {isActive && (
                    <div className="goal-card__actions">
                      <button
                        className="btn btn-edit"
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleEditGoal(goal);
                        }}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-delete"
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleDeleteGoal(goal.id);
                        }}
                      >
                        Excluir
                      </button>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
