import { Student, Teacher, Course, Department } from '../types';

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@school.com',
    grade: '10th',
    enrollmentDate: '2024-01-15'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@school.com',
    grade: '11th',
    enrollmentDate: '2024-02-01'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@school.com',
    grade: '9th',
    enrollmentDate: '2024-01-20'
  }
];

export const mockTeachers: Teacher[] = [
  {
    id: '1',
    name: 'Dr. Sarah Wilson',
    email: 'sarah.wilson@school.com',
    subject: 'Mathematics',
    department: 'Science'
  },
  {
    id: '2',
    name: 'Prof. Robert Brown',
    email: 'robert.brown@school.com',
    subject: 'Physics',
    department: 'Science'
  },
  {
    id: '3',
    name: 'Ms. Emily Davis',
    email: 'emily.davis@school.com',
    subject: 'Literature',
    department: 'Humanities'
  }
];

export const mockCourses: Course[] = [
  {
    id: '1',
    name: 'Advanced Mathematics',
    description: 'Advanced topics in algebra, calculus, and geometry',
    credits: 4,
    teacherId: '1'
  },
  {
    id: '2',
    name: 'Physics 101',
    description: 'Introduction to classical mechanics and thermodynamics',
    credits: 3,
    teacherId: '2'
  },
  {
    id: '3',
    name: 'World Literature',
    description: 'Study of classic literary works from around the world',
    credits: 3,
    teacherId: '3'
  }
];

export const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Science',
    description: 'Department of Natural Sciences',
    headTeacherId: '1'
  },
  {
    id: '2',
    name: 'Humanities',
    description: 'Department of Arts and Humanities',
    headTeacherId: '3'
  }
];