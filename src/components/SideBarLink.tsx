import React from 'react'
import { NavLink } from 'react-router-dom'

type SidebarLinkProps = {
    to: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    children: React.ReactNode;
    open:boolean
  };
export default function SideBarLink({ to, icon: Icon, children, open }: SidebarLinkProps) {
  return (
    <NavLink
    to={to}
    className={({ isActive, }) =>
      `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
        isActive ? 'bg-gray-700' : ''
      }`
    }
  >
    <Icon className="w-5 h-5" />
    {open && children}
  </NavLink>
  )
}
