import StarRating from './StarRating'

const Form = () => {
  return (
    <div className='min-h-100 w-full p-4 flex flex-col gap-5 items-center'>
      <div className='rate flex flex-col gap-2 items-center'>
        <h1 className='text-2xl font-semibold text-center'>
          How satisfied are you?
        </h1>
        <StarRating />
      </div>
      <form className='p-4 px-8 w-full border-2 rounded-2xl' onSubmit={e => e.preventDefault()}>
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

export default Form
