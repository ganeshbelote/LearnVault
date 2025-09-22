import MenuBtn from "./MenuBtn"

const Navbar = () => {
  return (
    <div className='flex items-center justify-between gap-2 w-full sm:w-fit sm:min-w-[463.5px] md:w-fit md:min-w-[463.5px] lg:w-fit lg:min-w-[463.5px] py-2 px-4 rounded-2xl border-2 bg-gray-300'>
        <img className="h-6" src="/svg/Logo.svg" alt="learnvault-logo" />
        <MenuBtn Border={false}/>
    </div>
  )
}

export default Navbar
