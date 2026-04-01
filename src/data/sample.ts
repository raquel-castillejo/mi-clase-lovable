import { Student, Group } from '@/types/app';

export const sampleStudents: Student[] = [
  { id: 's1', name: 'Lucía García', notes: 'Sits near the window', photo: null },
  { id: 's2', name: 'Mateo López', notes: 'Needs glasses reminder', photo: null },
  { id: 's3', name: 'Valentina Torres', notes: '', photo: null },
  { id: 's4', name: 'Santiago Ruiz', notes: 'Very participative', photo: null },
  { id: 's5', name: 'Isabella Moreno', notes: '', photo: null },
  { id: 's6', name: 'Sebastián Díaz', notes: 'Quiet, prefers back row', photo: null },
  { id: 's7', name: 'Camila Fernández', notes: 'Class representative', photo: null },
  { id: 's8', name: 'Emiliano Martínez', notes: '', photo: null },
];

export const sampleGroups: Group[] = [
  { id: 'g1', name: '3rd Grade A', memberIds: ['s1', 's2', 's3', 's4'] },
  { id: 'g2', name: '4th Grade B', memberIds: ['s5', 's6', 's7', 's8'] },
];
