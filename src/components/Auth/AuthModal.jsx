import { useState } from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true)

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
      style={{ margin: 0 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md"
      >
        {isLogin ? (
          <LoginForm
            onToggleForm={() => setIsLogin(false)}
            onClose={onClose}
          />
        ) : (
          <SignupForm
            onToggleForm={() => setIsLogin(true)}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  )
}

export default AuthModal
