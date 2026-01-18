# Better Auth Demo

A full-featured authentication demo application using [Better Auth](https://www.better-auth.com/).

## 🛠️ Tech Stack

### Backend (`/server`)
- **NestJS** - Node.js framework
- **Prisma** - Database ORM
- **Better Auth** - Authentication system
- **Resend** - Email service
- **PostgreSQL** - Database

### Frontend (`/web`)
- **Next.js 16** - React framework
- **React 19** - UI library
- **Tailwind CSS 4** - Styling
- **shadcn/ui** - UI component library
- **Radix UI** - Accessible components
- **React Hook Form + Zod** - Forms and validation

## ✨ Features

- 🔐 Login & Registration
- 🔑 Two-factor authentication (2FA)
- 📧 Email verification
- 🔄 Password reset
- 👤 User profile
- 👑 Admin panel
- 🌐 OAuth (social providers)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- PostgreSQL

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Luc4sguilherme/better-auth-demo.git
cd better-auth-demo
```

2. Install dependencies:
```bash
# Backend
cd server
pnpm install

# Frontend
cd ../web
pnpm install
```

3. Set up environment variables (create `.env` files in `/server` and `/web`).

4. Run database migrations:
```bash
cd server
pnpm prisma:migrate
```

### Running

**Backend:**
```bash
cd server
pnpm run start:dev
```

**Frontend:**
```bash
cd web
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── server/          # NestJS API
│   ├── src/
│   │   ├── auth/    # Authentication module
│   │   ├── email/   # Email service
│   │   ├── prisma/  # Prisma service
│   │   └── users/   # Users module
│   └── prisma/      # Schema and migrations
│
└── web/             # Next.js frontend
    ├── app/         # Routes and pages
    ├── components/  # React components
    └── lib/         # Utilities and config
```

## 📄 License

This project is for demonstration purposes only.