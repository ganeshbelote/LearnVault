import { useEffect, useState } from 'react'
import clsx from 'clsx'

const LoadingBtn = ({
  Shadow,
  Border,
  className,
  Corner,
  ...rest
}: {
  Shadow?: boolean
  Border?: boolean
  className?: string
  Corner?: 'square' | 'rounded' | 'pill'
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const [cornerStyle, setCorner] = useState<string>('rounded-md')

  useEffect(() => {
    switch (Corner) {
      case 'rounded':
        break
      case 'pill':
        setCorner('rounded-3xl')
        break
      case 'square':
        setCorner('rounded-none')
        break
    }
  }, [Corner])

  return (
    <div>
      <button
        {...rest}
        className={clsx(
          'flex items-center justify-center gap-2 min-h-8.5 px-5 py-1.5 pt-2 font-medium opacity-75 cursor-not-allowed',
          'bg-gradient-to-r from-zinc-900 to-zinc-950',
          cornerStyle,
          Shadow && 'shadow-[0_1px_8px_-4px_rgba(0,0,0,0.25)] shadow-white',
          Border && 'border-[1.5px] border-white',
          className
        )}
        type='button'
      >
        <span className='dot block w-2 h-2 rounded-full bg-white'></span>
        <span className='dot block w-2 h-2 rounded-full bg-white'></span>
        <span className='dot block w-2 h-2 rounded-full bg-white'></span>
      </button>
    </div>
  )
}

export default LoadingBtn