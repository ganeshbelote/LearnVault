import { useEffect, useState } from 'react'

const getPdfThumbnail = (url: string) => {
  return url
    .replace('/upload/', '/upload/w_200,f_jpg,pg_1/')
    .replace('.pdf', '.jpg')
}

const Book = ({
  title,
  course,
  pageCount,
  publication,
  publishStartYear,
  publishEndYear,
  url
}: {
  title: string
  course: string
  pageCount: number
  publication: string
  publishStartYear: number
  publishEndYear: number
  url: string
}) => {
  const [thumbnail, setThumbnail] = useState<string>('')

  useEffect(() => {
    const thumbnailUrl = getPdfThumbnail(url)
    setThumbnail(thumbnailUrl)
  }, [])

  const handleClick = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div
      className='cursor-pointer overflow-hidden bg-white p-3 w-full max-w-[396px] rounded-xl border-2 flex gap-5 hover:scale-101 active:scale-99 transition-all duration-300'
      onClick={handleClick}
    >
      <div className='left shrink-0 h-24 w-18 rounded-lg bg-black'>
        {thumbnail && <img src={thumbnail} />}
      </div>
      <div className='right py-2'>
        <h2 className='text-xl font-extrabold leading-5.5'>{title}</h2>
        <p className='mt-1 text-sm text-zinc-700'>
          {course} | {pageCount} pages | {publication} | {publishStartYear}-
          {publishEndYear} 
        </p>
      </div>
    </div>
  )
}

export default Book
