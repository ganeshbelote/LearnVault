import { motion } from 'framer-motion'

const Loader = () => {
  return (
    <div className='p-4 overflow-hidden w-full h-76 rounded-4xl border-2 bg-gray-300 flex flex-col items-center justify-center'>
      <h2 className='text-xl font-extrabold leading-5.5'>Upload in progress</h2>
      <p className='mt-1 text-sm text-zinc-700 text-center'>Please wait while we upload your book.</p>
      <div className='w-48 mt-2'>
        <div className='h-2 w-full rounded-full bg-white overflow-hidden border-2'>
          <motion.div
            className='h-full rounded-full bg-gray-700'
            animate={{ x: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
            style={{ width: '50%' }}
          />
        </div>
      </div>
    </div>
  )
}

export default Loader
