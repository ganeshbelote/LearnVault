import { useState } from 'react'
import StarRating from './StarRating'
import { base_url } from '../utils/Constant'
import { toast } from './Toast'

type emailType = {
  email?: string
  description?: string
}

const Form = () => {
  const [email, setEmail] = useState<emailType>({
    email: '',
    description: ''
  })
  const [loading, setLoading] = useState<boolean>(false)

  const sendEmail = async (data: emailType | undefined) => {
    if (!data) return
    setLoading(true)
    try {
      const res = await fetch(`${base_url}email`, {
        method: 'POST',
        body: JSON.stringify(data)
      })
      const result = await res.json()

      if (res.ok) {
        toast.success('Email sent successfully.')
        console.log(result)
      } else {
        toast.error(result.data.error)
        console.log(result)
      }
      setEmail({
        email: '',
        description: ''
      })
      setLoading(false)
    } catch (error) {
      toast.error('Internal server error.')
      console.log('Error :' + error)
      setEmail({
        email: '',
        description: ''
      })
      setLoading(false)
    }
  }

  const handleSendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email.email || !email.description) {
      toast.error('Email and description are required')
    } else {
      sendEmail(email)
    }
  }

  return (
    <div className='min-h-100 w-full p-4 flex flex-col gap-5 items-center'>
      <div className='rate flex flex-col gap-2 items-center'>
        <h1 className='text-2xl font-semibold text-center'>
          How satisfied are you?
        </h1>
        <StarRating />
      </div>
      <form
        className='p-4 px-8 w-full border-2 rounded-2xl'
        onSubmit={handleSendEmail}
      >
        <h1 className='mb-5 text-2xl font-semibold'>Share Your Thoughts</h1>
        <div className='email w-full'>
          <label className='text-lg font-semibold' htmlFor='email'>
            Email
          </label>
          <input
            id='email'
            name='email'
            className='ui-text outline-0 border-2 py-2 px-4 w-full'
            placeholder='user@gmail.com'
            type='email'
            value={email?.email}
            onChange={e =>
              setEmail({ ...email, email: String(e.target.value) })
            }
          />
        </div>
        <div className='thought w-full'>
          <label className='text-lg font-semibold' htmlFor='thought'>
            Description
          </label>
          <textarea
            id='thought'
            name='thought'
            className='ui-text outline-0 border-2 py-2 px-4 w-full'
            placeholder='Your thoughts...'
            value={email?.description}
            onChange={e =>
              setEmail({ ...email, description: String(e.target.value) })
            }
          />
        </div>
        <button
          type='submit'
          className={`mt-4 border-2 px-6 py-2 bg-gray-300 text-lg font-semibold hover:scale-105 active:scale-100 transition-all duration-300 ${
            loading && 'pointer-events-none cursor-none opacity-50'
          }`}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  )
}

export default Form
