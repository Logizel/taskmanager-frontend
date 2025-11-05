import { useEffect, useState } from 'react'
import api from '../lib/api'

export default function Tags() {
  const [tags, setTags] = useState([])
  const [name, setName] = useState('')
  const [color, setColor] = useState('#888888')

  const load = () => api.get('/tags/').then((r)=>setTags(r.data.results ?? r.data))
  useEffect(() => { load() }, [])

  const create = async () => { await api.post('/tags/', { name, color }); setName(''); load() }
  const remove = async (id) => { await api.delete(`/tags/${id}/`); load() }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Tags</h2>
      <div className="bg-white border rounded p-4 grid gap-2">
        <input className="border rounded p-2" placeholder="Tag name" value={name} onChange={(e)=>setName(e.target.value)} />
        <input type="color" className="border rounded p-2 w-24" value={color} onChange={(e)=>setColor(e.target.value)} />
        <button className="px-3 py-2 bg-gray-900 text-white rounded w-32" onClick={create}>Create</button>
      </div>
      <ul className="grid gap-2">
        {tags.map((t) => (
          <li key={t.id} className="bg-white border rounded p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded" style={{backgroundColor: t.color}}></span>
              <span>{t.name}</span>
            </div>
            <button className="px-3 py-2 bg-red-600 text-white rounded" onClick={()=>remove(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}


