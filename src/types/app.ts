export interface Student {
  id: string;
  name: string;
  notes: string;
  photo: string | null;
}

export interface Group {
  id: string;
  name: string;
  memberIds: string[];
}

export interface SeatingPlan {
  id: string;
  name: string;
  groupId: string;
  rows: number;
  cols: number;
  seats: (string | null)[][]; // studentId or null
}

export type Section = 'students' | 'groups' | 'seating' | 'game';
