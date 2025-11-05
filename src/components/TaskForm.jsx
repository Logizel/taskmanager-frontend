import { useEffect, useState } from 'react'

export default function TaskForm({ task, projects, tags, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    project: '',
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    due_date: '',
    assignee: '',
    tag_ids: [],
  })

  useEffect(() => {
    if (task) setForm({
      project: task.project,
      title: task.title,
      description: task.description || '',
      status: task.status,
      priority: task.priority,
      due_date: task.due_date || '',
      assignee: task.assignee || '',
      tag_ids: task.tags?.map(t => t.id) || [],
    })
  }, [task])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleTags = (e) => {
    const options = Array.from(e.target.selectedOptions)
    setForm((f) => ({ ...f, tag_ids: options.map(o => Number(o.value)) }))
  }

  const submit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <select name="project" value={form.project} onChange={handleChange} className="w-full border rounded p-2" required>
        <option value="">Select project</option>
        {projects.map((p) => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full border rounded p-2" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border rounded p-2" />
      <div className="grid grid-cols-2 gap-3">
        <select name="status" value={form.status} onChange={handleChange} className="border rounded p-2">
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <select name="priority" value={form.priority} onChange={handleChange} className="border rounded p-2">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <input type="date" name="due_date" value={form.due_date || ''} onChange={handleChange} className="w-full border rounded p-2" />
      <select name="assignee" value={form.assignee || ''} onChange={handleChange} className="w-full border rounded p-2">
        <option value="">Unassigned</option>
      </select>
      <select multiple value={form.tag_ids} onChange={handleTags} className="w-full border rounded p-2 h-32">
        {tags.map((t) => (
          <option key={t.id} value={t.id}>{t.name}</option>
        ))}
      </select>
      <div className="flex gap-2">
        <button className="px-3 py-2 bg-gray-900 text-white rounded" type="submit">Save</button>
        <button className="px-3 py-2 bg-gray-200 rounded" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}


