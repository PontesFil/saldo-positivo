export default function formatCategoryLabel(category) {
  const labels = {
    alimentacao: 'Alimentação',
    moradia: 'Moradia',
    transporte: 'Transporte',
    lazer: 'Lazer',
    salario: 'Salário',
    outros: 'Outros',
  };

  return labels[category] || category;
}
