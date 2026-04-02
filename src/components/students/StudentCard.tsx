import { Pencil, Trash2, User } from 'lucide-react';
import type { Student } from '@/types/app';

interface StudentCardProps {
  student: Student;
  onEdit: () => void;
  onDelete: () => void;
  index?: number;
}

const StudentCard = ({ student, onEdit, onDelete, index = 0 }: StudentCardProps) => (
  <div
    className="stagger-enter hover-lift"
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-md)',
      padding: 'var(--space-md)',
      background: 'hsl(var(--color-card))',
      borderRadius: 'var(--radius-md)',
      border: '1px solid hsl(var(--color-border))',
      '--i': index,
    } as React.CSSProperties}
  >
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: 'var(--radius-pill)',
        overflow: 'hidden',
        flexShrink: 0,
        background: 'hsl(var(--color-primary-light))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {student.photo ? (
        <img src={student.photo} alt={student.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <User size={24} color="hsl(var(--color-primary-dark))" />
      )}
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 'var(--text-headline)', lineHeight: 'var(--leading-headline)', fontWeight: 'var(--weight-headline)', color: 'hsl(var(--color-text))' }}>
        {student.name}
      </div>
      {student.notes && (
        <div style={{ fontSize: 'var(--text-footnote)', lineHeight: 'var(--leading-footnote)', color: 'hsl(var(--color-text-secondary))', marginTop: 'var(--space-xs)' }}>
          {student.notes}
        </div>
      )}
    </div>
    <button onClick={onEdit} title="Edit" className="hover-brighten" style={iconBtnStyle}>
      <Pencil size={16} />
    </button>
    <button onClick={onDelete} title="Delete" className="hover-brighten" style={{ ...iconBtnStyle, color: 'hsl(var(--color-alert))' }}>
      <Trash2 size={16} />
    </button>
  </div>
);

const iconBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 'var(--space-sm)',
  borderRadius: 'var(--radius-sm)',
  color: 'hsl(var(--color-text-secondary))',
  display: 'flex',
};

export default StudentCard;
