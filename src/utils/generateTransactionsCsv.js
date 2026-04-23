export default function generateTransactionsCsv(transactions) {
  const header = 'Título,Categoria,Valor,Tipo';

  const rows = transactions.map((transaction) =>
    [
      transaction.title,
      transaction.category,
      transaction.amount,
      transaction.type,
    ].join(','),
  );

  return [header, ...rows].join('\n');
}
