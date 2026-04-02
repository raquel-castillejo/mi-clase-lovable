import { useState, useRef } from 'react';
import { X, Upload } from 'lucide-react';
import type { Student } from '@/types/app';

interface StudentModalProps {
  student?: Student | null;
  onSave: (data: Omit<Student, 'id'>) => void;
  onClose: () => void;
}

const StudentModal = ({ student, onSave, onClose }: StudentModalProps) => {
  const [name, setName] = useState(student?.name ?? '');
  const [notes, setNotes] = useState(student?.notes ?? '');
  const [photo, setPhoto] = useState<string | null>(student?.photo ?? null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ name: name.trim(), notes: notes.trim(), photo });
  };

  return (
    <div style={overlayStyle} className="animate-fade-in" onClick={onClose}>
      <div style={modalStyle} className="animate-scale-pop" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
          <h2 style={titleStyle}>{student ? 'Edit Student' : 'Add Student'}</h2>
          <button onClick={onClose} className="hover-dim" style={closeBtnStyle}><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <div>
            <label style={labelStyle}>Full name</label>
            <input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="Student name" autoFocus />
          </div>
          <div>
            <label style={labelStyle}>Notes</label>
            <textarea style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional notes" />
          </div>
          <div>
            <label style={labelStyle}>Photo</label>
            <input type="file" accept="image/*" ref={fileRef} onChange={handlePhoto} style={{ display: 'none' }} />
            <button type="button" onClick={() => fileRef.current?.click()} className="hover-brighten" style={uploadBtnStyle}>
              <Upload size={16} /> {photo ? 'Change photo' : 'Upload photo'}
            </button>
            {photo && <img src={photo} alt="Preview" style={{ width: 64, height: 64, borderRadius: 'var(--radius-pill)', objectFit: 'cover', marginTop: 'var(--space-sm)' }} />}
          </div>
          <button type="submit" className="hover-brighten" style={submitBtnStyle}>
            {student ? 'Save Changes' : 'Add Student'}
          </button>
        </form>
      </div>
    </div>
  );
};

const overlayStyle: React.CSSProperties = {
  position: 'fixed', inset: 0, background: 'hsl(var(--color-overlay))', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50,
};
const modalStyle: React.CSSProperties = {
  background: 'hsl(var(--color-card))', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', width: '100%', maxWidth: 440, maxHeight: '90vh', overflow: 'auto',
};
const titleStyle: React.CSSProperties = {
  fontSize: 'var(--text-title-2)', lineHeight: 'var(--leading-title-2)', fontWeight: 'var(--weight-headline)', color: 'hsl(var(--color-text))', margin: 0,
};
const closeBtnStyle: React.CSSProperties = {
  background: 'none', border: 'none', cursor: 'pointer', color: 'hsl(var(--color-text-secondary))', display: 'flex',
};
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 'var(--text-subhead)', lineHeight: 'var(--leading-subhead)', fontWeight: 'var(--weight-headline)', color: 'hsl(var(--color-text))', marginBottom: 'var(--space-xs)',
};
const inputStyle: React.CSSProperties = {
  width: '100%', padding: 'var(--space-sm) var(--space-md)', borderRadius: 'var(--radius-sm)', border: '1px solid hsl(var(--color-border))', fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)', fontFamily: 'inherit', background: 'hsl(var(--color-surface))', color: 'hsl(var(--color-text))', boxSizing: 'border-box',
};
const uploadBtnStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 'var(--space-xs)', padding: 'var(--space-sm) var(--space-md)', borderRadius: 'var(--radius-sm)', border: '1px dashed hsl(var(--color-border))', background: 'transparent', cursor: 'pointer', fontSize: 'var(--text-subhead)', color: 'hsl(var(--color-text-secondary))', fontFamily: 'inherit',
};
const submitBtnStyle: React.CSSProperties = {
  padding: 'var(--space-sm) var(--space-lg)', borderRadius: 'var(--radius-pill)', border: 'none', background: 'hsl(var(--color-secondary))', color: 'hsl(var(--color-secondary-text))', fontSize: 'var(--text-headline)', lineHeight: 'var(--leading-headline)', fontWeight: 'var(--weight-headline)', fontFamily: 'inherit', cursor: 'pointer',
};

export default StudentModal;
