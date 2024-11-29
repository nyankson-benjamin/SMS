import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Student, Teacher, Course, Department } from '../types';
import { mockStudents, mockTeachers, mockCourses, mockDepartments } from '../data/mockData';

interface StoreState {
  students: Student[];
  teachers: Teacher[];
  courses: Course[];
  departments: Department[];
  activities: string[];
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

export const useStore = create<StoreState>()(persist(
  (set) => ({
    students: mockStudents,
    teachers: mockTeachers,
    courses: mockCourses,
    departments: mockDepartments,
    activities: [],
    addStudent: (student) =>
      set((state) => ({ students: [...state.students, student], activities:[...state.activities, `Added ${student.name} to students at ${new Date().toLocaleString()}`] })),
    addTeacher: (teacher) =>
      set((state) => ({ teachers: [...state.teachers, teacher], activities:[...state.activities, `Added ${teacher.name} to teachers at ${new Date().toLocaleString()}`] })),
    addCourse: (course) => 
      set((state) => ({ courses: [...state.courses, course], activities:[...state.activities, `Added ${course.name} to courses at ${new Date().toLocaleString()}`] })),
    addDepartment: (department) =>
      set((state) => ({ departments: [...state.departments, department], activities:[...state.activities, `Added ${department.name} to departments at ${new Date().toLocaleString()}`] })),
    deleteStudent: (id) =>
      set((state) => {
        const studentToDelete = state.students.find(s => s.id === id);
        return {
          students: state.students.filter(s => s.id !== id),
          activities: [...state.activities, `Deleted student ${studentToDelete?.name} at ${new Date().toLocaleString()}`]
        };
      }),
    deleteTeacher: (id) =>
      set((state) => {
        const teacherToDelete = state.teachers.find(t => t.id === id);
        return {
          teachers: state.teachers.filter(t => t.id !== id),
          activities: [...state.activities, `Deleted teacher ${teacherToDelete?.name} at ${new Date().toLocaleString()}`]
        };
      }),
    deleteCourse: (id) =>
      set((state) => {
        const courseToDelete = state.courses.find(c => c.id === id);
        return {
          courses: state.courses.filter(c => c.id !== id),
          activities: [...state.activities, `Deleted course ${courseToDelete?.name} at ${new Date().toLocaleString()}`]
        };
      }),
    deleteDepartment: (id) =>
      set((state) => {
        const departmentToDelete = state.departments.find(d => d.id === id);
        return {
          departments: state.departments.filter(d => d.id !== id),
          activities: [...state.activities, `Deleted department ${departmentToDelete?.name} at ${new Date().toLocaleString()}`]
        };
      }),
    updateStudent: (student) =>
      set((state) => {
        const updatedStudent = state.students.find(s => s.id === student.id);
        return {
          students: state.students.map(s => s.id === student.id ? student : s),
          activities: [...state.activities, `Updated student ${updatedStudent?.name} at ${new Date().toLocaleString()}`]
        };
      }),
    updateTeacher: (teacher) =>
      set((state) => {
        const updatedTeacher = state.teachers.find(t => t.id === teacher.id);
        return {
          teachers: state.teachers.map(t => t.id === teacher.id ? teacher : t),
          activities: [...state.activities, `Updated teacher ${updatedTeacher?.name} at ${new Date().toLocaleString()}`]
        };
      }),
    updateCourse: (course) =>
      set((state) => {
        const updatedCourse = state.courses.find(c => c.id === course.id);
        return {
          courses: state.courses.map(c => c.id === course.id ? course : c),
          activities: [...state.activities, `Updated course ${updatedCourse?.name} at ${new Date().toLocaleString()}`]
        };
      }),
    updateDepartment: (department) =>
      set((state) => {
        const updatedDepartment = state.departments.find(d => d.id === department.id);
        return {
          departments: state.departments.map(d => d.id === department.id ? department : d),
          activities: [...state.activities, `Updated department ${updatedDepartment?.name} at ${new Date().toLocaleString()}`]
        };
      }),
  }),
  {
    name: 'store',
    getStorage: () => localStorage,
  }
));