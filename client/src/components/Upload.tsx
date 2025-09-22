import { useState } from 'react'

const Upload = ({ setFile } : { setFile : React.Dispatch<React.SetStateAction<FileList | null>> }) => {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e:React.DragEvent<HTMLDivElement | HTMLFormElement | HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e:React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      console.log('Dropped files:', e.dataTransfer.files)
      setFile(e.dataTransfer.files)
    }
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files)
  }

  return (
    <form
      onDragEnter={handleDrag}
      onSubmit={e => e.preventDefault()}
      className={`p-4 overflow-hidden w-full h-76 rounded-4xl border-2 bg-gray-300 flex flex-col items-center justify-center ${dragActive && 'border-blue-500 bg-blue-50'}`}
    >
      <label
        htmlFor='file-upload'
        className={`cursor-pointer flex flex-col items-center justify-center rounded-xl transition `}
      >
        <img src='/svg/upload.svg' alt='Upload' className={`mb-2 h-24 transition-all duration-300 hover:scale-105`} />

        <input
          id='file-upload'
          type='file'
          className='hidden'
          onChange={handleChange}
        />
      </label>
        <h2 className='mt-2 text-2xl font-black text-center '>Upload a Book</h2>
        <p className='max-w-2xs text-sm font-normal text-gray-500 text-center '>
          Drag & drop a PDF or select a file to instantly add it to your
          collection.
        </p>

      {dragActive && (
        <div
          className='absolute inset-0'
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
    </form>
  )
}

export default Upload
