import React, { Suspense, useContext } from 'react'
import { FileContext } from '../utils/Context'
import Loader from '../components/Loader'
import Upload from '../components/Upload'
const Contributers = React.lazy(() => import('../components/Contributers'))
import Filter from '../components/Filter'
import List from '../components/List'
import Footer from '../components/Footer'
import BookForm from '../components/BookForm'
import Form from '../components/Form'

const Dashboard = () => {
  const context = useContext(FileContext)
  if (!context) throw new Error('Upload must be used within FileProvider')

  const { file, setFile, loading, setLoading } = context
  return (
    <div className='overflow-hidden min-h-screen w-screen flex items-start justify-center'>
      <div className='w-full sm:w-lg md:w-lg lg:w-lg flex flex-col items-center justify-center gap-3'>
        <div className='p-4 pb-2 w-full flex flex-col items-center justify-center gap-3'>
          {loading ? <Loader /> : <Upload setFile={setFile} />}
          <Suspense fallback={<p>Loading...</p>}>
            <Contributers />
          </Suspense>
          <Filter />
        </div>
        <List />
        <Form />
        <Footer />
        {file && (
          <BookForm file={file} setFile={setFile} setLoading={setLoading} />
        )}
      </div>
    </div>
  )
}

export default Dashboard
