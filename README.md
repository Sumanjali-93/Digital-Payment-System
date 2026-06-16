<div align="center">

# 💸 Instant Payment & Digital Wallet

### A Fintech-Grade Digital Wallet & Real-Time Payments Platform

*Send, receive, request, and track money across currencies — engineered with the precision and discipline of production payment systems*

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)](https://tanstack.com/query)
[![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

[Live Demo](#) · [Report Bug](#) · [Request Feature](#)

</div>

---

## 📑 Table of Contents

- [About The Project](#-about-the-project)
- [Core Features](#-core-features)
- [Engineering Principles & Architecture Decisions](#-engineering-principles--architecture-decisions)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Data Models](#-data-models)
- [Security Considerations](#-security-considerations)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Available Scripts](#available-scripts)
- [API Integration](#-api-integration)
- [Testing](#-testing)
- [Browser Support](#-browser-support)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 🧭 About The Project

**Instant Payment & Digital Wallet** is a mobile-first financial application that lets users manage a digital wallet, transfer and request money, monitor balances across currencies, and analyze spending behavior in real time.

The product experience is inspired by the clarity and trust signals of mature payment platforms — instant balance visibility, transparent transaction states, and friction-free transfers — while the codebase applies engineering patterns commonly found in production fintech systems: a strict separation between UI, data-fetching, and domain logic; schema-validated boundaries on every input; and a transaction-first model where the wallet balance is always *derived*, never directly mutated.

---

## ✨ Core Features

### 1. Dashboard / Home
- Personalized, time-aware greeting (e.g., "Good morning")
- Real-time balance display with one-tap USD ⇄ INR toggle
- Quick actions for Send, Request, and Add Money
- At-a-glance spending summary: Total Sent, Total Received, Net Position
- Recent activity feed with live updates

### 2. Activity & Transaction Management
- Full transaction history with multi-field search (name, email, note, transaction ID)
- Advanced filters: status, category, transaction type, and custom date ranges
- 6-month spending trend chart with sent/received breakdown
- Sortable, detailed transaction table
- Transaction type filtering — All, Sent, Received, Request, Refund

### 3. Money Transfer
- Send money to any user via email lookup
- Request money from other users with due dates
- Optional payment notes attached to every transfer
- Real-time transaction status tracking (pending → completed / failed / cancelled)
- Category tagging for downstream analytics

### 4. Wallet Management
- View current balance in both USD and INR
- Add and manage payment methods (credit cards, linked bank accounts)
- Designate a default payment method
- Inspect masked payment method details (last 4 digits only)
- Remove payment methods securely

### 5. Analytics
- Visual breakdown of spending by category
- Month-over-month comparison charts
- Filterable by time period and category
- Built on Recharts for performant, responsive visualizations

### 6. Profile & Settings
- Editable user profile information
- Account-level preferences and settings
- Secure logout flow

### 7. Notifications
- Real-time transaction alerts
- Security notifications (e.g., new payment method added)
- Money request updates (sent, received, fulfilled, declined)
- Read/unread state tracking

---

## ⚙️ Engineering Principles & Architecture Decisions

Beyond the feature set, the codebase is structured around principles that matter in any system that touches money:

- **Transaction-first ledger model** — The wallet balance is never written to directly. It is derived from the immutable stream of transaction records (`sent`, `received`, `request`, `refund`), the same pattern used by double-entry-style ledgers in production payment systems. This makes balances auditable and reproducible.
- **Currency as a first-class concept** — All monetary values carry an explicit currency (`USD` / `INR`). Conversion happens through a single centralized exchange-rate constant, so there is exactly one place to update when rates change — and one place to fix if conversion logic ever needs hardening (e.g., switching to integer minor-units to avoid floating-point rounding errors).
- **Schema-validated boundaries (Zod)** — Every form submission and every payload crossing the service layer is validated against a Zod schema before it's trusted. Invalid data fails fast, client-side, with typed error messages — mirroring the "validate at the edge" philosophy used by payment APIs.
- **Optimistic UI with safe rollback** — TanStack React Query drives data fetching and mutations. Sends/requests update the UI optimistically for a snappy feel, with automatic cache invalidation and rollback if the underlying mutation fails — so the UI never silently drifts from the source of truth.
- **Status-driven transaction states** — Every transaction and money request moves through explicit, finite states (`pending`, `completed`, `failed`, `cancelled`), avoiding ambiguous "in-between" states that are notoriously hard to reconcile in payment systems.
- **Type-safe domain layer** — Shared TypeScript types (`src/types`) define the contract between UI, hooks, and services, so a change to the `Transaction` or `Wallet` shape surfaces as a compile-time error everywhere it's used.
- **Service-layer abstraction** — All backend communication is routed through `src/services/base44.ts`. Swapping the mock implementation for a real payments backend (or a different BaaS provider) requires changes in a single, isolated module — the rest of the app is unaware of the underlying provider.

---

## 🛠️ Tech Stack

**Frontend**
- React 18.2.0 — UI framework
- Vite — build tool & dev server
- TypeScript — static typing across the codebase
- Tailwind CSS — utility-first styling
- shadcn/ui — accessible, composable component library

**State Management & Data Fetching**
- TanStack React Query 5.84.1 — server-state caching, mutations, and synchronization
- React Hook Form 7.54.2 — performant, controlled form state
- Zod 3.24.2 — runtime schema validation and type inference

**Routing**
- React Router DOM 6.26.0 — client-side routing

**UI & Visualization**
- Lucide React 0.475.0 — icon system
- Framer Motion 11.16.4 — animations and microinteractions
- Recharts 2.15.4 — charts for spending analytics

**Utilities**
- date-fns 3.6.0 — date formatting and manipulation
- Lodash 4.17.21 — utility functions
- React Markdown 9.0.1 — markdown rendering
- Sonner 2.0.1 — toast notifications

**Backend Integration**
- Base44 SDK 0.8.28 — Backend-as-a-Service layer

---

## 🏗️ System Architecture

```
                    ┌──────────────────────────┐
                    │        Browser / UI        │
                    │  (Pages, Components, UI)   │
                    └─────────────┬───────────────┘
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │   Hooks (useData, etc.)    │
                    │  TanStack React Query      │
                    │  Caching · Mutations ·     │
                    │  Optimistic Updates        │
                    └─────────────┬───────────────┘
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │   Zod Validation Layer     │
                    │  (forms + API boundaries)  │
                    └─────────────┬───────────────┘
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │   Service Layer            │
                    │   src/services/base44.ts   │
                    └─────────────┬───────────────┘
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │   Base44 SDK / Backend     │
                    │   (Wallets, Transactions,  │
                    │    Requests, Users)         │
                    └──────────────────────────┘
```

---

## 📊 Data Models

### Transaction
| Field | Description |
|---|---|
| `type` | `sent` \| `received` \| `request` \| `refund` |
| `amount` / `currency` | Monetary value with explicit `USD` / `INR` currency |
| `status` | `completed` \| `pending` \| `failed` \| `cancelled` |
| `sender` / `recipient` | User identity details for both parties |
| `category` | Tag used for analytics and filtering |
| `note` | Optional message attached to the transfer |
| `paymentMethod` | Reference to the payment method used |

### Wallet
| Field | Description |
|---|---|
| `userEmail` | Wallet owner identifier |
| `balanceUSD` / `balanceINR` | Balances per currency |
| `preferredCurrency` | Active display currency (`USD` / `INR`) |

### MoneyRequest
| Field | Description |
|---|---|
| `requester` / `payer` | Identity details for both parties |
| `amount` / `currency` | Requested amount and currency |
| `status` | Lifecycle status of the request |
| `dueDate` | Optional deadline for fulfillment |

### PaymentMethod
| Field | Description |
|---|---|
| `type` | `card` \| `bank` |
| `cardDetails` | Last 4 digits + expiry (masked) |
| `bankDetails` | Bank name + last 4 digits of account (masked) |
| `isDefault` | Flag marking the default payment method |

### Notification
| Field | Description |
|---|---|
| `type` | `transaction` \| `security` \| `request` |
| `title` / `message` | Notification content |
| `read` | Read/unread state |
| `relatedId` | Linked transaction or request ID |

### User
| Field | Description |
|---|---|
| `email` / `fullName` | Identity information |
| `role` | Access role |
| `customAttributes` | Extensible profile metadata |

---

## 🔒 Security Considerations

This is a frontend reference implementation, but it's structured with the same security posture a real payments product would need:

- **Masked sensitive data** — Card and bank details are stored and displayed using only the last 4 digits; full numbers are never persisted client-side.
- **Validated input everywhere** — Every form (transfers, requests, payment methods) is validated through Zod before submission, reducing the risk of malformed or malicious payloads reaching the service layer.
- **Environment-based secrets** — API keys and project identifiers are loaded via `.env` and excluded from version control through `.gitignore`.
- **HTTPS-only API communication** — All requests to the Base44 backend (or any future production backend) are expected to be made over HTTPS.
- **Explicit transaction states** — No transaction is ever left in an ambiguous state; every mutation resolves to `completed`, `pending`, `failed`, or `cancelled`, simplifying reconciliation and fraud review.
- **Production hardening checklist** — Before connecting to a real payments backend, the following should be implemented:
  - End-to-end authentication & session management
  - Server-side rate limiting on transfer/request endpoints
  - CSRF protection on all state-changing requests
  - Server-side authorization checks (never trust client-side balance/ownership checks alone)
  - Regular dependency and security audits

---

## 📂 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Layout.tsx
│   │   ├── Header.tsx
│   │   └── Navigation.tsx
│   ├── dashboard/
│   │   ├── BalanceCard.tsx
│   │   ├── QuickActions.tsx
│   │   ├── SpendingSummary.tsx
│   │   └── RecentActivity.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Dialog.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   ├── Label.tsx
│   │   ├── Tabs.tsx
│   │   └── Table.tsx
│   ├── common/
│   ├── activity/
│   ├── wallet/
│   └── transaction/
├── pages/
│   ├── Dashboard.tsx
│   ├── Activity.tsx
│   ├── Analytics.tsx
│   ├── Wallets.tsx
│   ├── SendMoney.tsx
│   ├── RequestMoney.tsx
│   └── Profile.tsx
├── hooks/
│   └── useData.ts
├── services/
│   └── base44.ts
├── types/
│   └── index.ts
├── utils/
│   └── helpers.ts
├── constants/
│   └── index.ts
├── context/
├── App.tsx
├── main.tsx
└── index.css
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 16+
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/<your-username>/instant-payment-wallet.git
   cd instant-payment-wallet
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create your environment file
   ```bash
   cp .env.example .env
   ```

### Environment Variables

Configure `.env` with your Base44 credentials:

```env
VITE_BASE44_API_KEY=your_api_key
VITE_BASE44_PROJECT_ID=your_project_id
VITE_CURRENCY_RATE=83.5
```

> ⚠️ Never commit your `.env` file. Ensure it is listed in `.gitignore`.

### Available Scripts

```bash
npm run dev       # Start development server (http://localhost:5173)
npm run build     # Build for production
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```

---

## 📡 API Integration

The application communicates with its backend exclusively through the **Base44 SDK**, abstracted behind `src/services/base44.ts`. The current implementation provides mock services for:

- Authentication endpoints
- Wallet operations (balance, currency preferences)
- Transaction management (create, list, filter)
- Money request handling (create, fulfill, decline)
- Payment method management
- Notification delivery
- User profile management

To connect a real backend, replace the implementations inside `org.ts` — the service layer's exported interface is the only contract the rest of the app depends on, so no other files need to change.

---

## 🧪 Testing

No automated test suite is configured yet. The following manual scenarios have been validated:

- Currency conversion accuracy across USD ⇄ INR toggles
- Transaction filtering by type, status, category, and date range
- Optimistic UI updates and rollback on failed mutations
- Form validation for transfers, requests, and payment methods (empty, invalid, boundary values)
- Responsive layout across mobile, tablet, and desktop breakpoints

**Planned additions:**
- Component rendering tests (Vitest + React Testing Library)
- Form validation unit tests (Zod schemas)
- Service-layer mocking and integration tests
- End-to-end transfer/request flows (Playwright/Cypress)

---

## 🌐 Browser Support

| Browser Supported |
|---|
| Chrome (latest) |
| Firefox (latest) |
| Safari (latest) |
| Edge (latest) |

---

## 🗺️ Roadmap

- [ ] Push notifications
- [ ] Offline mode with background sync
- [ ] Payment gateway integration (Stripe / Razorpay)
- [ ] QR code payments
- [ ] Bill splitting
- [ ] Recurring/scheduled transfers
- [ ] Investment & savings features
- [ ] Biometric authentication
- [ ] Exportable transaction reports (CSV/PDF)
- [ ] Advanced analytics & budgeting insights

---

## 📄 License

This project is licensed under the **MIT License** — © 2026 Instant Payment & Digital Wallet.

---

<div align="center">

⭐ If you found this project useful, consider giving it a star on GitHub!

</div>
