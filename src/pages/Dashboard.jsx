import { useEffect, useState } from 'react'
import api from '../lib/api'

export default function Dashboard() {
  const [stats, setStats] = useState({ projects: 0, tasks: 0, tags: 0 })

  useEffect(() => {
    Promise.all([
      api.get('/projects/'),
      api.get('/tasks/'),
      api.get('/tags/'),
    ]).then(([p, t, g]) => setStats({ projects: p.data.count ?? p.data.length, tasks: t.data.count ?? t.data.length, tags: g.data.count ?? g.data.length }))
      .catch(() => {})
  }, [])

  return (
    <div className="grid grid-cols-3 gap-4">
      <Stat title="Projects" value={stats.projects} />
      <Stat title="Tasks" value={stats.tasks} />
      <Stat title="Tags" value={stats.tags} />
    </div>
  )
}

function Stat({ title, value }) {
  return (
    <div className="bg-white border rounded p-6">
      <div className="text-sm text-gray-600">{title}</div>
      <div className="text-3xl font-semibold">{value}</div>
    </div>
  )
}


