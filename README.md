# Saldo+

Aplicação web de controle financeiro pessoal desenvolvida em React, com foco em organização de transações, visualização de saldo e experiência moderna de uso.

## Funcionalidades

- adicionar transações
- editar transações
- excluir transações
- cancelar edição
- resumo financeiro automático
- filtros por tipo
- filtros por categoria
- busca por título
- gráfico de despesas por categoria
- persistência com `localStorage`
- dark mode
- layout responsivo

## Tecnologias

- React
- Vite
- JavaScript
- CSS puro
- Recharts
- localStorage

## Como rodar localmente

```bash
npm install
npm run dev
```

## Estrutura do projeto

```text
src/
  assets/
  components/
    finance/
    layout/
    ui/
  hooks/
  pages/
    About/
    Dashboard/
  services/
  styles/
  utils/
  App.jsx
  main.jsx
```

## Screenshots

### Modo claro

Adicione aqui uma imagem da aplicação no tema claro.

### Modo escuro

Adicione aqui uma imagem da aplicação no tema escuro.

## Aprendizados e destaques técnicos

- Estruturação de uma aplicação React com Vite focada em escalabilidade gradual.
- Manipulação de estado com formulários controlados para criação e edição de transações.
- Cálculo dinâmico de saldo, entradas e despesas com base na lista de transações.
- Persistência local com `localStorage` para manter os dados do usuário entre sessões.
- Implementação de filtros combinados por tipo, categoria e busca textual.
- Uso de gráficos com Recharts para melhorar a visualização dos dados financeiros.
- Construção de interface responsiva e dark mode com CSS puro, sem frameworks visuais.

## Objetivo do projeto

O Saldo+ foi desenvolvido como projeto de prática e portfólio, buscando reunir fundamentos importantes de front-end moderno: componentização, gerenciamento de estado, experiência do usuário, responsividade e organização visual profissional.
