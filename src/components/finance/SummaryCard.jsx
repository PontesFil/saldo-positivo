import React from 'react';
import formatCurrency from '../../utils/formatCurrency';

export default function SummaryCard({ title, amount }) {
  return (
    <article className="summary-card">
      <h2 className="summary-card__title">{title}</h2>
      <p className="summary-card__value">{formatCurrency(amount)}</p>
    </article>
  );
}
