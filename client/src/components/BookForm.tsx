import { useEffect, useState } from 'react'
import Option from './Option'
import Select from './Select'
import { getPdfPageCount } from '../utils/pageCount'
import { base_url } from '../utils/Constant'
import { toast } from './Toast'
import { useNavigate } from 'react-router-dom'

interface fileDataType {
  pages_count?: number | null
  title?: string | undefined
  level?: string | undefined
  course?: string | undefined
  semester?: number | undefined
  publication?: string | undefined
  publish_start_year?: number | undefined
  publish_end_year?: number | undefined
}

const BookForm = ({
  file,
  setFile,
  setLoading
}: {
  file: FileList | undefined
  setFile: React.Dispatch<React.SetStateAction<FileList | null>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [fileData, setFileData] = useState<fileDataType | null>({
    title: '',
    level: '',
    course: '',
    semester: 0,
    publication: '',
    publish_start_year: 0,
    publish_end_year: 0,
    pages_count: 0
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (!file || file.length === 0) return

    const fetchPageCount = async () => {
      const count = await getPdfPageCount(file[0])
      setFileData(prev => ({
        ...prev,
        pages_count: count
      }))
    }

    fetchPageCount()
  }, [file])

  const uploadFile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    if (!file?.[0]) return
    const formData = new FormData()
    formData.append('file', file[0])
    formData.append('title', fileData?.title || '')
    formData.append('level', fileData?.level || '')
    formData.append('course', fileData?.course || '')
    formData.append('semester', String(fileData?.semester || 0))
    formData.append('publication', fileData?.publication || '')
    formData.append(
      'publish_start_year',
      String(fileData?.publish_start_year || 0)
    )
    formData.append('publish_end_year', String(fileData?.publish_end_year || 0))
    formData.append('pages_count', String(fileData?.pages_count || 0))

    setFile(null)

    const token = localStorage.getItem("token")

    try {
      const response = await fetch(`${base_url}api/v1/book`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
        credentials: 'include'
      })

      const result = await response.json()
      setLoading(false)
      setFileData({
        title: '',
        level: '',
        course: '',
        semester: 0,
        publication: '',
        publish_start_year: 0,
        publish_end_year: 0,
        pages_count: 0
      })
      console.log('Upload result:', result)
      if (response.ok) {
        toast.success('Book uploaded successfully!.')
      } else {
        if (response.status === 401) {
          toast.error('You must log in first!')
          setTimeout(() => navigate('/auth/login'), 1500)
        } else {
          toast.error("File should be under 10MB")
          console.log(result)
        }
      }
    } catch (err) {
      setLoading(false)
      setFileData({
        title: '',
        level: '',
        course: '',
        semester: 0,
        publication: '',
        publish_start_year: 0,
        publish_end_year: 0,
        pages_count: 0
      })
      console.error('Error uploading file:', err)
      toast.error('Upload failed. Please try again.')
    }
  }

  return (
    <div className='p-4 fixed inset-0 z-[1] bg-black/50 w-screen h-screen flex items-center justify-center'>
      <form
        className='relative p-4 px-8 w-full sm:w-lg md:w-lg lg:w-lg bg-white border-2 rounded-2xl'
        onSubmit={uploadFile}
      >
        <button
          type='button'
          className='cancle hover:scale-105 active:scale-95 transition-all duration-300 font-medium absolute right-5 h-5 w-5 rounded-full border-[1px] bg-red-500 flex items-center justify-center'
          onClick={() => setFile(null)}
        >
          x
        </button>
        <h1 className='mb-3 text-2xl font-semibold'>Book Details</h1>
        <div className='file w-full'>
          <input
            id='file'
            name='file'
            className='ui-text bg-gray-100 outline-0 border-2 py-2 px-4 w-full'
            value={file?.[0]?.name ?? ''}
            type='text'
            disabled
          />
        </div>
        <p>Pages: {fileData?.pages_count ?? 'Calculating...'}</p>
        <div className='Title w-full'>
          <label className='text-lg font-semibold' htmlFor='title'>
            Title
          </label>
          <input
            id='title'
            name='title'
            className='ui-text outline-0 border-2 py-2 px-4 w-full'
            placeholder='Book Name'
            type='text'
            onChange={e => setFileData({ ...fileData, title: e.target.value })}
          />
        </div>
        <div className='mt-3 w-full flex flex-wrap gap-2'>
          <Select
            Title='Level'
            onChange={e => setFileData({ ...fileData, level: e.target.value })}
          >
            <Option value='ssc'>SSC</Option>
            <Option value='hsc'>HSC</Option>
            <Option value='undergraduate'>Undergraduate</Option>
            <Option value='postgraduate'>Postgraduate</Option>
          </Select>
          <Select
            Title='Course'
            onChange={e => setFileData({ ...fileData, course: e.target.value })}
          >
            <Option value='BCA'>BCA</Option>
            <Option value=' BSc Computer Science '>BSc Computer Science</Option>
          </Select>
          <Select
            Title='Publication'
            onChange={e =>
              setFileData({ ...fileData, publication: e.target.value })
            }
          >
            <Option value='Nirali'>Nirali</Option>
            <Option value='Vision'>Vision</Option>
          </Select>
        </div>
        <div className='semester w-full'>
          <label className='text-lg font-semibold' htmlFor='semester'>
            Semester
          </label>
          <input
            id='semester'
            name='semester'
            className='ui-text outline-0 border-2 py-2 px-4 w-full'
            placeholder='1'
            type='number'
            min={1}
            max={6}
            step={1}
            onChange={e =>
              setFileData({ ...fileData, semester: Number(e.target.value) })
            }
          />
        </div>
        <div className='start-year w-full'>
          <label className='text-lg font-semibold' htmlFor='publish_start_year'>
            Publish Start Year
          </label>
          <input
            id='publish_start_year'
            name='publish_start_year'
            className='ui-text outline-0 border-2 py-2 px-4 w-full'
            placeholder='2019'
            type='number'
            onChange={e =>
              setFileData({
                ...fileData,
                publish_start_year: Number(e.target.value)
              })
            }
          />
        </div>
        <div className='end-year w-full'>
          <label className='text-lg font-semibold' htmlFor='publish_end_year'>
            Publish End Year
          </label>
          <input
            id='publish_end_year'
            name='publish_end_year'
            className='ui-text outline-0 border-2 py-2 px-4 w-full'
            placeholder='2024'
            type='number'
            onChange={e =>
              setFileData({
                ...fileData,
                publish_end_year: Number(e.target.value)
              })
            }
          />
        </div>
        <button
          type='submit'
          className='mt-4 border-2 px-4 py-2 bg-gray-300 text-lg font-semibold hover:scale-101 active:scale-99 transition-all duration-300'
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default BookForm
