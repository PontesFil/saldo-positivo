import React, { useEffect, useState } from 'react';
import ExpensesChart from '../../components/finance/ExpensesChart';
import SummaryCard from '../../components/finance/SummaryCard';
import TransactionForm from '../../components/finance/TransactionForm';
import TransactionItem from '../../components/finance/TransactionItem';

export default function Dashboard() {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('saldo-plus-transactions');

    if (savedTransactions) {
      return JSON.parse(savedTransactions);
    }

    return [
      {
        id: 1,
        title: 'Salario',
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

      <section className="dashboard-section" aria-labelledby="summary-title">
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
        className="dashboard-section"
        aria-labelledby="expenses-chart-title"
      >
        <h2 id="expenses-chart-title" className="section-title">
          Despesas por categoria
        </h2>
        <ExpensesChart data={expensesByCategory} />
      </section>

      <section
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
            <option value="all">all</option>
            <option value="income">Entrada</option>
            <option value="expense">Despesa</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
          >
            <option value="all">all</option>
            <option value="alimentacao">alimentação</option>
            <option value="moradia">moradia</option>
            <option value="transporte">transporte</option>
            <option value="lazer">lazer</option>
            <option value="salario">salário</option>
            <option value="outros">outros</option>
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
    </main>
  );
}
