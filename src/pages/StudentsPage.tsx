import { useState } from 'react';
import type { Student } from '@/types/app';
import { useAppContext } from '@/context/AppContext';
import StudentList from '@/components/students/StudentList';
import StudentModal from '@/components/students/StudentModal';

const StudentsPage = () => {
  const { students, addStudent, editStudent, deleteStudent } = useAppContext();
  const [modal, setModal] = useState<{ open: boolean; editing: Student | null }>({ open: false, editing: null });

  const handleSave = (data: Omit<Student, 'id'>) => {
    if (modal.editing) {
      editStudent(modal.editing.id, data);
    } else {
      addStudent(data);
    }
    setModal({ open: false, editing: null });
  };

  return (
    <>
      <StudentList
        students={students}
        onAdd={() => setModal({ open: true, editing: null })}
        onEdit={(id) => setModal({ open: true, editing: students.find((s) => s.id === id)! })}
        onDelete={deleteStudent}
      />
      {modal.open && (
        <StudentModal
          student={modal.editing}
          onSave={handleSave}
          onClose={() => setModal({ open: false, editing: null })}
        />
      )}
    </>
  );
};

export default StudentsPage;
