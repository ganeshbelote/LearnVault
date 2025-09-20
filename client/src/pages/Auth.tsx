import { useParams } from 'react-router-dom'
import RegisterForm from '../components/RegisterForm'
import LoginForm from '../components/LoginForm'
import NotFound from '../components/NotFound'

const Auth = () => {
  const { type } = useParams()

  if (type == 'register') {
    return (
      <div className='h-screen w-screen overflow-hidden flex items-center justify-center'>
        <RegisterForm/>
      </div>
    )
  } else if (type == 'login') {
    return (
      <div className='h-screen w-screen overflow-hidden flex items-center justify-center'>
        <LoginForm/>
      </div>
    )
  } else {
    <NotFound/>
  }
}

export default Auth
