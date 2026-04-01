import { useState } from 'react';
import type { Student, Group, SeatingPlan, Section } from '@/types/app';
import { sampleStudents, sampleGroups } from '@/data/sample';
import AppNav from '@/components/AppNav';
import StudentList from '@/components/students/StudentList';
import StudentModal from '@/components/students/StudentModal';
import GroupList from '@/components/groups/GroupList';
import GroupModal from '@/components/groups/GroupModal';
import SeatingList from '@/components/seating/SeatingList';
import SeatingModal from '@/components/seating/SeatingModal';
import MemoryGame from '@/components/game/MemoryGame';

let nextId = 100;
const uid = () => `id-${nextId++}`;

const Index = () => {
  const [section, setSection] = useState<Section>('students');
  const [students, setStudents] = useState<Student[]>(sampleStudents);
  const [groups, setGroups] = useState<Group[]>(sampleGroups);
  const [plans, setPlans] = useState<SeatingPlan[]>([]);

  // Student modals
  const [studentModal, setStudentModal] = useState<{ open: boolean; editing: Student | null }>({ open: false, editing: null });
  const [groupModal, setGroupModal] = useState<{ open: boolean; editing: Group | null }>({ open: false, editing: null });
  const [seatingModal, setSeatingModal] = useState(false);

  // Students CRUD
  const addStudent = (data: Omit<Student, 'id'>) => {
    setStudents((prev) => [...prev, { ...data, id: uid() }]);
    setStudentModal({ open: false, editing: null });
  };
  const editStudent = (data: Omit<Student, 'id'>) => {
    const id = studentModal.editing!.id;
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...data, id } : s)));
    setStudentModal({ open: false, editing: null });
  };
  const deleteStudent = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    setGroups((prev) => prev.map((g) => ({ ...g, memberIds: g.memberIds.filter((m) => m !== id) })));
  };

  // Groups CRUD
  const addGroup = (data: Omit<Group, 'id'>) => {
    setGroups((prev) => [...prev, { ...data, id: uid() }]);
    setGroupModal({ open: false, editing: null });
  };
  const editGroup = (data: Omit<Group, 'id'>) => {
    const id = groupModal.editing!.id;
    setGroups((prev) => prev.map((g) => (g.id === id ? { ...data, id } : g)));
    setGroupModal({ open: false, editing: null });
  };
  const deleteGroup = (id: string) => {
    setGroups((prev) => prev.filter((g) => g.id !== id));
    setPlans((prev) => prev.filter((p) => p.groupId !== id));
  };

  // Seating CRUD
  const addPlan = (data: Omit<SeatingPlan, 'id'>) => {
    setPlans((prev) => [...prev, { ...data, id: uid() }]);
    setSeatingModal(false);
  };
  const deletePlan = (id: string) => setPlans((prev) => prev.filter((p) => p.id !== id));

  return (
    <div style={{ minHeight: '100vh', background: 'hsl(var(--color-surface))' }}>
      <AppNav active={section} onChange={setSection} />

      {section === 'students' && (
        <>
          <StudentList
            students={students}
            onAdd={() => setStudentModal({ open: true, editing: null })}
            onEdit={(id) => setStudentModal({ open: true, editing: students.find((s) => s.id === id)! })}
            onDelete={deleteStudent}
          />
          {studentModal.open && (
            <StudentModal
              student={studentModal.editing}
              onSave={studentModal.editing ? editStudent : addStudent}
              onClose={() => setStudentModal({ open: false, editing: null })}
            />
          )}
        </>
      )}

      {section === 'groups' && (
        <>
          <GroupList
            groups={groups}
            students={students}
            onAdd={() => setGroupModal({ open: true, editing: null })}
            onEdit={(id) => setGroupModal({ open: true, editing: groups.find((g) => g.id === id)! })}
            onDelete={deleteGroup}
          />
          {groupModal.open && (
            <GroupModal
              group={groupModal.editing}
              students={students}
              onSave={groupModal.editing ? editGroup : addGroup}
              onClose={() => setGroupModal({ open: false, editing: null })}
            />
          )}
        </>
      )}

      {section === 'seating' && (
        <>
          <SeatingList plans={plans} groups={groups} students={students} onAdd={() => setSeatingModal(true)} onDelete={deletePlan} />
          {seatingModal && (
            <SeatingModal groups={groups} students={students} onSave={addPlan} onClose={() => setSeatingModal(false)} />
          )}
        </>
      )}

      {section === 'game' && <MemoryGame groups={groups} students={students} />}
    </div>
  );
};

export default Index;
