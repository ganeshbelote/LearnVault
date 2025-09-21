import clsx from 'clsx'
import Option from './Option'
import { useEffect, useRef, useState } from 'react'
import type { SelectProps } from '../types/selectOption.type'
import { motion } from 'framer-motion'

const Select = ({
  Color = 'black',
  Title = 'Select Option',
  children,
  onChange
}: SelectProps) => {
  const widthRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState<number>()
  const [expand, setExpand] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  useEffect(() => {
    setWidth(widthRef.current?.offsetWidth)
  }, [])

  const handleSelect = (index: number, value: string) => {
    setSelectedIndex(index)
    setExpand(false)

    if (onChange) {
      const event = {
        target: { value } as HTMLSelectElement
      } as React.ChangeEvent<HTMLSelectElement>

      onChange(event)
    }
  }

  const handleNone = (value: string) => {
    setSelectedIndex(null)
    setExpand(false)

    if (onChange) {
      const event = {
        target: { value } as HTMLSelectElement
      } as React.ChangeEvent<HTMLSelectElement>

      onChange(event)
    }
  }

  if (!children)
    return (
      <h2 className='text-2xl text-red-500 font-semibold'>
        Give Option Component !
      </h2>
    )

  return (
    <div className='relative flex flex-col items-center justify-center'>
      <div
        style={{ minWidth: width }}
        className={clsx(
          'cursor-pointer flex items-center justify-between gap-3 px-4 py-1.5 rounded-md font-medium hover:shadow-[0_0_4px_#ffffff] transition-all duration-300 ease-out border-2',
          Color == 'white' ? 'bg-black' : 'bg-white'
        )}
        onClick={() => setExpand(prev => !prev)}
      >
        <span className={`max-w-[360px] line-clamp-1 text-${Color}`}>
          {selectedIndex !== null && children[selectedIndex]
            ? children[selectedIndex].props.children
            : Title}
        </span>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className={`h-1.5 ${
            expand && 'rotate-180'
          } transition-transform duration-300`}
        >
          <svg
            width='313'
            height='193'
            viewBox='0 0 313 193'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='w-full h-full'
          >
            <line
              x1='18.176'
              y1='19.8206'
              x2='163.179'
              y2='164.824'
              stroke={Color}
              strokeWidth='50'
            />
            <line
              x1='294.681'
              y1='17.6777'
              x2='149.678'
              y2='162.681'
              stroke={Color}
              strokeWidth='50'
            />
            <rect
              x='141.707'
              y='178.142'
              width='19'
              height='19'
              transform='rotate(-45 141.707 178.142)'
              fill={Color}
              stroke={Color}
            />
          </svg>
        </motion.div>
      </div>

      <motion.div
        ref={widthRef}
        key='dropdown'
        initial={{ opacity: 0, top: '90%' }}
        animate={{ opacity: !expand ? 0 : 1, top: !expand ? '90%' : '105%' }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className={clsx(
          'absolute z-[1] flex flex-col items-center gap-1 w-fit p-2.5 rounded-xl border-2',
          !expand && 'pointer-events-none cursor-not-allowed',
          Color == 'white' ? 'bg-black' : 'bg-white'
        )}
      >
        <Option value='' onClick={() => handleNone('')}>
          None
        </Option>
        {children.map((el, index) => (
          <Option
            key={index}
            Color={Color}
            value={el.props.value}
            Active={selectedIndex === index}
            onClick={() => handleSelect(index, el.props.value)}
          >
            {el.props.children}
          </Option>
        ))}
      </motion.div>
    </div>
  )
}

export default Select
