import Layout from '../components/Layout'

const About = () => {
  return (
    <Layout title='About'>
      <h1 className='text-5xl border-b-2 pb-5'>About</h1>
      <div className='bg-white shadow-md rounded-lg px-10 py-6 mt-6'>
        <h3 className='text-2xl mb-5'>DevSpace Blog</h3>
        <p className='mb-3'>This is a blog built with next.js and markdown</p>
        <p>
          <span className='font-bold'>Version 1.0.0</span>
        </p>
      </div>
    </Layout>
  )
}

export default About
