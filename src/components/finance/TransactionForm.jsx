import React, { useEffect, useState } from 'react';

export default function TransactionForm({
  onAddTransaction,
  onUpdateTransaction,
  onCancelEdit,
  editingTransaction,
}) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');
  const [category, setCategory] = useState('outros');

  useEffect(() => {
    if (!editingTransaction) {
      return;
    }

    setTitle(editingTransaction.title);
    setAmount(editingTransaction.amount);
    setType(editingTransaction.type);
    setCategory(editingTransaction.category);
  }, [editingTransaction]);

  function handleCancel() {
    setTitle('');
    setAmount('');
    setType('income');
    setCategory('outros');
    onCancelEdit();
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (editingTransaction) {
      const updatedTransaction = {
        id: editingTransaction.id,
        title,
        amount: Number(amount),
        type,
        category,
      };

      onUpdateTransaction(updatedTransaction);
    } else {
      const newTransaction = {
        id: Date.now(),
        title,
        amount: Number(amount),
        type,
        category,
      };

      onAddTransaction(newTransaction);
    }

    setTitle('');
    setAmount('');
    setType('income');
    setCategory('outros');
  }

  return (
    <>
      {editingTransaction && (
        <div className="editing-banner">
          Editando transação: {editingTransaction.title}
        </div>
      )}

      <form className="transaction-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="transaction-title">Título</label>
          <input
            id="transaction-title"
            type="text"
            required
            placeholder="Ex: Mercado do mês"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="transaction-amount">Valor</label>
          <div className="currency-field">
            <span className="currency-prefix">R$</span>
            <input
              id="transaction-amount"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              required
              placeholder="0,00"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="transaction-type">Tipo</label>
          <select
            id="transaction-type"
            value={type}
            onChange={(event) => setType(event.target.value)}
          >
            <option value="income">Entrada</option>
            <option value="expense">Despesa</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="transaction-category">Categoria</label>
          <select
            id="transaction-category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="alimentacao">Alimentação</option>
            <option value="moradia">Moradia</option>
            <option value="transporte">Transporte</option>
            <option value="lazer">Lazer</option>
            <option value="salario">Salário</option>
            <option value="outros">Outros</option>
          </select>
        </div>

        <div className="form-actions">
          <button className="btn btn-primary" type="submit">
            {editingTransaction ? 'Salvar' : 'Adicionar'}
          </button>
          {editingTransaction && (
            <button
              className="btn btn-secondary"
              type="button"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </>
  );
}
