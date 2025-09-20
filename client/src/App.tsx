import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import { Toast } from './components/Toast'
import NotFound from './components/NotFound'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/auth/:type' element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toast />
    </>
  )
}

export default App
