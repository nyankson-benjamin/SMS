import { useStore } from '../store/useStore';
import { Users, GraduationCap, BookOpen, Building2 } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon }: { title: string; value: number; icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }) => (
  <div className="bg-white rounded-lg p-6 shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <Icon className="w-8 h-8 text-blue-500" />
    </div>
  </div>
);

const Dashboard = () => {
  const { students, teachers, courses, departments, activities } = useStore();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Students" value={students.length} icon={Users} />
        <StatCard title="Total Teachers" value={teachers.length} icon={GraduationCap} />
        <StatCard title="Total Courses" value={courses.length} icon={BookOpen} />
        <StatCard title="Total Departments" value={departments.length} icon={Building2} />
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
        <div className="bg-white rounded-lg shadow-md p-4 text-gray-500 border border-gray-200 h-[60vh] overflow-auto">
         {!activities.length && <p className="text-center text-gray-400">No recent activity</p>}
          {activities.map((activity, index) => (
            <p key={index} className="border-b last:border-b-0 py-2 hover:bg-slate-50 p-2">{activity}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;