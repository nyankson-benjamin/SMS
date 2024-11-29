import {
  LucideChevronRightCircle,
  LucideChevronLeftCircle,
} from "lucide-react";
import Profile from "./profile/Profile";
function NavBar({ toggle, open }: { toggle: () => void; open: boolean }) {
  return (
    <nav className="h-16 shadow-sm p-5 flex items-center justify-between text-primary">
      {<div className="-ml-2 shadow-md rounded-full z-[1000]">
      {open ? (
        <LucideChevronLeftCircle onClick={toggle}  />
      ) : (
        <LucideChevronRightCircle onClick={toggle} />
      )}
      </div>}
      <Profile/>
    </nav>
  );
}

export default NavBar;
