import { useState } from 'react'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContext'

const SignupForm = ({ onToggleForm, onClose }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      setLoading(false)
      return
    }

    try {
      await signUp(email, password, displayName)
      toast.success('¡Registro exitoso! Bienvenido a ColdFlame Store', {
        position: 'top-center'
      })
      onClose()
    } catch (err) {
      setError(err.code === 'auth/email-already-in-use'
        ? 'Este email ya está registrado'
        : 'Error al crear cuenta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Crear Cuenta</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
            required
            minLength={6}
          />
          <p className="text-xs text-slate-500 mt-1">Mínimo 6 caracteres</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:opacity-50"
        >
          {loading ? 'Creando cuenta...' : 'Registrarse'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-slate-600">
        ¿Ya tienes cuenta?{' '}
        <button
          onClick={onToggleForm}
          className="text-sky-600 hover:underline font-medium"
        >
          Inicia sesión
        </button>
      </p>
    </div>
  )
}

export default SignupForm
