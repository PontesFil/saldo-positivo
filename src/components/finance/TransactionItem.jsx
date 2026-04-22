import React from 'react';
import formatCategoryLabel from '../../utils/formatCategoryLabel';
import formatCurrency from '../../utils/formatCurrency';

export default function TransactionItem({
  id,
  title,
  category,
  amount,
  type,
  onEdit,
  onDelete,
}) {
  const articleClass =
    type === 'income' ? 'transaction-income' : 'transaction-expense';

  return (
    <article className={`transaction-item ${articleClass}`}>
      <div className="transaction-content">
        <h3 className="transaction-title">{title}</h3>
        <p className="transaction-category">{formatCategoryLabel(category)}</p>
      </div>
      <div className="transaction-meta">
        <p className="transaction-amount">{formatCurrency(amount)}</p>
        <span className={`transaction-type ${type}`}>
          {type === 'income' ? 'Entrada' : 'Despesa'}
        </span>
      </div>
      <div className="transaction-actions">
        <button
          className="btn btn-edit"
          type="button"
          onClick={() => onEdit({ id, title, amount, type, category })}
        >
          Editar
        </button>
        <button
          className="btn btn-delete"
          type="button"
          onClick={() => onDelete(id)}
        >
          Excluir
        </button>
      </div>
    </article>
  );
}
