export type Subject = 
  | 'Letteratura'
  | 'Grammatica'
  | 'Antologia'
  | 'Geografia'
  | 'Storia'
  | 'Algebra'
  | 'Geometria'
  | 'Inglese'
  | 'Tecnologia'
  | 'Scienze'
  | 'Religione'
  | 'Educazione Civica'
  | 'Musica'
  | 'Arte'
  | 'Lettura Espressiva'
  | 'Spagnolo'
  | 'Motoria';

export interface Student {
  id: string;
  name: string;
  surname: string;
}

export interface Grade {
  id: string;
  studentId: string;
  classId: string;
  subject: string;
  value: string;
  date: string;
  type: 'Scritto' | 'Orale' | 'Pratico';
  description?: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  classId: string;
  date: string;
  type: 'Assenza' | 'Ritardo' | 'Uscita Anticipata' | 'Presente';
  time?: string;
}

export interface Lesson {
  id: string;
  classId: string;
  date: string;
  hour: number;
  subject: string;
  topic: string;
  description: string;
  author: string;
}

export interface Homework {
  id: string;
  classId: string;
  subject: string;
  description: string;
  dueDate: string;
  author: string;
}

export interface PlannedActivity {
  id: string;
  classId: string;
  title: string;
  date: string;
  description: string;
}

export interface Note {
  id: string;
  classId: string;
  studentId?: string; // Optional for generic notes
  type: 'Merito' | 'Generica' | 'Individuale';
  description: string;
  date: string;
  author: string;
}

export interface Meeting {
  id: string;
  studentId: string;
  parentName: string;
  date: string;
  time: string;
  notes: string;
  author: string;
}

export interface User {
  id: string;
  username: string;
  name: string;
  role: 'Docente';
}

export type WeeklySchedule = {
  [day: number]: {
    [hour: number]: string;
  }
};

export interface SchoolClass {
  id: string;
  name: string;
  students: Student[];
  subjects: string[];
  schedule: WeeklySchedule;
}
