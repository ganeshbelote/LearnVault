import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
export type SizeKey = "small" | "medium" | "large";

export interface SizeConfig {
  boxSize: string;       
  lineHeight?: string;   
}

export interface MenuBtnProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onToggle"> {
  Color?: "black" | "white";
  className?: string;
  Border?: boolean;
  Size?: SizeKey;
  onToggle?: onToggleType; 
  active?: boolean;
}

export type onToggleType = (active: boolean) => void | undefined

const colorObj = {
  white: 'bg-white',
  black: 'bg-black'
}

const SizeObject = {
  small: { boxSize: 'h-8 w-8' }, 
  medium: { boxSize: 'h-10 w-10' }, 
  large: { boxSize: 'h-12 w-12' } 
}

const MenuBtn = ({
  onToggle,
  Color = 'black',
  className,
  Border = true,
  Size = 'medium',
  active: controlledActive,
  ...rest
}: MenuBtnProps) => {
  const [uncontrolledActive, setUncontrolledActive] = useState(false);

  // अगर parent ने active दिया है तो वही use होगा
  const isActive = controlledActive !== undefined ? controlledActive : uncontrolledActive;

  const handleClick = () => {
    if (controlledActive === undefined) {
      // uncontrolled mode → internal toggle
      setUncontrolledActive(prev => {
        const newState = !prev;
        onToggle?.(newState);
        return newState;
      });
    } else {
      // controlled mode → सिर्फ parent को notify
      onToggle?.(!controlledActive);
    }
  };

  return (
    <div
      {...rest}
      className={`flex-shrink-0 ${SizeObject[Size].boxSize} relative rounded-md flex items-center justify-center cursor-pointer ${className}`}
      onClick={handleClick}
    >
      <motion.div
        className={`${SizeObject[Size].boxSize} absolute inset-0 rounded-md ${
          Border && 'border-[2px]'
        }`}
        animate={{
          borderColor: 'rgb(113 113 122)'
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Background Highlight */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className='absolute inset-0 rounded-md '
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Hamburger → Cross */}
      <motion.div
        className='relative flex flex-col items-end justify-center space-y-1.5'
        initial={false}
        animate={isActive ? 'open' : 'closed'}
      >
        {/* Top Line */}
        <motion.span
          className={`block h-[2.5px] rounded ${colorObj[Color]}`}
          variants={{
            closed: { rotate: 0, y: 0, width: '24px' },
            open: { rotate: 45, y: 6, width: '24px' }
          }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />
        {/* Middle Line */}
        <motion.span
          className={`block h-[3px] rounded ${colorObj[Color]}`}
          variants={{
            closed: { opacity: 1, width: '18px' },
            open: { opacity: 0, width: 0 }
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
        {/* Bottom Line */}
        <motion.span
          className={`block h-[2.5px] rounded ${colorObj[Color]}`}
          variants={{
            closed: { rotate: 0, y: 0, width: '10px' },
            open: { rotate: -45, y: -6, width: '24px' }
          }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  )
}

export default MenuBtn