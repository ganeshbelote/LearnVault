import { createContext, useState, type ReactNode } from 'react'

export interface bookType {
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

// 1. Define the type for your context
interface FileContextType {
  file: FileList | null
  setFile: React.Dispatch<React.SetStateAction<FileList | null>>
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  books: bookType[] | null
  setBooks: React.Dispatch<React.SetStateAction<bookType[] | null>>
}

// 2. Create the context with a default value
export const FileContext = createContext<FileContextType | undefined>(undefined)

// 3. Create the provider component
export const FileProvider = ({ children }: { children: ReactNode }) => {
  const [file, setFile] = useState<FileList | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [books, setBooks] = useState<bookType[] | null>(null)

  return (
    <FileContext.Provider value={{ file, setFile, loading, setLoading, books, setBooks }}>
      {children}
    </FileContext.Provider>
  )
}
