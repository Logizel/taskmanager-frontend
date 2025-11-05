import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth()
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white border-b">
      <h1 className="text-lg font-semibold">Vibe Task Manager</h1>
      {isAuthenticated && (
        <button className="px-3 py-2 text-sm bg-gray-900 text-white rounded" onClick={logout}>
          Logout
        </button>
      )}
    </header>
  )
}


