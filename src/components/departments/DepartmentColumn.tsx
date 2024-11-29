import { ColumnDef } from "@tanstack/react-table";
import { Department } from "../../types";
import Button from "../common/Button";
import { useState } from "react";
import { useStore } from "../../store/useStore";
import DepartmentForm from "./DepartmentForm";

export const DepartmentColumn: ColumnDef<Department>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    header: "Head Teacher",
    accessorKey: "headTeacherId",
    cell: ({ row }) => {
      <>jjjj</>;
      const HeaderTacher = () => {
        const { teachers } = useStore();
        const getHeadTeacherName = (teacherId: string) => {
          const teacher = teachers.find((t) => t.id === teacherId);
          return teacher ? teacher.name : "Unknown Teacher";
        };
        return <p>{getHeadTeacherName(row.original.headTeacherId)}</p>;
      };

      return <HeaderTacher />;
    },
  },

  {
    header: "Actions",
    cell: ({ row }) => {
      const DepartmentAction = () => {
        const [openForm, setOpenForm] = useState(false);
        const { deleteDepartment } = useStore();

        return (
          <>
            {openForm && (
              <DepartmentForm
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
                onClick={() => deleteDepartment(row.original.id)}
              >
                Delete
              </Button>
            </div>
          </>
        );
      };

      return <DepartmentAction />;
    },
  },
];
