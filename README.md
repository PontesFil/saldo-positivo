# Saldo+

Aplicação web de controle financeiro pessoal desenvolvida em React, com foco em organização de transações, visualização de saldo, acompanhamento de metas e experiência moderna de uso.

## Demo

- GitHub Pages: https://pontesfil.github.io/saldo-positivo/

## Funcionalidades

- adicionar transações
- editar transações
- excluir transações com confirmação
- cancelar edição de transações
- resumo financeiro automático com saldo, entradas e despesas
- filtros por tipo e categoria
- busca por título
- gráfico de despesas por categoria
- exportação de transações em CSV
- persistência com `localStorage`
- dark mode com preferência salva no navegador
- página de metas financeiras
- criação, edição e exclusão de metas
- barra de progresso visual das metas com gradiente de avanço
- sidebar interna na página Visão geral com navegação por âncora
- sidebar recolhível com tooltip no modo compacto
- layout responsivo

## Tecnologias

- React
- Vite
- JavaScript
- React Router DOM
- CSS puro
- Recharts
- localStorage

## Como rodar localmente

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
```

Os arquivos de produção são gerados em `.vite-output/`.

## Estrutura resumida do projeto

```text
src/
  assets/
  components/
    finance/
    layout/
  pages/
    About/
    Dashboard/
    MetasPage/
  styles/
  utils/
  App.jsx
  main.jsx
```

## Páginas principais

### Visão geral

- resumo financeiro com cards
- formulário de transações
- gráfico de despesas por categoria
- lista de transações com filtros
- exportação de dados em CSV
- navegação lateral interna por seções

### Metas

- cadastro de metas financeiras
- valor desejado e valor atual
- progresso percentual
- barra visual de progresso
- ações de editar e excluir

### Sobre

- apresentação breve do projeto

## Screenshots

### Modo claro

<img width="1920" height="1080" alt="Saldo+ em modo claro" src="https://github.com/user-attachments/assets/fe50087c-c447-45ad-8983-f52295756e12" />

### Modo escuro

<img width="1920" height="1080" alt="Saldo+ em modo escuro" src="https://github.com/user-attachments/assets/2c2b8a24-fbc1-411d-99e6-fa922d407b26" />

## Aprendizados e destaques técnicos

- estruturação de uma aplicação React com Vite preparada para evolução incremental
- uso de formulários controlados para criação e edição de dados
- cálculo dinâmico de saldo, entradas, despesas e progresso de metas
- persistência local com `localStorage`
- uso de componentes reutilizáveis para cards, formulário, itens de lista, gráfico e navegação lateral
- navegação com `React Router DOM`, incluindo ajuste de `basename` para GitHub Pages
- construção de interface responsiva e dark mode usando apenas CSS puro
- geração de CSV no cliente para exportação rápida de dados
- organização visual inspirada em dashboards modernos, sem framework CSS

## Objetivo do projeto

O Saldo+ foi desenvolvido como projeto de prática e portfólio, reunindo fundamentos importantes de front-end moderno: componentização, gerenciamento de estado, experiência do usuário, responsividade, semântica e organização visual profissional.
