import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [username, setUsername] = useState('demo')
  const [password, setPassword] = useState('password')
  const [mode, setMode] = useState('login')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login, register } = useAuth()

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (mode === 'login') await login(username, password)
      else await register(username, `${username}@example.com`, password)
      navigate('/')
    } catch (err) {
      console.error('Login error:', err)
      let message = 'Authentication failed'
      
      if (err.code === 'ERR_NETWORK' || err.message?.includes('Network Error')) {
        message = 'Cannot connect to backend server. Make sure the Django server is running on http://localhost:8000'
      } else if (err.code === 'ECONNABORTED') {
        message = 'Request timeout. The backend server may not be responding.'
      } else if (err.response) {
        // Server responded with error
        message = err.response.data?.detail || 
                 err.response.data?.message || 
                 err.response.data?.non_field_errors?.[0] ||
                 `Server error: ${err.response.status} ${err.response.statusText}`
      } else {
        message = err.message || 'Authentication failed. Please check your credentials.'
      }
      
      setError(message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={submit} className="bg-white p-6 rounded border w-full max-w-sm space-y-3">
        <h2 className="text-lg font-semibold">{mode === 'login' ? 'Login' : 'Register'}</h2>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <input className="w-full border rounded p-2" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Username" />
        <input type="password" className="w-full border rounded p-2" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
        <button className="w-full bg-gray-900 text-white rounded p-2">{mode === 'login' ? 'Login' : 'Register'}</button>
        <button className="w-full bg-gray-200 rounded p-2" type="button" onClick={()=>setMode(mode==='login'?'register':'login')}>
          Switch to {mode==='login'?'Register':'Login'}
        </button>
      </form>
    </div>
  )
}


