import { NavLink } from 'react-router-dom'

const linkClasses = ({ isActive }) =>
  `block px-3 py-2 rounded hover:bg-gray-100 ${isActive ? 'bg-gray-200 font-medium' : ''}`

export default function Sidebar() {
  return (
    <aside className="w-56 border-r bg-white min-h-[calc(100vh-56px)] p-3">
      <nav className="space-y-1">
        <NavLink className={linkClasses} to="/">Dashboard</NavLink>
        <NavLink className={linkClasses} to="/tasks">Tasks</NavLink>
        <NavLink className={linkClasses} to="/projects">Projects</NavLink>
        <NavLink className={linkClasses} to="/tags">Tags</NavLink>
      </nav>
    </aside>
  )
}


