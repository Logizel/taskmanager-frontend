export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded border p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{task.title}</h3>
        <span className="text-xs px-2 py-1 rounded bg-gray-100">{task.status}</span>
      </div>
      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
      <div className="flex gap-2 mt-2 flex-wrap">
        {task.tags?.map((t) => (
          <span key={t.id} className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: t.color, color: 'white' }}>{t.name}</span>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <button className="px-3 py-1 text-sm bg-gray-900 text-white rounded" onClick={() => onEdit(task)}>Edit</button>
        <button className="px-3 py-1 text-sm bg-red-600 text-white rounded" onClick={() => onDelete(task)}>Delete</button>
      </div>
    </div>
  )
}


