import { createContext, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ToastContextType, ToastType } from '../types/toast.type' 

const ToastContext = createContext<ToastContextType | null>(null)

let addToastExternal: ToastContextType['addToast']

export const Toast = ({
  duration = 3000
}: {
  duration?: number
}) => {
  const [toasts, setToasts] = useState<ToastType[]>([])

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const addToast = useCallback(
    (message: string, type: ToastType['type']) => {
      const id = Date.now()
      setToasts(prev => [...prev, { id, message, type }])
      setTimeout(() => removeToast(id), duration)
    },
    [duration, removeToast]
  )

  addToastExternal = addToast

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {/* Toast container */}
      <div className={`fixed bottom-5 left-1/2 -translate-x-1/2 space-y-2`}>
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className='overflow-hidden relative w-screen max-w-[340px] flex gap-5 items-start justify-between px-4 py-2.5 rounded-xl shadow-lg bg-gray-300 border-2'
            >
              {/* Left Section */}
              <div className='flex items-start gap-3'>
                {/* Icon */}
                <div className='pt-1 flex-shrink-0'>
                  {(() => {
                    switch (toast.type) {
                      case 'success':
                        return (
                          <svg
                            className='w-5 h-5 text-green-400'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                          </svg>
                        )
                      case 'error':
                        return (
                          <svg
                            className='w-5 h-5 text-red-500'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            viewBox='0 0 24 24'
                          >
                            <circle cx='12' cy='12' r='9' />
                            <path d='M15 9l-6 6m0-6l6 6' />
                          </svg>
                        )
                      default:
                        return null
                    }
                  })()}
                </div>

                {/* Content */}
                <div>
                  <h4 className='flex gap-2'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-5 h-5 blink'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                    >
                      <path d='M12 2l1.7 5.3 5.3 1.7-5.3 1.7-1.7 5.3-1.7-5.3-5.3-1.7 5.3-1.7L12 2z' />
                      <path d='M4 12l1 .3.3 1L4 13l-1-.3-.3-1L4 12zm16 0l1 .3.3 1L20 13l-1-.3-.3-1L20 12zM12 20l.3 1 1 .3-1 .3-.3 1-.3-1-1-.3 1-.3.3-1z' />
                    </svg>
                    <span className='font-semibold leading-5.5'>
                      {capitalize(toast.type)} notification
                    </span>
                  </h4>
                  <p className='mt-1 text-sm text-zinc-700'>{toast.message}</p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => removeToast(toast.id)}
                className='cursor-pointer pt-1 text-gray-600 hover:text-red-500'
              >
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>

              {/* Progress bar */}
              <motion.div
                className={`absolute left-0 bottom-0 h-0.5 ${getBgColor(
                  toast.type
                )}`}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: duration / 1000, ease: 'linear' }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

// Exposed toast functions
export const toast = {
  success: (msg: string) => addToastExternal(msg, 'success'),
  error: (msg: string) => addToastExternal(msg, 'error'),
}

function getBgColor (type: 'success' | 'error' ) {
  const map = {
    success: 'bg-green-500',
    error: 'bg-red-500',
  }
  return map[type] || 'bg-gray-800'
}

function capitalize (str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
