import { ColumnDef } from "@tanstack/react-table";
import { Teacher } from "../../types";
import Button from "../common/Button";
import TeacherForm from "./TeacherForm";
import { useState } from "react";
import { useStore } from "../../store/useStore";
export const TeachersColumn: ColumnDef<Teacher>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Subject",
    accessorKey: "subject",
  },

  {
    header: "Actions",
    cell: ({row}) => {
      const TeacherActions = () => {
        const [openForm, setOpenForm] = useState(false);
        const {deleteTeacher} = useStore()
        return (
          <>
          {openForm && <TeacherForm initialValues={row.original} onClose={()=>setOpenForm(false)}/>}
            <div className="flex gap-2">
            <Button onClick={()=>setOpenForm(true)} variant="secondary">Edit</Button>
            <Button variant="danger" onClick={()=>deleteTeacher(row.original.id)}>Delete</Button>
            </div>
          </>
        );
      };

      return <TeacherActions />;
    },
  },
];
