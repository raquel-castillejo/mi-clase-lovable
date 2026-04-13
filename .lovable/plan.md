

## Plan: Convert Sections to Routed Pages

Currently all four sections live inside a single `Index` page, toggled by `useState`. This plan converts them into proper routes.

### Changes

1. **Create 4 page components** (`src/pages/StudentsPage.tsx`, `GroupsPage.tsx`, `SeatingPage.tsx`, `GamePage.tsx`) that extract the relevant JSX from `Index.tsx`. State will be lifted to a shared context.

2. **Create a shared state context** (`src/context/AppContext.tsx`) to hold `students`, `groups`, `plans` and all CRUD functions — since all pages need access to the same in-memory data.

3. **Update `AppNav.tsx`** to use React Router `NavLink` instead of button clicks, linking to `/students`, `/groups`, `/seating`, `/game`.

4. **Update `App.tsx` routes**:
   - `/` and `/students` → `StudentsPage`
   - `/groups` → `GroupsPage`
   - `/seating` → `SeatingPage`
   - `/game` → `GamePage`
   - `*` → `NotFound`

5. **Remove section state from `Index.tsx`** — the file becomes unnecessary or just redirects to `/students`.

### Technical Details

- Shared context avoids prop-drilling and keeps state centralized (same pattern as current `Index.tsx`, just wrapped in `React.createContext`).
- `/` will render the same component as `/students` (two `<Route>` entries pointing to the same element).
- `AppNav` will derive the active tab from `useLocation().pathname`.

