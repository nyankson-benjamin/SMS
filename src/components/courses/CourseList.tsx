import { useState } from "react";
import { useStore } from "../../store/useStore";
import { PlusCircle } from "lucide-react";
import Button from "../common/Button";
import CourseForm from "./CourseForm";
import { Table } from "../Table";
import { CoursesColumn } from "./CoursesColumn";

const CourseList = () => {
  const { courses } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<
    (typeof courses)[0] | null
  >(null);

  const handleClose = () => {
    setShowForm(false);
    setEditingCourse(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Courses</h1>
        <Button
          className="flex items-center gap-2"
          onClick={() => setShowForm(true)}
        >
          <PlusCircle className="w-4 h-4" />
          Add Course
        </Button>
      </div>

      <Table columns={CoursesColumn} data={courses} />
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
