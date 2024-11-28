import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { PlusCircle } from 'lucide-react';
import Button from '../common/Button';
import DepartmentForm from './DepartmentForm';

const DepartmentList = () => {
  const { departments, deleteDepartment, teachers } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<typeof departments[0] | null>(null);

  const handleEdit = (department: typeof departments[0]) => {
    setEditingDepartment(department);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingDepartment(null);
  };

  const getHeadTeacherName = (teacherId: string) => {
    const teacher = teachers.find(t => t.id === teacherId);
    return teacher ? teacher.name : 'Unknown Teacher';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Departments</h1>
        <Button className="flex items-center gap-2" onClick={() => setShowForm(true)}>
          <PlusCircle className="w-4 h-4" />
          Add Department
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
                Head Teacher
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {departments.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No departments found
                </td>
              </tr>
            ) : (
              departments.map((department) => (
                <tr key={department.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{department.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{department.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getHeadTeacherName(department.headTeacherId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button 
                      variant="secondary" 
                      className="mr-2"
                      onClick={() => handleEdit(department)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="danger"
                      onClick={() => deleteDepartment(department.id)}
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
        <DepartmentForm 
          onClose={handleClose} 
          initialValues={editingDepartment || undefined}
        />
      )}
    </div>
  );
};

export default DepartmentList;