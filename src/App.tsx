import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import StudentList from './components/students/StudentList';
import TeacherList from './components/teachers/TeacherList';
import CourseList from './components/courses/CourseList';
import DepartmentList from './components/departments/DepartmentList';
import NavBar from './components/NavBar';
import { useState } from 'react';
import LoginForm from './components/auth/LoginForm';
import { useUser } from './store/useUser';


function App() {
  const [toggleSideBar, setToggleSideBar] = useState(false)
  const {isLoggedIn} = useUser()
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
       {isLoggedIn && <Sidebar open={toggleSideBar} />}
        <main className="flex-1 overflow-auto">
        {isLoggedIn && <NavBar toggle={()=>setToggleSideBar(!toggleSideBar)} open={toggleSideBar}/>}
          <Routes>
            {isLoggedIn ? (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/students" element={<StudentList />} />
                <Route path="/teachers" element={<TeacherList />} />
                <Route path="/courses" element={<CourseList />} />
                <Route path="/departments" element={<DepartmentList />} />
              </>
            ) : (
              <>
                <Route path="/login" element={<LoginForm />} />
                <Route path="*" element={<Navigate to="/login" />}  />
              </>
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;