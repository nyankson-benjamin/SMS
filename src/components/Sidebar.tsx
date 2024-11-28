import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, GraduationCap, BookOpen, Home, Building2 } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="flex items-center gap-2 mb-8">
        <GraduationCap className="w-8 h-8" />
        <h1 className="text-xl font-bold">School Manager</h1>
      </div>
      
      <nav className="space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
              isActive ? 'bg-gray-700' : ''
            }`
          }
        >
          <Home className="w-5 h-5" />
          Dashboard
        </NavLink>
        <NavLink
          to="/students"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
              isActive ? 'bg-gray-700' : ''
            }`
          }
        >
          <Users className="w-5 h-5" />
          Students
        </NavLink>
        <NavLink
          to="/teachers"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
              isActive ? 'bg-gray-700' : ''
            }`
          }
        >
          <GraduationCap className="w-5 h-5" />
          Teachers
        </NavLink>
        <NavLink
          to="/courses"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
              isActive ? 'bg-gray-700' : ''
            }`
          }
        >
          <BookOpen className="w-5 h-5" />
          Courses
        </NavLink>
        <NavLink
          to="/departments"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
              isActive ? 'bg-gray-700' : ''
            }`
          }
        >
          <Building2 className="w-5 h-5" />
          Departments
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;