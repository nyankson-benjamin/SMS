import { useState } from "react";
import { useStore } from "../../store/useStore";
import { PlusCircle } from "lucide-react";
import Button from "../common/Button";
import StudentForm from "./StudentForm";
import { Table } from "../Table";
import { StudentsColumn } from "./StudentsColumn";

const StudentList = () => {
  const { students } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<
    (typeof students)[0] | null
  >(null);

 
  const handleClose = () => {
    setShowForm(false);
    setEditingStudent(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Students</h1>
        <Button
          className="flex items-center gap-2"
          onClick={() => setShowForm(true)}
        >
          <PlusCircle className="w-4 h-4" />
          Add Student
        </Button>
      </div>

      <Table columns={StudentsColumn} data={students} pageSize={10} />
      {showForm && (
        <StudentForm
          onClose={handleClose}
          initialValues={editingStudent || undefined}
        />
      )}
    </div>
  );
};

export default StudentList;
