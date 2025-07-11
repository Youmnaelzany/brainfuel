# AGENT.md - BrainFuel Development Guide

## Commands
- **Dev**: `pnpm dev` (starts Next.js dev server with turbopack)
- **Build**: `pnpm build` (production build)
- **Lint**: `pnpm lint` (ESLint)
- **Format**: `pnpm format` (Prettier)
- **Database**: `pnpm prisma generate` (after schema changes)

## Architecture
- **Next.js 15** with App Router: `app/` directory routing
- **Auth**: `app/(auth)/` routes, Better-Auth + Arcjet for security
- **Admin**: `app/admin/` routes for course management
- **Database**: PostgreSQL with Prisma ORM, schema in `prisma/schema.prisma`
- **Generated Client**: Prisma client output to `lib/generated/prisma`

## Code Style
- **Imports**: Use `@/` alias for project root imports
- **Components**: Radix UI primitives + Tailwind CSS styling
- **Forms**: react-hook-form + Zod validation (schemas in `lib/zodSchemas.ts`)
- **Styling**: `cn()` utility from `lib/utils.ts` for conditional classes
- **Types**: Strict TypeScript, interface names prefixed with `i` (e.g., `iAppProps`)
- **Data Attributes**: Use `data-slot` and `data-sidebar` for component state

## Key Patterns
- Form validation with Zod schemas
- Radix UI components with custom Tailwind variants
- Sidebar context with Ctrl/Cmd+B keyboard shortcuts
- Environment variables validated via `lib/env.ts`
