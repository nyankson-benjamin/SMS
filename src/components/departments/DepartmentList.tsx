import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { PlusCircle } from 'lucide-react';
import Button from '../common/Button';
import DepartmentForm from './DepartmentForm';
import { Table } from '../Table';
import { DepartmentColumn } from './DepartmentColumn';

const DepartmentList = () => {
  const { departments, } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<typeof departments[0] | null>(null);


  const handleClose = () => {
    setShowForm(false);
    setEditingDepartment(null);
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

<Table data={departments} columns={DepartmentColumn}/>
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