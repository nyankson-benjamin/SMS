import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { PlusCircle } from 'lucide-react';
import Button from '../common/Button';
import CourseForm from './CourseForm';

const CourseList = () => {
  const { courses, deleteCourse, teachers } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<typeof courses[0] | null>(null);

  const handleEdit = (course: typeof courses[0]) => {
    setEditingCourse(course);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingCourse(null);
  };

  const getTeacherName = (teacherId: string) => {
    const teacher = teachers.find(t => t.id === teacherId);
    return teacher ? teacher.name : 'Unknown Teacher';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Courses</h1>
        <Button className="flex items-center gap-2" onClick={() => setShowForm(true)}>
          <PlusCircle className="w-4 h-4" />
          Add Course
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Credits
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Teacher
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No courses found
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr key={course.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{course.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{course.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{course.credits}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getTeacherName(course.teacherId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button 
                      variant="secondary" 
                      className="mr-2"
                      onClick={() => handleEdit(course)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="danger"
                      onClick={() => deleteCourse(course.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <CourseForm 
          onClose={handleClose} 
          initialValues={editingCourse || undefined}
        />
      )}
    </div>
  );
};

export default CourseList;