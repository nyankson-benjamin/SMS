import { User } from "lucide-react";
import { useUser } from "../../store/useUser";
export default function Profile() {
  const { user,logout  } = useUser();
  return (
    <div className="flex items-center gap-2">
      {user?.email}
      <div className="shadow-md size-10 flex items-center justify-center rounded-full cursor-pointer">
        <User onClick={logout} />
      </div>
    </div>
  );
}
