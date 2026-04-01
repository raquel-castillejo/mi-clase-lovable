import { Plus } from 'lucide-react';
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
      <h1 style={{
        fontSize: 'var(--text-title-1)', lineHeight: 'var(--leading-title-1)', fontWeight: 'var(--weight-headline)', color: 'hsl(var(--color-text))', margin: 0,
      }}>
        Students
      </h1>
      <button onClick={onAdd} style={addBtnStyle}>
        <Plus size={18} /> Add Student
      </button>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
      {students.map((s) => (
        <StudentCard key={s.id} student={s} onEdit={() => onEdit(s.id)} onDelete={() => onDelete(s.id)} />
      ))}
      {students.length === 0 && (
        <p style={{ textAlign: 'center', color: 'hsl(var(--color-text-secondary))', fontSize: 'var(--text-body)' }}>
          No students yet. Add your first student!
        </p>
      )}
    </div>
  </div>
);

const addBtnStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 'var(--space-xs)', padding: 'var(--space-sm) var(--space-md)', borderRadius: 'var(--radius-pill)', border: 'none', background: 'hsl(var(--color-primary))', color: 'hsl(var(--color-primary-text))', fontSize: 'var(--text-subhead)', fontWeight: 'var(--weight-headline)', fontFamily: 'inherit', cursor: 'pointer',
};

export default StudentList;
