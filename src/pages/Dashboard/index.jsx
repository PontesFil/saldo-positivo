import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ExpensesChart from '../../components/finance/ExpensesChart';
import SummaryCard from '../../components/finance/SummaryCard';
import TransactionForm from '../../components/finance/TransactionForm';
import TransactionItem from '../../components/finance/TransactionItem';
import DashboardSidebar from '../../components/layout/DashboardSidebar';

export default function Dashboard() {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('saldo-plus-transactions');

    if (savedTransactions) {
      return JSON.parse(savedTransactions);
    }

    return [
      {
        id: 1,
        title: 'Salário',
        amount: 4000,
        type: 'income',
        category: 'salario',
      },
      {
        id: 2,
        title: 'Aluguel',
        amount: 1200,
        type: 'expense',
        category: 'moradia',
      },
      {
        id: 3,
        title: 'Freelance',
        amount: 800,
        type: 'income',
        category: 'outros',
      },
    ];
  });
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      'saldo-plus-transactions',
      JSON.stringify(transactions),
    );
  }, [transactions]);

  function handleAddTransaction(newTransaction) {
    setTransactions((currentTransactions) => [
      ...currentTransactions,
      newTransaction,
    ]);
  }

  function handleDeleteTransaction(id) {
    const confirmed = window.confirm(
      'Tem certeza que deseja excluir esta transação?',
    );

    if (!confirmed) {
      return;
    }

    setTransactions((currentTransactions) =>
      currentTransactions.filter((transaction) => transaction.id !== id),
    );
  }

  function handleEditTransaction(transaction) {
    setEditingTransaction(transaction);
  }

  function handleUpdateTransaction(updatedTransaction) {
    setTransactions((currentTransactions) =>
      currentTransactions.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction,
      ),
    );

    setEditingTransaction(null);
  }

  function handleCancelEdit() {
    setEditingTransaction(null);
  }

  const incomeTotal = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expenseTotal = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = incomeTotal - expenseTotal;

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesType =
      typeFilter === 'all' || transaction.type === typeFilter;
    const matchesCategory =
      categoryFilter === 'all' || transaction.category === categoryFilter;
    const matchesSearch =
      searchTerm === '' ||
      transaction.title.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesType && matchesCategory && matchesSearch;
  });

  const expensesByCategory = Object.entries(
    transactions
      .filter((transaction) => transaction.type === 'expense')
      .reduce((categories, transaction) => {
        return {
          ...categories,
          [transaction.category]:
            (categories[transaction.category] || 0) + transaction.amount,
        };
      }, {}),
  ).map(([category, total]) => ({
    category,
    total,
  }));

  return (
    <main className="page-content dashboard-container">
      <h1 className="dashboard-title">Visão geral</h1>
      <div className="dashboard-layout">
        <DashboardSidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed((previous) => !previous)}
        />

        <div className="dashboard-main">
          <section
            id="summary"
            className="dashboard-section"
            aria-labelledby="summary-title"
          >
            <h2 id="summary-title" className="section-title">
              Resumo financeiro
            </h2>
            <div className="summary-grid">
              <SummaryCard title="Saldo" amount={balance} />
              <SummaryCard title="Entradas" amount={incomeTotal} />
              <SummaryCard title="Despesas" amount={expenseTotal} />
            </div>
          </section>

          <section
            className="dashboard-section dashboard-highlight"
            aria-labelledby="goals-section-title"
          >
            <div className="section-header">
              <div>
                <h2 id="goals-section-title" className="section-title">
                  Metas financeiras
                </h2>
                <p className="section-description">
                  Organize seus objetivos e acompanhe os valores que você quer
                  alcançar.
                </p>
              </div>
              <Link to="/metas" className="btn btn-secondary">
                Abrir metas
              </Link>
            </div>
          </section>

          <section
            id="add-transaction"
            className="dashboard-section"
            aria-labelledby="add-transaction-title"
          >
            <h2 id="add-transaction-title" className="section-title">
              Adicionar transação
            </h2>
            <TransactionForm
              onAddTransaction={handleAddTransaction}
              onUpdateTransaction={handleUpdateTransaction}
              onCancelEdit={handleCancelEdit}
              editingTransaction={editingTransaction}
            />
          </section>

          <section
            id="expenses-chart"
            className="dashboard-section"
            aria-labelledby="expenses-chart-title"
          >
            <h2 id="expenses-chart-title" className="section-title">
              Despesas por categoria
            </h2>
            <ExpensesChart data={expensesByCategory} />
          </section>

          <section
            id="transactions"
            className="dashboard-section transactions-section"
            aria-labelledby="transactions-title"
          >
            <h2 id="transactions-title" className="section-title">
              Transações
            </h2>
            <div className="filters-row">
              <input
                type="text"
                placeholder="Buscar transação"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <select
                value={typeFilter}
                onChange={(event) => setTypeFilter(event.target.value)}
              >
                <option value="all">Todos os tipos</option>
                <option value="income">Entrada</option>
                <option value="expense">Despesa</option>
              </select>
              <select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
              >
                <option value="all">Todas as categorias</option>
                <option value="alimentacao">Alimentação</option>
                <option value="moradia">Moradia</option>
                <option value="transporte">Transporte</option>
                <option value="lazer">Lazer</option>
                <option value="salario">Salário</option>
                <option value="outros">Outros</option>
              </select>
            </div>
            <div className="transactions-list">
              {[...filteredTransactions]
                .sort((firstTransaction, secondTransaction) => {
                  return secondTransaction.id - firstTransaction.id;
                })
                .map((transaction) => (
                  <TransactionItem
                    key={transaction.id}
                    id={transaction.id}
                    title={transaction.title}
                    amount={transaction.amount}
                    type={transaction.type}
                    category={transaction.category}
                    onEdit={handleEditTransaction}
                    onDelete={handleDeleteTransaction}
                  />
                ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
