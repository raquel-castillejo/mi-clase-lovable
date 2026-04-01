import { useState } from 'react';
import { X } from 'lucide-react';
import type { Student, Group, SeatingPlan } from '@/types/app';

interface SeatingModalProps {
  groups: Group[];
  students: Student[];
  onSave: (data: Omit<SeatingPlan, 'id'>) => void;
  onClose: () => void;
}

const SeatingModal = ({ groups, students, onSave, onClose }: SeatingModalProps) => {
  const [name, setName] = useState('');
  const [groupId, setGroupId] = useState(groups[0]?.id ?? '');
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(4);
  const [seats, setSeats] = useState<(string | null)[][]>(() => Array.from({ length: 3 }, () => Array(4).fill(null)));

  const updateGrid = (r: number, c: number) => {
    setRows(r);
    setCols(c);
    setSeats(Array.from({ length: r }, (_, ri) =>
      Array.from({ length: c }, (_, ci) => (seats[ri]?.[ci] ?? null))
    ));
  };

  const group = groups.find((g) => g.id === groupId);
  const members = group ? students.filter((s) => group.memberIds.includes(s.id)) : [];

  const setSeat = (r: number, c: number, val: string) => {
    const next = seats.map((row) => [...row]);
    next[r][c] = val || null;
    setSeats(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !groupId) return;
    onSave({ name: name.trim(), groupId, rows, cols, seats });
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
          <h2 style={titleStyle}>New Seating Plan</h2>
          <button onClick={onClose} style={closeBtnStyle}><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <div>
            <label style={labelStyle}>Plan name</label>
            <input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Default arrangement" autoFocus />
          </div>
          <div>
            <label style={labelStyle}>Group</label>
            <select style={inputStyle} value={groupId} onChange={(e) => setGroupId(e.target.value)}>
              {groups.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Rows</label>
              <input type="number" min={1} max={10} style={inputStyle} value={rows} onChange={(e) => updateGrid(+e.target.value, cols)} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Columns</label>
              <input type="number" min={1} max={10} style={inputStyle} value={cols} onChange={(e) => updateGrid(rows, +e.target.value)} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Assign seats</label>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 'var(--space-xs)' }}>
              {seats.map((row, ri) =>
                row.map((cell, ci) => (
                  <select
                    key={`${ri}-${ci}`}
                    value={cell ?? ''}
                    onChange={(e) => setSeat(ri, ci, e.target.value)}
                    style={{
                      ...inputStyle,
                      padding: 'var(--space-xs)',
                      fontSize: 'var(--text-caption-1)',
                      minWidth: 0,
                    }}
                  >
                    <option value="">—</option>
                    {members.map((s) => <option key={s.id} value={s.id}>{s.name.split(' ')[0]}</option>)}
                  </select>
                ))
              )}
            </div>
          </div>
          <button type="submit" style={submitBtnStyle}>Create Plan</button>
        </form>
      </div>
    </div>
  );
};

const overlayStyle: React.CSSProperties = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 };
const modalStyle: React.CSSProperties = { background: 'hsl(0 0% 100%)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', width: '100%', maxWidth: 560, maxHeight: '90vh', overflow: 'auto' };
const titleStyle: React.CSSProperties = { fontSize: 'var(--text-title-2)', lineHeight: 'var(--leading-title-2)', fontWeight: 'var(--weight-headline)', color: 'hsl(var(--color-text))', margin: 0 };
const closeBtnStyle: React.CSSProperties = { background: 'none', border: 'none', cursor: 'pointer', color: 'hsl(var(--color-text-secondary))', display: 'flex' };
const labelStyle: React.CSSProperties = { display: 'block', fontSize: 'var(--text-subhead)', lineHeight: 'var(--leading-subhead)', fontWeight: 'var(--weight-headline)', color: 'hsl(var(--color-text))', marginBottom: 'var(--space-xs)' };
const inputStyle: React.CSSProperties = { width: '100%', padding: 'var(--space-sm) var(--space-md)', borderRadius: 'var(--radius-sm)', border: '1px solid hsl(var(--color-border))', fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)', fontFamily: 'inherit', background: 'hsl(var(--color-surface))', color: 'hsl(var(--color-text))', boxSizing: 'border-box' };
const submitBtnStyle: React.CSSProperties = { padding: 'var(--space-sm) var(--space-lg)', borderRadius: 'var(--radius-pill)', border: 'none', background: 'hsl(var(--color-secondary))', color: 'hsl(var(--color-secondary-text))', fontSize: 'var(--text-headline)', lineHeight: 'var(--leading-headline)', fontWeight: 'var(--weight-headline)', fontFamily: 'inherit', cursor: 'pointer' };

export default SeatingModal;
