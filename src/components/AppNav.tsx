import { Users, UsersRound, LayoutGrid, Brain, Menu, X } from 'lucide-react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const tabs = [
  { path: '/students', label: 'Students', icon: <Users size={20} /> },
  { path: '/groups', label: 'Groups', icon: <UsersRound size={20} /> },
  { path: '/seating', label: 'Seating', icon: <LayoutGrid size={20} /> },
  { path: '/game', label: 'Memory', icon: <Brain size={20} /> },
];

const AppNav = () => {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) =>
    pathname === path || (path === '/students' && pathname === '/');

  return (
    <>
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-xs)',
          padding: 'var(--space-sm) var(--space-md)',
          borderBottom: '1px solid hsl(var(--color-border))',
          background: 'hsl(var(--color-card))',
        }}
      >
        <Link
          to="/"
          style={{
            fontWeight: 900,
            fontSize: 'var(--text-title-3)',
            lineHeight: 'var(--leading-title-3)',
            color: 'hsl(var(--color-secondary))',
            marginRight: 'auto',
            textDecoration: 'none',
          }}
        >
          MiClase
        </Link>

        {/* Desktop nav links */}
        <div className="desktop-nav-links">
          {tabs.map((t) => (
            <NavLink
              key={t.path}
              to={t.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-xs)',
                padding: 'var(--space-sm) var(--space-md)',
                borderRadius: 'var(--radius-pill)',
                border: 'none',
                cursor: 'pointer',
                fontSize: 'var(--text-subhead)',
                lineHeight: 'var(--leading-subhead)',
                fontWeight: isActive(t.path) ? 700 : 'var(--weight-subhead)',
                fontFamily: 'inherit',
                textDecoration: 'none',
                background: isActive(t.path) ? 'hsl(var(--color-primary))' : 'transparent',
                color: isActive(t.path) ? 'hsl(var(--color-primary-text))' : 'hsl(var(--color-text-secondary))',
                transition: 'all 0.2s ease',
              }}
            >
              {t.icon}
              <span>{t.label}</span>
            </NavLink>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'hsl(var(--color-text))',
            padding: 'var(--space-xs)',
          }}
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile slide-in overlay */}
      <div
        className="mobile-menu-overlay"
        style={{
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 'var(--space-sm) var(--space-md)',
            borderBottom: '1px solid hsl(var(--color-border))',
          }}
        >
          <span
            style={{
              fontWeight: 900,
              fontSize: 'var(--text-title-3)',
              color: 'hsl(var(--color-secondary))',
            }}
          >
            MiClase
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'hsl(var(--color-text))',
              padding: 'var(--space-xs)',
            }}
          >
            <X size={24} />
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-xs)',
            padding: 'var(--space-md)',
          }}
        >
          {tabs.map((t) => (
            <NavLink
              key={t.path}
              to={t.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-md)',
                padding: 'var(--space-md)',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                fontFamily: 'inherit',
                fontSize: 'var(--text-headline)',
                fontWeight: isActive(t.path) ? 700 : 'var(--weight-body)',
                background: isActive(t.path) ? 'hsl(var(--color-primary))' : 'transparent',
                color: isActive(t.path) ? 'hsl(var(--color-primary-text))' : 'hsl(var(--color-text))',
                transition: 'background 0.15s ease',
              }}
            >
              {t.icon}
              <span>{t.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default AppNav;
