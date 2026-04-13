import { Users, UsersRound, LayoutGrid, Brain } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

const tabs = [
  { path: '/students', label: 'Students', icon: <Users size={20} /> },
  { path: '/groups', label: 'Groups', icon: <UsersRound size={20} /> },
  { path: '/seating', label: 'Seating', icon: <LayoutGrid size={20} /> },
  { path: '/game', label: 'Memory', icon: <Brain size={20} /> },
];

const AppNav = () => {
  const { pathname } = useLocation();

  const isActive = (path: string) =>
    pathname === path || (path === '/students' && pathname === '/');

  return (
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
      <span
        style={{
          fontWeight: 900,
          fontSize: 'var(--text-title-3)',
          lineHeight: 'var(--leading-title-3)',
          color: 'hsl(var(--color-secondary))',
          marginRight: 'auto',
        }}
      >
        MiClase
      </span>
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
    </nav>
  );
};

export default AppNav;
