import { createContext, useState, type ReactNode } from 'react'

// 1. Define the type for your context
interface FileContextType {
  file: FileList | null
  setFile: React.Dispatch<React.SetStateAction<FileList | null>>
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

// 2. Create the context with a default value
export const FileContext = createContext<FileContextType | undefined>(undefined)

// 3. Create the provider component
export const FileProvider = ({ children }: { children: ReactNode }) => {
  const [file, setFile] = useState<FileList | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <FileContext.Provider value={{ file, setFile, loading, setLoading }}>
      {children}
    </FileContext.Provider>
  )
}
