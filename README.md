# CUIDA+

**Cuidado e carinho na palma da sua mão.**

Cuida+ é uma plataforma que conecta **idosos**, seus **familiares/responsáveis** e **cuidadores profissionais**, facilitando a busca, o agendamento e o acompanhamento de serviços de cuidado.

> ⚠️ **Status do projeto**: fase inicial de planejamento e estruturação. Praticamente tudo neste documento — fluxos, nomes de features, modelo de negócio, identidade visual — é hipótese de trabalho e pode mudar conforme o produto evolui. O objetivo agora é ter uma base de código organizada para começar a construir a interface.

Este README documenta a visão geral do sistema e a estrutura de pastas do frontend. Parte das telas e da linguagem usada aqui foi inspirada em um protótipo de referência (feito no Manus) que já materializa parte da experiência esperada.

---

## Sumário

- [Visão geral](#visão-geral)
- [Tipos de usuário](#tipos-de-usuário)
- [Fluxo principal](#fluxo-principal)
- [Landing pública (institucional)](#landing-pública-institucional)
- [Autenticação](#autenticação-fase-local)
- [Categorias de serviço e assinatura](#categorias-de-serviço-e-assinatura-em-definição)
- [Stack tecnológica](#stack-tecnológica)
- [Persistência de dados](#persistência-de-dados-localstorage)
- [Design e acessibilidade](#design-e-acessibilidade)
- [Estrutura de pastas](#estrutura-de-pastas-feature-based)
- [Roadmap](#roadmap--próximos-passos)
- [Como rodar](#como-rodar)

---

## Visão geral

Cada pessoa vive a maturidade de um jeito. O Cuida+ existe para aproximar quem precisa de cuidado de quem pode oferecer esse cuidado com qualificação, segurança e afeto — respeitando a autonomia do idoso e a tranquilidade da família.

A plataforma tem três pontas:

- **Idoso** — pode ser independente e usar o app diretamente, escolhendo como quer ser apoiado.
- **Familiar/Responsável** — acompanha de perto, escolhe e agenda cuidadores para quem ama.
- **Cuidador** — profissional (cuidador de idosos, técnico de enfermagem, especialista em geriatria etc.) que oferece disponibilidade e presta o serviço.

## Tipos de usuário

### 🧓 Idoso

- Área personalizada própria ("Área do idoso"), com saudação e atalhos rápidos.
- Ver e agendar cuidadores disponíveis.
- Botão de **"Pedir ajuda rápida"** — solicitação de urgência/SOS (placeholder, sem lógica definida ainda).
- **"Minha agenda"** — visão dos atendimentos marcados no dia.
- Chat direto com o cuidador ("Abrir conversa").

### 👨‍👩‍👧 Familiar / Responsável

- Escolhe a cidade de atendimento.
- Consulta a agenda em formato calendário e escolhe o dia desejado.
- Visualiza a **"Vitrine de profissionais"**: cards de cuidadores com nome, especialidade (ex: cuidadora de idosos, técnico em enfermagem, especialista em geriatria), nota por estrelas e disponibilidade ("disponível hoje/amanhã").
- Solicita o atendimento para o cuidador escolhido.
- Acompanha a rotina e os atendimentos do idoso sob sua responsabilidade.

### 🩺 Cuidador

- Tem um perfil público que aparece na vitrine de profissionais (nome, especialidade, avaliação).
- Define sua própria disponibilidade/agenda.
- Recebe solicitações de atendimento e pode **aceitar ou recusar**.
- Acompanha sua própria agenda de compromissos confirmados.
- Chat com o idoso/familiar.

## Fluxo principal

1. Usuário faz login ou se cadastra, informando o tipo de perfil (idoso, familiar ou cuidador).
2. Idoso independente ou familiar acessa a **Minha Área CUIDA+**.
3. Escolhe cidade e data desejada para o atendimento.
4. Visualiza a vitrine de cuidadores disponíveis (com avaliação e disponibilidade).
5. Solicita o atendimento com o cuidador escolhido.
6. Cuidador recebe a solicitação em sua agenda e aceita ou recusa.
7. Atendimento confirmado aparece na agenda de ambos os lados; chat fica disponível para alinhamentos.
8. *(Futuro)* Acesso ao serviço passa a depender de uma assinatura/plano ativo — modelo ainda não definido.

## Landing pública (institucional)

Antes do login, existe uma página institucional (marketing) com:

- **Hero** — proposta de valor principal e CTAs ("Quero conversar", "Conheça nosso jeito").
- **Categorias de serviço** ("O que faz bem para hoje?") — ex: *Companhia que faz bem*, *Apoio na rotina*, *Bem-estar sob medida*.
- **Como funciona** — processo em 3 passos (conta o que importa → conhecemos rotina e preferências → criamos um cuidado possível).
- **Nossa essência** — seção de valores e propósito (autonomia, escuta sem pressa, parceria com a família).
- **FAQ** — dúvidas comuns sobre como funciona o atendimento.
- **Formulário de contato** — captação de lead (nome, telefone/WhatsApp, cidade, mensagem) para quem ainda não tem conta.

## Autenticação (fase local)

Enquanto a API em Spring Boot não estiver pronta, cadastro e login guardam os dados diretamente no `localStorage`:

- Nome
- Email (único; comparado sem diferenciar maiúsculas)
- Senha — mínimo de 8 caracteres; é guardado só o hash SHA-256, nunca o texto
- CPF (único; validado pelos dígitos verificadores e guardado só com números)
- Tipo de usuário (idoso, familiar, cuidador)

Rotas:

| Rota | Acesso | Conteúdo |
|---|---|---|
| `/login` | só visitante (quem já entrou vai para `/inicio`) | Login com e-mail e senha |
| `/cadastro` | só visitante | Cadastro com escolha do perfil |
| `/inicio` | só logado (visitante vai para `/login`) | Home: próximo atendimento, disponíveis hoje, últimas mensagens, planos e suporte (o cuidador ainda vê a área provisória) |
| `/agenda` | idoso e familiar (os demais voltam para `/inicio`) | Cuidadores livres nos próximos 7 dias; agendar e cancelar |
| `/chat`, `/chat/:caregiverId` | idoso e familiar | Conversas com os cuidadores (resposta automática de exemplo) |
| `/planos` | idoso e familiar | Os 3 planos (valores provisórios) |
| `/suporte` | só logado | Perguntas frequentes, telefone e WhatsApp |
| `/conta` | só logado | Dados da conta e botão de sair |

A área logada usa o `AppLayout`: sidebar fixa à esquerda no desktop e barra inferior no celular. Cuidadores, conversas e horários são **mockados** (`src/mocks/caregivers.js`, `features/chat/mockConversations.js`); agendamentos e mensagens ficam salvos no `localStorage`.

Toda a lógica de autenticação fica isolada em `features/auth` (serviço em `services/authStorage.js`, estado global em `contexts/AuthContext.jsx`, acesso pelo hook `useAuth`), para facilitar a troca futura pela API do backend. O hash no navegador é só para não deixar senhas legíveis no `localStorage`; a segurança de verdade virá com a API.

## Categorias de serviço e assinatura (em definição)

O modelo de negócio ainda **não está fechado**. Hipóteses de trabalho vistas na referência, só para dar direção à estrutura:

- Categorias de serviço: *Companhia que faz bem*, *Apoio na rotina*, *Bem-estar sob medida*.
- Algum tipo de assinatura/plano para liberar o acesso ao serviço de agendamento.

A página `/planos` (feature `subscription`) já mostra 3 planos com nomes e valores provisórios em `features/subscription/plans.js`, prontos para receber a definição real.

## Stack tecnológica

| Camada | Tecnologia |
|---|---|
| Frontend | **React** (JavaScript/JSX) + **Vite** |
| Backend | **Spring Boot** (Java) — API REST |
| Banco de dados | **PostgreSQL** |

Bibliotecas do frontend:

- **Tailwind CSS v4** — estilos, via plugin do Vite (sem `tailwind.config.js`; fontes e estilos base em `src/styles/globals.css`)
- [`react-router-dom`](https://reactrouter.com/) — rotas e proteção de rotas por tipo de usuário
- [`react-icons`](https://react-icons.github.io/react-icons/) — ícones (conjunto Lucide, `react-icons/lu`)
- [`sonner`](https://sonner.emilkowal.ski/) — notificações (toasts) de sucesso/erro

Sugestões de bibliotecas adicionais (a avaliar, não é decisão fechada):

| Biblioteca | Uso |
|---|---|
| `react-hook-form` + `zod` | Formulários e validação (ex: CPF, campos obrigatórios) |
| `zustand` | Estado global simples, alternativa leve à Context API pura |
| `date-fns` | Manipulação de datas (agenda, disponibilidade) |
| `clsx` | Composição condicional de classes Tailwind |

## Persistência de dados (localStorage)

Enquanto a API não estiver pronta, todos os dados (usuários, cuidadores, agendamentos, mensagens, assinatura) são salvos no `localStorage` do navegador, através de uma camada de acesso única em `lib/storage`. Essa camada expõe funções (`get`, `set`, `remove`) por "coleção" (ex: `users`, `caregivers`, `appointments`), para que a troca futura por chamadas à API Spring Boot (com os dados no PostgreSQL) exija o mínimo de mudança no restante do app.

## Design e acessibilidade

Diretrizes inspiradas no protótipo de referência (ainda não definitivas, mas um bom ponto de partida para o Tailwind):

- **Paleta**: azul petróleo escuro (tom principal/institucional) + creme/off-white (fundo acolhedor) + azul claro (destaque/ação).
- **Tipografia**: títulos em fonte serifada editorial (tom acolhedor, não corporativo); corpo de texto em fonte sans-serif, legível.
- **Tom de voz**: acolhedor, calmo, humano — evitar linguagem corporativa ou technica em excesso.
- **Acessibilidade** (importante por ser um produto para público idoso):
  - Botão de aumentar o tamanho do texto.
  - Bom contraste de cores.
  - Alvos de clique/toque grandes.
  - Textos claros e diretos.

## Estrutura de pastas (feature-based)

Organização por **features** (screaming architecture): cada pasta em `features/` concentra a regra de negócio e a UI de um domínio específico, seguindo o mesmo padrão interno (`components/`, `hooks/`, `pages/`, `services/`, conforme a necessidade da feature).

```
frontend/
├── public/
├── src/
│   ├── app/                       # shell da aplicação: App.jsx, router, providers globais
│   │   ├── App.jsx
│   │   ├── router.jsx
│   │   └── providers/             # AppProviders (Toaster etc.)
│   ├── assets/                    # imagens, fontes, ícones customizados
│   ├── components/                # UI compartilhada, sem regra de negócio
│   │   └── ui/                    # Logo, TextField, PasswordField, Toaster, Card, PageHeader
│   ├── features/
│   │   ├── marketing/             # landing pública institucional
│   │   │   ├── components/        # TopBar, SiteHeader, Hero, CareAreaSection, ServiceCategories, HowItWorks,
│   │   │   │                      # EssenceSection, Faq, ContactForm, SiteFooter...
│   │   │   ├── pages/              # LandingPage
│   │   │   └── content.js          # textos e dados da landing (FAQ, cuidadores de exemplo, cidades...)
│   │   ├── auth/                  # cadastro/login, papel do usuário
│   │   │   ├── components/         # AuthCard, RoleSelector
│   │   │   ├── hooks/              # useAuth, useAuthForm, useLogout
│   │   │   ├── pages/              # LoginPage, RegisterPage
│   │   │   ├── services/           # authStorage.js (cadastro, login, sessão)
│   │   │   ├── roles.js            # perfis: idoso, familiar, cuidador
│   │   │   └── validation.js       # regras dos formulários
│   │   ├── home/                   # HomePage (/inicio): cards de resumo; CaregiverHome provisória
│   │   ├── scheduling/             # AgendaPage: dias, horários livres, confirmação e "Meus agendamentos"
│   │   │   ├── components/         # DayPicker, CaregiverSlotsCard, ConfirmBookingDialog, MyBookings
│   │   │   ├── hooks/              # useBookings
│   │   │   ├── services/           # bookingStorage.js
│   │   │   └── availability.js     # horários livres de um cuidador em um dia
│   │   ├── chat/                   # ChatPage: lista de conversas + conversa aberta
│   │   │   ├── components/         # ConversationList, ConversationThread
│   │   │   ├── hooks/              # useChat
│   │   │   ├── services/           # chatStorage.js (conversas por usuário)
│   │   │   └── mockConversations.js
│   │   ├── subscription/           # PlansPage + plans.js (planos provisórios)
│   │   ├── support/                # SupportPage, ContactButtons, content.js (FAQ e contatos provisórios)
│   │   ├── account/                # AccountPage (dados da conta, sair)
│   │   ├── caregivers/             # CaregiverAvatar (futuro: perfil e avaliações do cuidador)
│   │   ├── caregiver-agenda/       # (futuro) agenda do cuidador: solicitações, aceitar/recusar, disponibilidade
│   │   └── emergency/              # (futuro) "Pedir ajuda rápida" (SOS)
│   ├── contexts/                     # AuthContext (sessão), ChatContext (conversas e não lidas)
│   ├── hooks/                         # hooks globais reutilizáveis
│   ├── layouts/                        # MarketingLayout, AuthLayout, AppLayout (+ app/: Sidebar, MobileNav, navigation)
│   ├── lib/
│   │   └── storage/                     # storage.js: wrapper sobre localStorage (até a API ficar pronta)
│   ├── mocks/                            # dados fictícios da área logada (cuidadores e horários)
│   ├── routes/                           # ProtectedRoute (só logado), GuestRoute (só visitante), RoleRoute (por perfil)
│   ├── styles/                            # globals.css: import do Tailwind, fontes e estilos base
│   ├── utils/                              # cpf.js (máscara e validação), name.js, date.js
│   └── main.jsx
├── index.html
├── jsconfig.json                           # alias "@/" → src/ para o editor
├── vite.config.js                          # plugins React e Tailwind + alias "@/"
├── package.json
└── README.md
```

## Roadmap / próximos passos

- [ ] Definir modelo de negócio e planos de assinatura.
- [ ] Criar a API em Spring Boot + PostgreSQL e substituir o `localStorage` por ela.
- [ ] Implementar chat em tempo real.
- [ ] Implementar fluxo de emergência/SOS de fato (notificações, contato rápido).
- [ ] Sistema de avaliação de cuidadores após atendimento.
- [ ] Notificações (novo agendamento, solicitação aceita/recusada).
- [ ] Pagamentos.

## Como rodar

Requer Node.js 20.19+ ou 22.12+.

```bash
npm install
npm run dev       # servidor de desenvolvimento em http://localhost:5174
npm run build     # build de produção em dist/
npm run preview   # serve o build localmente
```

O backend (Spring Boot + PostgreSQL) ficará na pasta `../backend`, ainda não inicializada.
