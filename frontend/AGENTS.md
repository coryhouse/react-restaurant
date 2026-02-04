This is React a restaurant management app.

## Output Formatting

In responses, sacrifice grammar for concision.

## Separate docs (Only read these if necessary)

For TypeScript conventions, see docs/TYPESCRIPT.md
For Playwright test writing conventions, see docs/PLAYWRIGHT.md
For React conventions, see docs/REACT.md
For Routing conventions, see docs/ROUTING.md

## Notifications

Play terminal bell (`echo -e '\a'`) when:

- Completing a significant task
- Encountering an issue that needs user attention

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

- **API Base URL**: `http://localhost:3001/foods` (JSON Server)
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

## Bug Fixes: Prove It Pattern

When given a bug report, first spawn a subagent to write a test that reproduces the issue. Proceed once reproduction succeeds.

Test level hierarchy — Reproduce at the lowest level that can capture the bug:

1. **Unit test** — Pure logic bugs, isolated functions (lives next to the code)
2. **Integration test** — Component interactions, API boundaries (lives next to the code)
3. **UX spec test** — Full user flows, browser-dependent behavior (lives in `tests/`)

For every bug fix:

1. **Reproduce with subagent** — Spawn a subagent to write a test that demonstrates the bug. The test should *fail* before the fix.
2. **Fix** — Apply the fix.
3. **Confirm** — The test now *passes*, proving the fix works.

If the bug is environment-specific or transient, document why a test isn't possible rather than skipping.
