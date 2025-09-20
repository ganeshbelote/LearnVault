import { useEffect, useState } from 'react'
import clsx from 'clsx'

const BasicBtn = ({
  Content = 'Button',
  Type,
  Corner,
  className
}: {
  Content: string
  Type?: 'submit' | 'reset' | 'button'
  Corner?: 'square' | 'rounded' | 'pill'
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const [cornerStyle, setCorner] = useState<string>('rounded-md')
  const [hover, setHover] = useState<boolean>(false)

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
        className={clsx(
          'text-nowrap px-3 py-1.5 transition-all text-white font-semibold',
          cornerStyle,
          'cursor-pointer active:scale-95 font-medium',
          !hover ? 'bg-blue-600' : 'bg-blue-500',
          className
        )}
        type={Type ? Type : 'button'}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {Content}
      </button>
    </div>
  )
}

export default BasicBtn