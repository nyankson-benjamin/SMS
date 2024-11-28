import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import StudentList from './components/students/StudentList';
import TeacherList from './components/teachers/TeacherList';
import CourseList from './components/courses/CourseList';
import DepartmentList from './components/departments/DepartmentList';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/teachers" element={<TeacherList />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/departments" element={<DepartmentList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;