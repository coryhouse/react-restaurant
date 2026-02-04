## Separate docs (Only read these if necessary)

For TypeScript conventions, see docs/TYPESCRIPT.md
For Playwright test writing conventions, see docs/PLAYWRIGHT.md
For React conventions, see docs/REACT.md
For Routing conventions, see docs/ROUTING.md

## Development Commands

Use `bun` to run commands.

## Architecture Overview

built with modern TypeScript tooling:

### Core Stack

- **React 19** with TypeScript and Vite
- **TanStack Router** for file-based routing
- **TanStack Query** for server state management with optimistic updates
- **Tailwind CSS 4** for styling
- **JSON Server** as a mock REST API backend
- **Zod** for runtime type validation
- **Playwright** for end-to-end testing

### Key Architectural Patterns

1. **Query Factories Pattern**: All API interactions are centralized in `src/query-factories` using TanStack Query's QueryOptions API for reusable query definitions.

2. **Centralized Error Handling**: Global error boundaries and route-level error components provide consistent error handling.

### Data Flow

- **Data Validation**: All API responses are validated using Zod schemas defined in `src/food.ts`
- **State Management**: Server state managed by TanStack Query, local UI state with React hooks
- **Optimistic Updates**: Mutations automatically invalidate and refetch related queries

### Development Notes

- The app requires both frontend and API servers running (`bun start`)
- Route parameters use TanStack Router's type-safe parameter parsing
- All forms use controlled components with validation
- Images are served statically from `public/images/`
- Toast notifications use Sonner library
- The app includes React Query Devtools and TanStack Router Devtools for debugging
- After adding any new feature, add a Playwright test, or enhance an existing one.
- Run `bun run check` after making changes and fix any reported issues.
