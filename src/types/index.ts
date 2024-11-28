export interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  enrollmentDate: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  subject: string;
  department: string;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  teacherId: string;
  credits: number;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  headTeacherId: string;
}