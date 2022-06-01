const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <div className='container mx-auto text-center bg-white shadow-md rounded-lg px-10 py-6 my-6'>
      <p>Copyright &copy; {currentYear} All rights reserved</p>
    </div>
  )
}

export default Footer
