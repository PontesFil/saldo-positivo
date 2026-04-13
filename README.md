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

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/fe50087c-c447-45ad-8983-f52295756e12" />


### Modo escuro

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/2c2b8a24-fbc1-411d-99e6-fa922d407b26" />


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
