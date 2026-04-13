

## Plan: Mobile-Friendly Navigation

### Changes to `src/components/AppNav.tsx`

1. **Logo as link** -- Wrap "MiClase" in a React Router `Link` to `/`.

2. **Hide desktop nav links below 650px** -- Add a CSS media query (via inline style or a small CSS class in `index.css`) to hide the tab links on screens narrower than 650px.

3. **Hamburger button** -- Show a `Menu` (lucide) icon button only on screens below 650px. Clicking it sets a `menuOpen` state to `true`.

4. **Full-screen slide-in menu** -- When `menuOpen` is true, render a full-viewport overlay that slides in from the right (using CSS transform + transition). It contains the 4 nav items stacked vertically with icons, plus an `X` close button. Clicking any link closes the menu and navigates.

5. **Close on navigation** -- Use `useLocation` to detect route changes and auto-close the menu.

### CSS additions to `src/index.css`

Add a utility media query class:
- `.desktop-nav-links` -- `display: flex` by default, `display: none` below 650px.
- `.mobile-menu-toggle` -- `display: none` by default, `display: flex` below 650px.
- `.mobile-menu-overlay` -- fixed full-screen panel with slide-in animation using existing `--color-card`, `--color-text`, and spacing tokens.

### Technical Details

- Breakpoint: 650px (custom, not using the existing 768px mobile hook).
- All colors/fonts use CSS variables only.
- The slide-in menu uses `transform: translateX(100%)` → `translateX(0)` with a CSS transition.
- No new dependencies needed; uses `Menu` and `X` icons from lucide-react.

