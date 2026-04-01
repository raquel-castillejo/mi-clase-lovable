import { Users, UsersRound, LayoutGrid, Brain } from 'lucide-react';
import type { Section } from '@/types/app';

const tabs: { key: Section; label: string; icon: React.ReactNode }[] = [
  { key: 'students', label: 'Students', icon: <Users size={20} /> },
  { key: 'groups', label: 'Groups', icon: <UsersRound size={20} /> },
  { key: 'seating', label: 'Seating', icon: <LayoutGrid size={20} /> },
  { key: 'game', label: 'Memory', icon: <Brain size={20} /> },
];

interface AppNavProps {
  active: Section;
  onChange: (s: Section) => void;
}

const AppNav = ({ active, onChange }: AppNavProps) => (
  <nav
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-xs)',
      padding: 'var(--space-sm) var(--space-md)',
      borderBottom: '1px solid hsl(var(--color-border))',
      background: 'hsl(var(--color-surface))',
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
      <button
        key={t.key}
        onClick={() => onChange(t.key)}
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
          fontWeight: active === t.key ? 700 : 'var(--weight-subhead)',
          fontFamily: 'inherit',
          background: active === t.key ? 'hsl(var(--color-primary))' : 'transparent',
          color: active === t.key ? 'hsl(var(--color-primary-text))' : 'hsl(var(--color-text-secondary))',
          transition: 'all 0.15s ease',
        }}
      >
        {t.icon}
        <span>{t.label}</span>
      </button>
    ))}
  </nav>
);

export default AppNav;
