import { create } from 'zustand';
import { Student, Teacher, Course, Department } from '../types';
import { mockStudents, mockTeachers, mockCourses, mockDepartments } from '../data/mockData';

interface StoreState {
  students: Student[];
  teachers: Teacher[];
  courses: Course[];
  departments: Department[];
  addStudent: (student: Student) => void;
  addTeacher: (teacher: Teacher) => void;
  addCourse: (course: Course) => void;
  addDepartment: (department: Department) => void;
  deleteStudent: (id: string) => void;
  deleteTeacher: (id: string) => void;
  deleteCourse: (id: string) => void;
  deleteDepartment: (id: string) => void;
  updateStudent: (student: Student) => void;
  updateTeacher: (teacher: Teacher) => void;
  updateCourse: (course: Course) => void;
  updateDepartment: (department: Department) => void;
}

export const useStore = create<StoreState>((set) => ({
  students: mockStudents,
  teachers: mockTeachers,
  courses: mockCourses,
  departments: mockDepartments,
  addStudent: (student) =>
    set((state) => ({ students: [...state.students, student] })),
  addTeacher: (teacher) =>
    set((state) => ({ teachers: [...state.teachers, teacher] })),
  addCourse: (course) => 
    set((state) => ({ courses: [...state.courses, course] })),
  addDepartment: (department) =>
    set((state) => ({ departments: [...state.departments, department] })),
  deleteStudent: (id) =>
    set((state) => ({ students: state.students.filter(s => s.id !== id) })),
  deleteTeacher: (id) =>
    set((state) => ({ teachers: state.teachers.filter(t => t.id !== id) })),
  deleteCourse: (id) =>
    set((state) => ({ courses: state.courses.filter(c => c.id !== id) })),
  deleteDepartment: (id) =>
    set((state) => ({ departments: state.departments.filter(d => d.id !== id) })),
  updateStudent: (student) =>
    set((state) => ({
      students: state.students.map(s => s.id === student.id ? student : s)
    })),
  updateTeacher: (teacher) =>
    set((state) => ({
      teachers: state.teachers.map(t => t.id === teacher.id ? teacher : t)
    })),
  updateCourse: (course) =>
    set((state) => ({
      courses: state.courses.map(c => c.id === course.id ? course : c)
    })),
  updateDepartment: (department) =>
    set((state) => ({
      departments: state.departments.map(d => d.id === department.id ? department : d)
    })),
}));