import { useEffect, useState } from 'react'
import api from '../lib/api'
import TaskCard from '../components/TaskCard'
import TaskForm from '../components/TaskForm'

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])
  const [tags, setTags] = useState([])
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const load = () => {
    Promise.all([api.get('/tasks/'), api.get('/projects/'), api.get('/tags/')])
      .then(([t, p, g]) => {
        setTasks(t.data.results ?? t.data)
        setProjects(p.data.results ?? p.data)
        setTags(g.data.results ?? g.data)
      })
  }

  useEffect(() => { load() }, [])

  const create = async (payload) => {
    await api.post('/tasks/', payload)
    setShowForm(false)
    load()
  }
  const update = async (payload) => {
    await api.put(`/tasks/${editing.id}/`, payload)
    setEditing(null)
    setShowForm(false)
    load()
  }
  const remove = async (task) => {
    await api.delete(`/tasks/${task.id}/`)
    load()
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <button className="px-3 py-2 bg-gray-900 text-white rounded" onClick={()=>{setEditing(null); setShowForm(true)}}>New Task</button>
      </div>
      {showForm && (
        <div className="bg-white border rounded p-4">
          <TaskForm task={editing} projects={projects} tags={tags} onSubmit={editing?update:create} onCancel={()=>{setShowForm(false); setEditing(null)}} />
        </div>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((t) => (
          <TaskCard key={t.id} task={t} onEdit={(task)=>{setEditing(task); setShowForm(true)}} onDelete={remove} />
        ))}
      </div>
    </div>
  )
}


