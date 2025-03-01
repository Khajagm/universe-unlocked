# Universe Unlocked Project Guide

## Build Commands
- `npm run dev` - Run development server with Turbopack
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Code Style Guidelines
- Use TypeScript with strict type checking
- Follow Next.js App Router architecture
- Components: PascalCase, functional with typed props
- Imports: Group by 1) React/Next, 2) External, 3) Internal
- Use meaningful interface names (IPropName) for component props
- Utilize Tailwind for styling via className
- Style utilities: use cn() from lib/utils for class merging
- Error handling: use try/catch with meaningful error messages
- Always add 'use client' directive when using client features

## Project Organization
- Page components in src/app/
- Reusable components in src/components/
- UI primitives in src/components/ui/
- Data types and utilities in src/lib/
- Public assets in public/

## Naming Conventions
- Files: match component names (PascalCase.tsx)
- Variables: camelCase
- Constants: UPPER_SNAKE_CASE
- Types/Interfaces: PascalCase with I prefix for interfaces