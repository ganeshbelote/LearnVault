import { useContext, useEffect, useState } from 'react'
import Option from './Option'
import Select from './Select'
import { FileContext } from '../utils/Context'
import { base_url } from '../utils/Constant'
import type { bookType } from '../utils/Context'
import { toast } from './Toast'

type filterDataType = {
  publication: string
  level: string
  course: string
  semester: number
  subject: string
  publish_start_year: number
  publish_end_year: number
}

const Filter = () => {
  const context = useContext(FileContext)
  if (!context) {
    throw new Error('FileContext must be used within a FileProvider')
  }
  const { books, setBooks } = context
  const [totalBooks, setTotalBooks] = useState<bookType[] | null>(books)

  useEffect(() => {
    if (!totalBooks) {
      setTotalBooks(books)
    }
  }, [books])

  const publications = Array.from(
    new Set(totalBooks?.map(b => b.publication) || [])
  )
  const levels = Array.from(new Set(totalBooks?.map(b => b.level) || []))
  const courses = Array.from(new Set(totalBooks?.map(b => b.course) || []))
  const semesters = Array.from(
    new Set(totalBooks?.map(b => b.semester) || [])
  ).sort((a, b) => a - b)
  const subjects = Array.from(new Set(totalBooks?.map(b => b.title) || []))
  const years = Array.from(
    new Set(
      totalBooks?.map(b => `${b.publish_start_year}-${b.publish_end_year}`) ||
        []
    )
  )

  const [filterData, setFilterData] = useState<filterDataType>({
    publication: '',
    level: '',
    course: '',
    semester: 0,
    subject: '',
    publish_start_year: 0,
    publish_end_year: 0
  })

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let yearRange = e.target.value
    const [start, end] = yearRange.split('-')
    setFilterData({
      ...filterData,
      publish_start_year: Number(start),
      publish_end_year: Number(end)
    })
  }

  const getFilterData = async () => {
    try {
      const response = await fetch(`${base_url}filter`, {
        method: 'POST',
        body: JSON.stringify(filterData)
      })
      const result = await response.json()
      if (response.ok) {
        setBooks(result.data)
      } else {
        toast.error('Please provide valid inputs.')
      }
    } catch (error) {
      toast.error('Internal server error.')
      console.log('Error :' + error)
    }
  }

  const handleFilter = () => {
    getFilterData()
  }

  return (
    <div className='w-fit pb-4 border-2 rounded-2xl flex flex-col items-center'>
      <div className='p-4 w-fit flex justify-center flex-wrap gap-2'>
        <Select
          Title='Publication'
          onChange={e =>
            setFilterData({ ...filterData, publication: e.target.value.trim() })
          }
        >
          {publications.map(pub => (
            <Option key={pub} value={pub}>
              {pub}
            </Option>
          ))}
        </Select>

        <Select
          Title='Level'
          onChange={e =>
            setFilterData({ ...filterData, level: e.target.value.trim() })
          }
        >
          {levels.map(level => (
            <Option key={level} value={level}>
              {level}
            </Option>
          ))}
        </Select>

        <Select
          Title='Course'
          onChange={e =>
            setFilterData({ ...filterData, course: e.target.value.trim() })
          }
        >
          {courses.map(course => (
            <Option key={course} value={course}>
              {course}
            </Option>
          ))}
        </Select>

        <Select
          Title='Semester'
          onChange={e =>
            setFilterData({ ...filterData, semester: Number(e.target.value) })
          }
        >
          {semesters.map(sem => (
            <Option key={sem} value={String(sem)}>
              {String(sem)}
            </Option>
          ))}
        </Select>

        <Select
          Title='Subject'
          onChange={e =>
            setFilterData({ ...filterData, subject: e.target.value.trim() })
          }
        >
          {subjects.map(sub => (
            <Option key={sub} value={sub}>
              {sub}
            </Option>
          ))}
        </Select>

        <Select Title='Year' onChange={handleYearChange}>
          {years.map(y => (
            <Option key={y} value={y}>
              {y}
            </Option>
          ))}
        </Select>
      </div>
      <button
        className='w-fit px-6 py-2 bg-gray-800 text-white rounded-xl shadow active:scale-100 hover:scale-105 hover:bg-gray-700 transition'
        type='button'
        onClick={handleFilter}
      >
        Submit
      </button>
    </div>
  )
}

export default Filter
