import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { PlusCircle } from 'lucide-react';
import Button from '../common/Button';
import TeacherForm from './TeacherForm';

const TeacherList = () => {
  const { teachers, deleteTeacher } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<typeof teachers[0] | null>(null);

  const handleEdit = (teacher: typeof teachers[0]) => {
    setEditingTeacher(teacher);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingTeacher(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Teachers</h1>
        <Button className="flex items-center gap-2" onClick={() => setShowForm(true)}>
          <PlusCircle className="w-4 h-4" />
          Add Teacher
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
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {teachers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No teachers found
                </td>
              </tr>
            ) : (
              teachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{teacher.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{teacher.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{teacher.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{teacher.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button 
                      variant="secondary" 
                      className="mr-2"
                      onClick={() => handleEdit(teacher)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="danger"
                      onClick={() => deleteTeacher(teacher.id)}
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
        <TeacherForm 
          onClose={handleClose} 
          initialValues={editingTeacher || undefined}
        />
      )}
    </div>
  );
};

export default TeacherList;