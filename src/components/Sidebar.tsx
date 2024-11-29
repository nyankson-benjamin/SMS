import { Users, GraduationCap, BookOpen, Home, Building2, } from 'lucide-react';
import SideBarLink from './SideBarLink';


const Sidebar = ({open}:{open:boolean}) => {
  const routes = [
    {name:"Dashboard", path:"/", icon:Home},
    {name:"Students", path:"/students", icon:Users},
    {name:"Teachers", path:"/teachers", icon:GraduationCap},
    {name:"Courses", path:"/courses", icon:BookOpen},
    {name:"Departments", path:"/departments", icon:Building2},
  ]
  return (
    <div className={`bg-primary text-white  min-h-screen p-4 ${open ? 'w-64' : 'w-16'}`}>
      <div className="flex items-center gap-2 mb-8">
        <GraduationCap className="w-8 h-8" />
     {  open && <h1 className="text-xl font-bold">School Manager</h1>}
      </div>
      
      <nav className="space-y-2">
        {routes.map((route)=>(
          <SideBarLink key={route.name} to={route.path} icon={route.icon} open={open}>
            {route.name}
          </SideBarLink>
        ))}

      </nav>
    </div>
  );
};

export default Sidebar;