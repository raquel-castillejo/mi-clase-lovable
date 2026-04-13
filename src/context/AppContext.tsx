import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Student, Group, SeatingPlan } from '@/types/app';
import { sampleStudents, sampleGroups } from '@/data/sample';

let nextId = 100;
const uid = () => `id-${nextId++}`;

interface AppContextType {
  students: Student[];
  groups: Group[];
  plans: SeatingPlan[];
  addStudent: (data: Omit<Student, 'id'>) => void;
  editStudent: (id: string, data: Omit<Student, 'id'>) => void;
  deleteStudent: (id: string) => void;
  addGroup: (data: Omit<Group, 'id'>) => void;
  editGroup: (id: string, data: Omit<Group, 'id'>) => void;
  deleteGroup: (id: string) => void;
  addPlan: (data: Omit<SeatingPlan, 'id'>) => void;
  deletePlan: (id: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [students, setStudents] = useState<Student[]>(sampleStudents);
  const [groups, setGroups] = useState<Group[]>(sampleGroups);
  const [plans, setPlans] = useState<SeatingPlan[]>([]);

  const addStudent = (data: Omit<Student, 'id'>) =>
    setStudents((prev) => [...prev, { ...data, id: uid() }]);

  const editStudent = (id: string, data: Omit<Student, 'id'>) =>
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...data, id } : s)));

  const deleteStudent = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    setGroups((prev) => prev.map((g) => ({ ...g, memberIds: g.memberIds.filter((m) => m !== id) })));
  };

  const addGroup = (data: Omit<Group, 'id'>) =>
    setGroups((prev) => [...prev, { ...data, id: uid() }]);

  const editGroup = (id: string, data: Omit<Group, 'id'>) =>
    setGroups((prev) => prev.map((g) => (g.id === id ? { ...data, id } : g)));

  const deleteGroup = (id: string) => {
    setGroups((prev) => prev.filter((g) => g.id !== id));
    setPlans((prev) => prev.filter((p) => p.groupId !== id));
  };

  const addPlan = (data: Omit<SeatingPlan, 'id'>) =>
    setPlans((prev) => [...prev, { ...data, id: uid() }]);

  const deletePlan = (id: string) =>
    setPlans((prev) => prev.filter((p) => p.id !== id));

  return (
    <AppContext.Provider value={{ students, groups, plans, addStudent, editStudent, deleteStudent, addGroup, editGroup, deleteGroup, addPlan, deletePlan }}>
      {children}
    </AppContext.Provider>
  );
};
