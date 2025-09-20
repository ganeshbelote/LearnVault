import React, { Suspense, useEffect, useState } from 'react'
import { base_url } from '../utils/Constant'
const Book = React.lazy(() => import('./Book'))

interface bookType {
  book_id: number
  course: string
  level: string
  pages_count: number
  publication: string
  publish_end_year: number
  publish_start_year: number
  semester: number
  title: string
  uploaded_by: number | null
  url: string
}

const List = () => {
  const [books, setBooks] = useState<bookType[] | null>(null)
  const [viewAll, setViewAll] = useState<boolean>(false)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${base_url}api/v1/book`)
        const result = await response.json()
        if (response.ok) {
          setBooks(result.data)
        }
      } catch (error) {
        console.log('Something went wrong.')
      }
    }

    fetchBooks()
  }, [])

  return (
    <div className='books-list flex items-center flex-col gap-2 w-full sm:w-fit sm:min-w-[463.5px] md:w-fit md:min-w-[463.5px] lg:w-fit lg:min-w-[463.5px] p-4 sm:px-8 md:p-4 md:px-8 lg:p-4 lg:px-8 rounded-t-3xl border-2 bg-gray-300'>
      <div className='w-full max-w-[396px] flex items-center justify-between'>
        <h1 className='text-2xl font-semibold'>Browse Books</h1>
        <img src='/svg/arrow.svg' alt='Arrow' />
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        {(viewAll ? books : books?.slice(0, 5))?.map((book, i) => (
          <Book
            key={i}
            title={String(book.title)}
            course={String(book.course)}
            publication={String(book.publication)}
            pageCount={Number(book.pages_count)}
            publishStartYear={Number(book.publish_start_year)}
            publishEndYear={Number(book.publish_end_year)}
            url={String(book.url)}
          />
        ))}
      </Suspense>
      {
        (books && (books?.length > 5)) && (<button
        className='px-6 py-2 bg-gray-800 text-white rounded-xl shadow active:scale-100 hover:scale-105 hover:bg-gray-700 transition'
        type='button'
        onClick={() => setViewAll(prev => !prev)}
      >
        {viewAll ? 'Shrink' : 'View All'}
      </button>)
      }
    </div>
  )
}

export default List
