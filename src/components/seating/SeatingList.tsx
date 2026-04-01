import { useState } from 'react';
import { Plus, Trash2, LayoutGrid } from 'lucide-react';
import type { Student, Group, SeatingPlan } from '@/types/app';

interface SeatingListProps {
  plans: SeatingPlan[];
  groups: Group[];
  students: Student[];
  onAdd: () => void;
  onDelete: (id: string) => void;
}

const SeatingList = ({ plans, groups, students, onAdd, onDelete }: SeatingListProps) => {
  const getName = (id: string | null) => (id ? students.find((s) => s.id === id)?.name ?? '?' : '');
  const getGroup = (id: string) => groups.find((g) => g.id === id)?.name ?? 'Unknown';

  return (
    <div style={{ padding: 'var(--space-lg)', maxWidth: 720, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
        <h1 style={h1}>Seating Plans</h1>
        <button onClick={onAdd} style={addBtn}><Plus size={18} /> New Plan</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
        {plans.map((p) => (
          <div key={p.id} style={card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-sm)' }}>
              <div>
                <div style={{ fontSize: 'var(--text-headline)', fontWeight: 'var(--weight-headline)', color: 'hsl(var(--color-text))' }}>{p.name}</div>
                <div style={{ fontSize: 'var(--text-footnote)', color: 'hsl(var(--color-text-secondary))' }}>{getGroup(p.groupId)} · {p.rows}×{p.cols}</div>
              </div>
              <button onClick={() => onDelete(p.id)} style={{ ...iconBtn, color: 'hsl(var(--color-alert))' }}><Trash2 size={16} /></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${p.cols}, 1fr)`, gap: 2 }}>
              {p.seats.flat().map((sid, i) => (
                <div key={i} style={{
                  padding: 'var(--space-xs)', borderRadius: 'var(--radius-sm)', fontSize: 'var(--text-caption-2)', lineHeight: 'var(--leading-caption-2)', textAlign: 'center', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
                  background: sid ? 'hsl(var(--color-secondary-light))' : 'hsl(var(--color-border))',
                  color: sid ? 'hsl(var(--color-secondary-dark))' : 'hsl(var(--color-text-secondary))',
                }}>
                  {sid ? getName(sid).split(' ')[0] : '·'}
                </div>
              ))}
            </div>
          </div>
        ))}
        {plans.length === 0 && <p style={{ textAlign: 'center', color: 'hsl(var(--color-text-secondary))', fontSize: 'var(--text-body)' }}>No seating plans yet.</p>}
      </div>
    </div>
  );
};

const h1: React.CSSProperties = { fontSize: 'var(--text-title-1)', lineHeight: 'var(--leading-title-1)', fontWeight: 'var(--weight-headline)', color: 'hsl(var(--color-text))', margin: 0 };
const addBtn: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: 'var(--space-xs)', padding: 'var(--space-sm) var(--space-md)', borderRadius: 'var(--radius-pill)', border: 'none', background: 'hsl(var(--color-primary))', color: 'hsl(var(--color-primary-text))', fontSize: 'var(--text-subhead)', fontWeight: 'var(--weight-headline)', fontFamily: 'inherit', cursor: 'pointer' };
const card: React.CSSProperties = { padding: 'var(--space-md)', background: 'hsl(0 0% 100%)', borderRadius: 'var(--radius-md)', border: '1px solid hsl(var(--color-border))' };
const iconBtn: React.CSSProperties = { background: 'none', border: 'none', cursor: 'pointer', padding: 'var(--space-sm)', borderRadius: 'var(--radius-sm)', display: 'flex' };

export default SeatingList;
