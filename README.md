# CUIDA+

**Cuidado e carinho na palma da sua mão.**

Cuida+ é uma plataforma que conecta **idosos**, seus **familiares/responsáveis** e **cuidadores profissionais**, facilitando a busca, o agendamento e o acompanhamento de serviços de cuidado.

🔗 **Demo:** [cuida-mais-wheat.vercel.app](https://cuida-mais-wheat.vercel.app)

> **Status do projeto:** o front-end está funcional para os perfis de idoso e familiar e publicado na Vercel. Enquanto a API não existe, os dados (usuários, cuidadores, agendamentos e mensagens) são **simulados e salvos no `localStorage`** do navegador. O back-end em Java/Spring Boot com PostgreSQL é a próxima etapa. O modelo de negócio e os planos de assinatura ainda são hipóteses de trabalho.

Parte das telas e da linguagem foi inspirada em um protótipo de referência feito no Manus.

---

## Sumário

- [Visão geral](#visão-geral)
- [Situação atual](#situação-atual)
- [Tipos de usuário](#tipos-de-usuário)
- [Fluxo principal](#fluxo-principal)
- [Landing pública](#landing-pública-institucional)
- [Autenticação e rotas](#autenticação-e-rotas-fase-local)
- [Stack tecnológica](#stack-tecnológica)
- [Persistência de dados](#persistência-de-dados-localstorage)
- [Design e acessibilidade](#design-e-acessibilidade)
- [Estrutura de pastas](#estrutura-de-pastas-feature-based)
- [Roadmap](#roadmap)
- [Como rodar](#como-rodar)
- [Autor](#autor)

---

## Visão geral

Cada pessoa vive a maturidade de um jeito. O Cuida+ existe para aproximar quem precisa de cuidado de quem pode oferecer esse cuidado com qualificação, segurança e afeto, respeitando a autonomia do idoso e a tranquilidade da família.

A plataforma tem três pontas:

- **Idoso** — pode ser independente e usar o app diretamente, escolhendo como quer ser apoiado.
- **Familiar/Responsável** — acompanha de perto, escolhe e agenda cuidadores para quem ama.
- **Cuidador** — profissional (cuidador de idosos, técnico de enfermagem, especialista em geriatria etc.) que oferece disponibilidade e presta o serviço.

## Situação atual

| Funcionalidade | Situação |
| --- | --- |
| Landing institucional (hero, categorias, como funciona, FAQ, contato) | ✅ Feita |
| Cadastro e login com três perfis (dados locais) | ✅ Feita |
| Rotas protegidas por tipo de usuário | ✅ Feita |
| Agenda: ver cuidadores livres, agendar e cancelar | ✅ Feita (dados simulados) |
| Chat com o cuidador | ✅ Feita (conversas simuladas, resposta automática) |
| Planos de assinatura | 🟡 Tela pronta, valores provisórios |
| Área do cuidador (agenda, aceitar/recusar solicitações) | 🟡 Área provisória |
| Pedir ajuda rápida (SOS) | ⏳ Planejada |
| API REST em Spring Boot + PostgreSQL | ⏳ Próxima etapa |

## Tipos de usuário

### 🧓 Idoso

- Área personalizada, com saudação e atalhos rápidos.
- Ver e agendar cuidadores disponíveis.
- **"Minha agenda"** — atendimentos marcados.
- Chat direto com o cuidador.
- *(Planejado)* botão de **"Pedir ajuda rápida"** (SOS).

### 👨‍👩‍👧 Familiar / Responsável

- Escolhe a cidade de atendimento e consulta a agenda em formato de calendário.
- Vê a **vitrine de profissionais**: nome, especialidade, nota por estrelas e disponibilidade.
- Solicita o atendimento ao cuidador escolhido e acompanha a rotina do idoso.

### 🩺 Cuidador

- Perfil público na vitrine de profissionais.
- *(Planejado)* definir disponibilidade, receber solicitações e aceitar ou recusar atendimentos.

## Fluxo principal

1. O usuário faz login ou se cadastra, informando o tipo de perfil.
2. Idoso ou familiar acessa a área logada.
3. Escolhe a cidade e a data do atendimento.
4. Vê os cuidadores disponíveis, com avaliação e horários.
5. Agenda o atendimento; ele aparece em "Meus agendamentos".
6. O chat fica disponível para alinhar detalhes.
7. *(Futuro)* o acesso ao serviço passa a depender de uma assinatura ativa.

## Landing pública (institucional)

Antes do login existe uma página institucional com:

- **Hero** com a proposta de valor e chamadas para ação.
- **Categorias de serviço:** *Companhia que faz bem*, *Apoio na rotina*, *Bem-estar sob medida*.
- **Como funciona**, em 3 passos.
- **Nossa essência**, com os valores do projeto.
- **FAQ** e **formulário de contato** para quem ainda não tem conta.

## Autenticação e rotas (fase local)

Enquanto a API não está pronta, cadastro e login guardam os dados no `localStorage`:

- Nome, e-mail (único, sem diferenciar maiúsculas) e tipo de usuário.
- Senha com mínimo de 8 caracteres; é guardado apenas o hash SHA-256.
- CPF único, validado pelos dígitos verificadores e guardado só com números.

| Rota | Acesso | Conteúdo |
| --- | --- | --- |
| `/login` | só visitante | Login com e-mail e senha |
| `/cadastro` | só visitante | Cadastro com escolha do perfil |
| `/inicio` | só logado | Próximo atendimento, disponíveis hoje, mensagens, planos e suporte |
| `/agenda` | idoso e familiar | Cuidadores livres nos próximos 7 dias; agendar e cancelar |
| `/chat`, `/chat/:caregiverId` | idoso e familiar | Conversas com os cuidadores |
| `/planos` | idoso e familiar | Os 3 planos (valores provisórios) |
| `/suporte` | só logado | Perguntas frequentes, telefone e WhatsApp |
| `/conta` | só logado | Dados da conta e botão de sair |

A área logada usa o `AppLayout`: barra lateral fixa no desktop e barra inferior no celular. Cuidadores, conversas e horários são **mockados** (`src/mocks/caregivers.js`, `features/chat/mockConversations.js`).

Toda a lógica de autenticação fica isolada em `features/auth` (serviço em `services/authStorage.js`, estado global em `contexts/AuthContext.jsx`, acesso pelo hook `useAuth`), para facilitar a troca pela API. O hash no navegador serve apenas para não deixar senhas legíveis no `localStorage`; a segurança de verdade virá com o back-end.

## Stack tecnológica

| Camada | Tecnologia |
| --- | --- |
| Front-end | **React 19** (JavaScript/JSX) + **Vite** |
| Back-end *(planejado)* | **Spring Boot** (Java), API REST |
| Banco de dados *(planejado)* | **PostgreSQL** |
| Hospedagem do front-end | **Vercel** |

Bibliotecas do front-end:

- **Tailwind CSS v4** — estilos, via plugin do Vite (sem `tailwind.config.js`; fontes e estilos base em `src/styles/globals.css`).
- [`react-router-dom`](https://reactrouter.com/) — rotas e proteção por tipo de usuário.
- [`react-icons`](https://react-icons.github.io/react-icons/) — ícones (conjunto Lucide).
- [`sonner`](https://sonner.emilkowal.ski/) — notificações de sucesso e erro.

Bibliotecas em avaliação: `react-hook-form` + `zod` (formulários), `date-fns` (datas), `clsx` e `zustand`.

## Persistência de dados (localStorage)

Todos os dados são salvos no `localStorage` por uma camada de acesso única em `lib/storage`, que expõe `get`, `set` e `remove` por "coleção" (`users`, `caregivers`, `appointments` etc.). Assim, a troca por chamadas à API Spring Boot, com os dados no PostgreSQL, exige o mínimo de mudança no restante do app.

## Design e acessibilidade

- **Paleta:** azul petróleo escuro (institucional), creme/off-white (fundo acolhedor) e azul claro (destaque/ação).
- **Tipografia:** títulos em fonte serifada editorial; corpo em sans-serif legível.
- **Tom de voz:** acolhedor, calmo e humano, sem linguagem corporativa ou técnica em excesso.
- **Acessibilidade** (importante para o público idoso): bom contraste, alvos de toque grandes, textos claros e diretos, e botão para aumentar o tamanho do texto *(planejado)*.

## Estrutura de pastas (feature-based)

Organização por **features**: cada pasta em `features/` concentra a regra de negócio e a UI de um domínio, com o mesmo padrão interno (`components/`, `hooks/`, `pages/`, `services/`, conforme a necessidade).

```
Cuida-mais/
├── public/
├── src/
│   ├── app/                       # App.jsx, router, providers globais
│   ├── assets/                    # imagens, fontes, ícones
│   ├── components/ui/             # Logo, TextField, PasswordField, Toaster, Card, PageHeader
│   ├── features/
│   │   ├── marketing/             # landing pública institucional
│   │   ├── auth/                  # cadastro, login, perfis (roles.js, validation.js)
│   │   ├── home/                  # HomePage (/inicio)
│   │   ├── scheduling/            # AgendaPage, horários livres, confirmação, meus agendamentos
│   │   ├── chat/                  # lista de conversas e conversa aberta
│   │   ├── subscription/          # PlansPage + plans.js (planos provisórios)
│   │   ├── support/               # perguntas frequentes e contatos
│   │   ├── account/               # dados da conta, sair
│   │   ├── caregivers/            # CaregiverAvatar (futuro: perfil e avaliações)
│   │   ├── caregiver-agenda/      # (futuro) solicitações, aceitar/recusar, disponibilidade
│   │   └── emergency/             # (futuro) "Pedir ajuda rápida" (SOS)
│   ├── contexts/                  # AuthContext, ChatContext
│   ├── hooks/                     # hooks globais reutilizáveis
│   ├── layouts/                   # MarketingLayout, AuthLayout, AppLayout
│   ├── lib/storage/               # wrapper sobre localStorage (até a API ficar pronta)
│   ├── mocks/                     # cuidadores e horários fictícios
│   ├── routes/                    # ProtectedRoute, GuestRoute, RoleRoute
│   ├── styles/                    # globals.css
│   ├── utils/                     # cpf.js, name.js, date.js
│   └── main.jsx
├── index.html
├── jsconfig.json                  # alias "@/" → src/
├── vite.config.js                 # plugins React e Tailwind + alias "@/"
└── package.json
```

## Roadmap

**Concluído**

- [x] Landing institucional
- [x] Cadastro e login locais com três perfis e rotas protegidas
- [x] Agenda, chat simulado e tela de planos
- [x] Publicação do front-end na Vercel

**Próximos passos**

- [ ] Criar a API em Spring Boot + PostgreSQL e substituir o `localStorage` por ela.
- [ ] Autenticação real (JWT) no back-end.
- [ ] Área do cuidador: disponibilidade e solicitações.
- [ ] Chat em tempo real.
- [ ] Fluxo de emergência/SOS.
- [ ] Avaliação de cuidadores após o atendimento.
- [ ] Notificações (agendamento, solicitação aceita ou recusada).
- [ ] Definir o modelo de negócio e os planos; pagamentos com Stripe.

## Como rodar

Requer Node.js 20.19+ ou 22.12+.

```bash
npm install
npm run dev       # servidor de desenvolvimento em http://localhost:5174
npm run build     # build de produção em dist/
npm run preview   # serve o build localmente
```

O back-end (Spring Boot + PostgreSQL) ainda não foi iniciado.

## Autor

**João Pedro Uggioni Damin** · [GitHub](https://github.com/joaouggdmn) · [LinkedIn](https://linkedin.com/in/joaopedrouggioni)
