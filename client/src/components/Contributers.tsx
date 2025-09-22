import { useEffect, useState } from 'react'
import { base_url } from '../utils/Constant'

type contributerType = {
  username: string
  total_books: number
}

const Contributers = () => {
  const [contributers, setContributers] = useState<contributerType[]>()
  const [viewAll, setViewAll] = useState<boolean>(false)

  const fetchContributors = async () => {
    try {
      const res = await fetch(`${base_url}contribution`)
      if (res.ok) {
        const result = await res.json()
        setContributers(result.data)
      }
    } catch (error) {
      console.log('Error :' + error)
    }
  }

  useEffect(() => {
    fetchContributors()
  }, [])

  return (
    <div className='overflow-hidden w-full rounded-2xl'>
      <div className='py-2 px-4 flex items-center justify-between'>
        <h2 className='text-lg font-black'>Top Contributers</h2>
        <button
          type='button'
          className='font-medium'
          onClick={() => setViewAll(prev => !prev)}
        >
          {viewAll ? 'Shrink' : 'View All'}
        </button>
      </div>
      <div className='py-2 px-4 flex items-center justify-start gap-6 overflow-x-auto'>
        {(viewAll ? contributers : contributers?.slice(0, 3))?.map(
          (contributer, i) => (
            <div key={i} className='flex flex-col items-center'>
              <div
                style={{ backgroundImage: 'url("/svg/person.svg")' }}
                className='cursor-pointer h-14 w-14 border-2 rounded-full bg-center bg-cover bg-no-repeat'
              ></div>
              <p>{contributer.username}</p>
              <p className='text-sm text-gray-500'>
                uploaded : {contributer.total_books} books
              </p>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default Contributers
