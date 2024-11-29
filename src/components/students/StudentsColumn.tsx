import { ColumnDef } from "@tanstack/react-table";
import { Student } from "../../types";
import Button from "../common/Button";
import { useState } from "react";
import { useStore } from "../../store/useStore";
import StudentForm from "./StudentForm";
export const StudentsColumn: ColumnDef<Student>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Grade",
    accessorKey: "grade",
  },

  {
    header: "Actions",
    cell: ({row}) => {
      const TeacherActions = () => {
        const [openForm, setOpenForm] = useState(false);
        const {deleteStudent} = useStore()
        return (
          <>
          {openForm && <StudentForm initialValues={row.original} onClose={()=>setOpenForm(false)}/>}
            <div className="flex gap-2">
              <Button onClick={()=>setOpenForm(true)} variant="secondary">Edit</Button>
              <Button variant="danger" onClick={()=>deleteStudent(row.original.id)}>Delete</Button>
            </div>
          </>
        );
      };

      return <TeacherActions />;
    },
  },
];
