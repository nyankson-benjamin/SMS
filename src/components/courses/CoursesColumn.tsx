import { ColumnDef } from "@tanstack/react-table";
import { Course } from "../../types";
import Button from "../common/Button";
import CourseForm from "./CourseForm";
import { useState } from "react";
import { useStore } from "../../store/useStore";
export const CoursesColumn: ColumnDef<Course>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    header: "Credits",
    accessorKey: "credits",
  },
  {
    header: "Teacher",
    accessorKey: "teacher",
    cell: ({ row }) => {
      const GetCourseTeacher = () => {
        const { teachers } = useStore();
        const getTeacherName = (teacherId: string) => {
          const teacher = teachers.find((t) => t.id === teacherId);
          return teacher ? teacher.name : "Unknown Teacher";
        };

        return <p>{getTeacherName(row.original.teacherId)}</p>;
      };
      return <GetCourseTeacher />;
    },
  },

  {
    header: "Actions",
    cell: ({ row }) => {
      const TeacherActions = () => {
        const [openForm, setOpenForm] = useState(false);
        const { deleteCourse } = useStore();
        return (
          <>
            {openForm && (
              <CourseForm
                initialValues={row.original}
                onClose={() => setOpenForm(false)}
              />
            )}
            <div className="flex gap-2">
              <Button onClick={() => setOpenForm(true)} variant="secondary">
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => deleteCourse(row.original.id)}
              >
                Delete
              </Button>
            </div>
          </>
        );
      };

      return <TeacherActions />;
    },
  },
];
