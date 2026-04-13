import React from 'react';
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import formatCurrency from '../../utils/formatCurrency';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4560'];

export default function ExpensesChart({ data }) {
  if (data.length === 0) {
    return <p className="chart-empty">Sem despesas para exibir</p>;
  }

  return (
    <div className="expenses-chart">
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} dataKey="total" nameKey="category">
              {data.map((entry, index) => (
                <Cell key={entry.category} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-legend">
        {data.map((item) => (
          <div className="chart-legend-item" key={item.category}>
            <span className="chart-legend-category">{item.category}</span>
            <span className="chart-legend-value">{formatCurrency(item.total)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
