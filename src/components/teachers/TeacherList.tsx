import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { PlusCircle } from 'lucide-react';
import Button from '../common/Button';
import TeacherForm from './TeacherForm';
import { Table } from '../Table';
import { TeachersColumn } from './TeachersColumn';
const TeacherList = () => {
  const { teachers } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<typeof teachers[0] | null>(null);


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
        <Table 
          data={teachers}  
          columns={TeachersColumn}
        />
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