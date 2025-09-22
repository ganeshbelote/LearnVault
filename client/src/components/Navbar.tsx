import { AnimatePresence, motion } from 'framer-motion'
import MenuBtn from './MenuBtn'
import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from './Toast'

import { animate } from 'framer-motion'

const scrollTo = (id: string) => {
  const element = document.getElementById(id)
  if (!element) return

  animate(window.scrollY, element.offsetTop, {
    duration: 1, // seconds
    onUpdate: value => window.scrollTo(0, value),
    ease: [0.25, 0.1, 0.25, 1] // custom easing curve
  })
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    let token = localStorage.getItem('token')
    if (token) {
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem('token')
      setIsLoggedIn(false)
      toast.success('Logged out successfully.')
    } else {
      toast.success('Redirecting to Login page, please wait.')
      setTimeout(() => navigate('/auth/login'), 1500)
    }
    setIsOpen(false)
  }

  return (
    <div className='relative flex items-center justify-between gap-2 w-full sm:w-fit sm:min-w-[463.5px] md:w-fit md:min-w-[463.5px] lg:w-fit lg:min-w-[463.5px] py-2 px-4 rounded-2xl border-2 bg-gray-300'>
      <img className='h-6' src='/svg/Logo.svg' alt='learnvault-logo' />
      <MenuBtn
        Border={false}
        onToggle={active => setIsOpen(active)}
        active={isOpen}
      />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className='z-10 p-4 flex flex-col items-center gap-2 rounded-xl absolute top-12 right-0 bg-gray-300 border-2 font-semibold'
          >
            <NavLink
              to={'/'}
              className={({ isActive }) =>
                `${
                  isActive && 'bg-gray-800 text-white'
                } w-full py-1 px-4 hover:bg-gray-800 hover:text-white`
              }
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </NavLink>
            <button
              className='py-1 px-4 hover:bg-gray-800 hover:text-white'
              onClick={() => {
                scrollTo('contact')
                setIsOpen(false)
              }}
            >
              Contact me
            </button>
            {!isLoggedIn && (
              <button
                className='w-full px-6 py-2 bg-gray-800 text-white rounded-xl shadow active:scale-100 hover:scale-105 hover:bg-gray-700 transition'
                type='button'
                onClick={() => {
                  toast.success('Redirecting to Register page, please wait.')
                  setTimeout(() => navigate('/auth/register'), 1500)
                  setIsOpen(false)
                }}
              >
                Register
              </button>
            )}
            <button
              className='w-full px-6 py-2 bg-gray-800 text-white rounded-xl shadow active:scale-100 hover:scale-105 hover:bg-gray-700 transition'
              type='button'
              onClick={handleLogout}
            >
              {isLoggedIn ? 'Log out' : 'Log in'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Navbar
