import clsx from 'clsx'
import { useState } from 'react'
import type { OptionProps } from '../types/selectOption.type'

const Option = ({
  Color,
  value,
  children,
  Active = false,
  onClick
}: OptionProps) => {
  const [hover, setHover] = useState(false)

  return (
    <div
      className={clsx(
        'overflow-hidden relative flex flex-col items-center justify-center cursor-pointer w-full px-6 py-1.5 rounded-md font-medium text-center border-2',
        (Color === 'white') && 'border-white'
      )}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      role='option'
      aria-selected={Active}
      data-value={value}
    >
      <span
        className={clsx(
          'z-[1] relative max-w-[360px] transition-all duration-200 ease-in-out',
          `text-${Color}`,
        )}
      >
        {children}
      </span>
      <div
        className={clsx(
          'absolute w-full h-full transition-all duration-200 ease-in-out',
          hover || Active ? 'top-0 opacity-100' : '-top-[105%] opacity-0',
          Color === 'white' ? 'bg-zinc-700' : 'bg-zinc-300'
        )}
      ></div>
    </div>
  )
}

export default Option
