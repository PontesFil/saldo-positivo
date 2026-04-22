import React from 'react';

export default function About() {
  return (
    <main className="page-content dashboard-container">
      <section className="dashboard-section" aria-labelledby="about-title">
        <h1 id="about-title" className="dashboard-title">
          Sobre o projeto Saldo+
        </h1>
        <p className="section-description">
          Aplicação de controle financeiro pessoal desenvolvida em React, com
          foco em organização, clareza visual e acompanhamento simples da vida
          financeira.
        </p>
      </section>
    </main>
  );
}
