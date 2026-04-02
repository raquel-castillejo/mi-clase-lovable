import { Plus, Users } from 'lucide-react';
import type { Student } from '@/types/app';
import StudentCard from './StudentCard';

interface StudentListProps {
  students: Student[];
  onAdd: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const StudentList = ({ students, onAdd, onEdit, onDelete }: StudentListProps) => (
  <div style={{ padding: 'var(--space-lg)', maxWidth: 640, margin: '0 auto' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
      <h1 style={{ fontSize: 'var(--text-title-1)', lineHeight: 'var(--leading-title-1)', fontWeight: 'var(--weight-headline)', color: 'hsl(var(--color-text))', margin: 0 }}>
        Students
      </h1>
      <button onClick={onAdd} className="hover-brighten" style={addBtnStyle}>
        <Plus size={18} /> Add Student
      </button>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
      {students.map((s, i) => (
        <StudentCard key={s.id} student={s} index={i} onEdit={() => onEdit(s.id)} onDelete={() => onDelete(s.id)} />
      ))}
      {students.length === 0 && (
        <div className="animate-fade-in" style={emptyState}>
          <span style={{ fontSize: '3rem' }}>👩‍🎓</span>
          <p style={{ fontSize: 'var(--text-body)', color: 'hsl(var(--color-text-secondary))', margin: 0 }}>
            No students yet. Add your first student!
          </p>
        </div>
      )}
    </div>
  </div>
);

const addBtnStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 'var(--space-xs)', padding: 'var(--space-sm) var(--space-md)', borderRadius: 'var(--radius-pill)', border: 'none', background: 'hsl(var(--color-primary))', color: 'hsl(var(--color-primary-text))', fontSize: 'var(--text-subhead)', fontWeight: 'var(--weight-headline)', fontFamily: 'inherit', cursor: 'pointer',
};

const emptyState: React.CSSProperties = {
  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-md)', padding: 'var(--space-xl)', background: 'hsl(var(--color-card))', borderRadius: 'var(--radius-lg)', border: '2px dashed hsl(var(--color-border))',
};

export default StudentList;
