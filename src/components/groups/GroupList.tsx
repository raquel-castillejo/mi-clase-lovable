import { Plus, Pencil, Trash2, UsersRound } from 'lucide-react';
import type { Student, Group } from '@/types/app';

interface GroupListProps {
  groups: Group[];
  students: Student[];
  onAdd: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const GroupList = ({ groups, students, onAdd, onEdit, onDelete }: GroupListProps) => {
  const getName = (id: string) => students.find((s) => s.id === id)?.name ?? 'Unknown';

  return (
    <div style={{ padding: 'var(--space-lg)', maxWidth: 640, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
        <h1 style={{ fontSize: 'var(--text-title-1)', lineHeight: 'var(--leading-title-1)', fontWeight: 'var(--weight-headline)', color: 'hsl(var(--color-text))', margin: 0 }}>
          Groups
        </h1>
        <button onClick={onAdd} style={addBtnStyle}><Plus size={18} /> New Group</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
        {groups.map((g) => (
          <div key={g.id} style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                <UsersRound size={20} color="hsl(var(--color-secondary))" />
                <span style={{ fontSize: 'var(--text-headline)', lineHeight: 'var(--leading-headline)', fontWeight: 'var(--weight-headline)', color: 'hsl(var(--color-text))' }}>{g.name}</span>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-xs)' }}>
                <button onClick={() => onEdit(g.id)} style={iconBtn}><Pencil size={16} /></button>
                <button onClick={() => onDelete(g.id)} style={{ ...iconBtn, color: 'hsl(var(--color-alert))' }}><Trash2 size={16} /></button>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-xs)' }}>
              {g.memberIds.map((mid) => (
                <span key={mid} style={chipStyle}>{getName(mid)}</span>
              ))}
              {g.memberIds.length === 0 && <span style={{ fontSize: 'var(--text-footnote)', color: 'hsl(var(--color-text-secondary))' }}>No members</span>}
            </div>
          </div>
        ))}
        {groups.length === 0 && (
          <p style={{ textAlign: 'center', color: 'hsl(var(--color-text-secondary))', fontSize: 'var(--text-body)' }}>No groups yet.</p>
        )}
      </div>
    </div>
  );
};

const addBtnStyle: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: 'var(--space-xs)', padding: 'var(--space-sm) var(--space-md)', borderRadius: 'var(--radius-pill)', border: 'none', background: 'hsl(var(--color-primary))', color: 'hsl(var(--color-primary-text))', fontSize: 'var(--text-subhead)', fontWeight: 'var(--weight-headline)', fontFamily: 'inherit', cursor: 'pointer' };
const cardStyle: React.CSSProperties = { padding: 'var(--space-md)', background: 'hsl(0 0% 100%)', borderRadius: 'var(--radius-md)', border: '1px solid hsl(var(--color-border))' };
const iconBtn: React.CSSProperties = { background: 'none', border: 'none', cursor: 'pointer', padding: 'var(--space-sm)', borderRadius: 'var(--radius-sm)', color: 'hsl(var(--color-text-secondary))', display: 'flex' };
const chipStyle: React.CSSProperties = { padding: 'var(--space-xs) var(--space-sm)', borderRadius: 'var(--radius-pill)', background: 'hsl(var(--color-primary-light))', fontSize: 'var(--text-caption-1)', lineHeight: 'var(--leading-caption-1)', color: 'hsl(var(--color-text))' };

export default GroupList;
