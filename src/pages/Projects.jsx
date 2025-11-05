import { useEffect, useState } from 'react'
import api from '../lib/api'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const load = () => {
    api.get('/projects/')
      .then((r) => setProjects(r.data.results ?? r.data))
      .catch((err) => {
        console.error('Failed to load projects:', err)
        setError('Failed to load projects')
      })
  }
  useEffect(() => { load() }, [])

  const create = async (e) => {
    e?.preventDefault()
    if (!name.trim()) {
      setError('Project name is required')
      return
    }
    setError('')
    setLoading(true)
    try {
      const payload = { name: name.trim() }
      if (description.trim()) {
        payload.description = description.trim()
      }
      await api.post('/projects/', payload)
      setName('')
      setDescription('')
      load()
    } catch (err) {
      console.error('Failed to create project:', err)
      console.error('Error response:', err.response?.data)
      let errorMsg = 'Failed to create project'
      if (err.response?.data) {
        if (err.response.data.detail) {
          errorMsg = err.response.data.detail
        } else if (err.response.data.non_field_errors) {
          errorMsg = err.response.data.non_field_errors.join(', ')
        } else if (typeof err.response.data === 'object') {
          // Format field errors
          const fieldErrors = Object.entries(err.response.data)
            .map(([field, errors]) => `${field}: ${Array.isArray(errors) ? errors.join(', ') : errors}`)
            .join('; ')
          errorMsg = fieldErrors || JSON.stringify(err.response.data)
        } else {
          errorMsg = err.response.data
        }
      } else if (err.message) {
        errorMsg = err.message
      }
      setError(errorMsg)
    } finally {
      setLoading(false)
    }
  }
  
  const remove = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return
    try {
      await api.delete(`/projects/${id}/`)
      load()
    } catch (err) {
      console.error('Failed to delete project:', err)
      setError(err.response?.data?.detail || err.message || 'Failed to delete project')
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Projects</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      <form onSubmit={create} className="bg-white border rounded p-4 grid gap-2">
        <input
          className="border rounded p-2"
          placeholder="Project name"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            setError('')
          }}
          required
        />
        <textarea
          className="border rounded p-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type="submit"
          className="px-3 py-2 bg-gray-900 text-white rounded w-40 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading || !name.trim()}
        >
          {loading ? 'Creating...' : 'Create'}
        </button>
      </form>
      <ul className="grid gap-2">
        {projects.map((p) => (
          <li key={p.id} className="bg-white border rounded p-4 flex justify-between">
            <div>
              <div className="font-medium">{p.name}</div>
              <div className="text-sm text-gray-600">{p.description || 'No description'}</div>
            </div>
            <button
              className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={() => remove(p.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}


