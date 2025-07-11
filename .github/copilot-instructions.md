# Copilot Instructions for BrainFuel

## Project Overview
BrainFuel is a Next.js-based online learning platform. It features a modular architecture with clear separation between UI components, authentication, admin features, and public-facing pages. The codebase is designed for rapid iteration and maintainability.

## Architecture & Key Patterns
- **App Directory Structure**: Uses Next.js `app/` directory routing. Auth flows are under `app/(auth)/`, public pages under `app/(public)/`, and admin features under `app/admin/`.
- **Component Organization**: UI components are grouped by type in `components/ui/`, while sidebar and rich text editor components are in their own folders. Components use Radix UI primitives and custom styling via Tailwind.
- **Sidebar System**: Sidebar logic is centralized in `components/ui/sidebar.tsx` and extended in `components/sidebar/`. Context and keyboard shortcuts (Ctrl/Cmd+B) are used for toggling.
- **Forms & Validation**: Forms use `react-hook-form` with Zod schemas from `lib/zodSchemas.ts`. Example: course creation in `app/admin/courses/create/page.tsx`.
- **Authentication**: Auth logic is handled via `lib/auth.ts` and API routes in `app/api/auth/[...all]/route.ts`. Arcjet and Better-Auth are used for bot detection and rate limiting.
- **Environment Variables**: Managed via `lib/env.ts` using `@t3-oss/env-nextjs` and Zod for validation.

## Developer Workflows
- **Start Dev Server**: Use `pnpm dev` (or `npm/yarn/bun dev`).
- **Edit Pages**: Modify files in `app/` (e.g., `app/page.tsx`). Hot reload is enabled.
- **Add UI Components**: Place new components in `components/ui/` and follow the pattern of using Radix primitives and Tailwind classes.
- **Forms**: Use `react-hook-form` and Zod schemas. See `app/admin/courses/create/page.tsx` for a full example.
- **Authentication**: Extend via `lib/auth.ts` and API routes. Use Arcjet for security rules.

## Conventions & Patterns
- **Data Attributes**: Components use `data-slot` and `data-sidebar` attributes for styling and state management.
- **Keyboard Shortcuts**: Sidebar toggling via Ctrl/Cmd+B.
- **Type Safety**: All forms and API handlers use TypeScript and Zod for validation.
- **External Integrations**: Arcjet for bot/rate limiting, Better-Auth for authentication, Radix UI for primitives.
- **Styling**: Tailwind CSS is used throughout. Use utility classes and custom variants as seen in `components/ui/sidebar.tsx`.

## Examples
- **Sidebar Toggle**: See `components/ui/sidebar.tsx` for context/provider and keyboard shortcut logic.
- **Course Creation Form**: See `app/admin/courses/create/page.tsx` for Zod schema validation and form setup.
- **Auth API**: See `app/api/auth/[...all]/route.ts` for Arcjet and Better-Auth integration.

## Recommendations for AI Agents
- Follow the established directory and component patterns.
- Use Zod schemas for all new forms and API endpoints.
- Use Radix UI primitives and Tailwind for new UI components.
- Reference existing components for data attributes and context usage.
- When adding new features, check for existing context providers and hooks before introducing new ones.

---
If any section is unclear or missing, please provide feedback to improve these instructions.
