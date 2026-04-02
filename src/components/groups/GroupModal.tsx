import { useState } from 'react';
import { X, Search, Check } from 'lucide-react';
import type { Student, Group } from '@/types/app';

interface GroupModalProps {
  group?: Group | null;
  students: Student[];
  onSave: (data: Omit<Group, 'id'>) => void;
  onClose: () => void;
}

const GroupModal = ({ group, students, onSave, onClose }: GroupModalProps) => {
  const [name, setName] = useState(group?.name ?? '');
  const [selected, setSelected] = useState<Set<string>>(new Set(group?.memberIds ?? []));
  const [search, setSearch] = useState('');

  const filtered = students.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));

  const toggle = (id: string) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ name: name.trim(), memberIds: Array.from(selected) });
  };

  return (
    <div style={overlayStyle} className="animate-fade-in" onClick={onClose}>
      <div style={modalStyle} className="animate-scale-pop" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
          <h2 style={titleStyle}>{group ? 'Edit Group' : 'Create Group'}</h2>
          <button onClick={onClose} className="hover-dim" style={closeBtnStyle}><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <div>
            <label style={labelStyle}>Group name</label>
            <input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. 5th Grade A" autoFocus />
          </div>
          <div>
            <label style={labelStyle}>Members</label>
            <div style={{ position: 'relative', marginBottom: 'var(--space-sm)' }}>
              <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'hsl(var(--color-text-secondary))' }} />
              <input style={{ ...inputStyle, paddingLeft: 36 }} value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search students…" />
            </div>
            <div style={{ maxHeight: 200, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
              {filtered.map((s) => (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => toggle(s.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', padding: 'var(--space-sm) var(--space-md)', borderRadius: 'var(--radius-sm)',
                    border: '1px solid hsl(var(--color-border))', background: selected.has(s.id) ? 'hsl(var(--color-secondary-light))' : 'transparent',
                    cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', fontSize: 'var(--text-subhead)', color: 'hsl(var(--color-text))',
                    transition: 'background 0.15s ease, border-color 0.15s ease',
                  }}
                >
                  <span style={{
                    width: 20, height: 20, borderRadius: 'var(--radius-sm)', border: '2px solid hsl(var(--color-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: selected.has(s.id) ? 'hsl(var(--color-secondary))' : 'transparent', transition: 'background 0.15s ease',
                  }}>
                    {selected.has(s.id) && <Check size={14} color="hsl(var(--color-secondary-text))" />}
                  </span>
                  {s.name}
                </button>
              ))}
            </div>
          </div>
          <button type="submit" className="hover-brighten" style={submitBtnStyle}>
            {group ? 'Save Changes' : 'Create Group'}
          </button>
        </form>
      </div>
    </div>
  );
};

const overlayStyle: React.CSSProperties = { position: 'fixed', inset: 0, background: 'hsl(var(--color-overlay))', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 };
const modalStyle: React.CSSProperties = { background: 'hsl(var(--color-card))', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', width: '100%', maxWidth: 480, maxHeight: '90vh', overflow: 'auto' };
const titleStyle: React.CSSProperties = { fontSize: 'var(--text-title-2)', lineHeight: 'var(--leading-title-2)', fontWeight: 'var(--weight-headline)', color: 'hsl(var(--color-text))', margin: 0 };
const closeBtnStyle: React.CSSProperties = { background: 'none', border: 'none', cursor: 'pointer', color: 'hsl(var(--color-text-secondary))', display: 'flex' };
const labelStyle: React.CSSProperties = { display: 'block', fontSize: 'var(--text-subhead)', lineHeight: 'var(--leading-subhead)', fontWeight: 'var(--weight-headline)', color: 'hsl(var(--color-text))', marginBottom: 'var(--space-xs)' };
const inputStyle: React.CSSProperties = { width: '100%', padding: 'var(--space-sm) var(--space-md)', borderRadius: 'var(--radius-sm)', border: '1px solid hsl(var(--color-border))', fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)', fontFamily: 'inherit', background: 'hsl(var(--color-surface))', color: 'hsl(var(--color-text))', boxSizing: 'border-box' };
const submitBtnStyle: React.CSSProperties = { padding: 'var(--space-sm) var(--space-lg)', borderRadius: 'var(--radius-pill)', border: 'none', background: 'hsl(var(--color-secondary))', color: 'hsl(var(--color-secondary-text))', fontSize: 'var(--text-headline)', lineHeight: 'var(--leading-headline)', fontWeight: 'var(--weight-headline)', fontFamily: 'inherit', cursor: 'pointer' };

export default GroupModal;
