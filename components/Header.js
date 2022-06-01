import { useState } from 'react'

import { FiMenu } from 'react-icons/fi'

import Link from 'next/link'
import Image from 'next/image'
import Search from './Search'

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <header className='bg-black text-white text-opacity-80 shadow w-full'>
      <div className='container mx-auto flex py-3 px-5 flex-col sm:flex-row items-center'>
        <div
          className={`flex w-full justify-between title-font font-medium items-center`}
        >
          <Link href='/'>
            <a className='flex items-center'>
              <Image src='/images/logo.png' width={40} height={40} alt='logo' />
              <span className='ml-3 text-xl'>DevSpace</span>
            </a>
          </Link>
          <div className='sm:hidden'>
            <div
              className='flex justify-end'
              onClick={() => setShowMenu(!showMenu)}
            >
              <FiMenu className='cursor-pointer' size='1.8em' />
            </div>
          </div>
        </div>
        <nav
          className={`flex flex-col sm:flex-row flex-wrap sm:w-4/5 items-center justify-end text-sm sm:flex sm:ml-auto mt-4 sm:mt-0 ${
            showMenu ? '' : 'hidden'
          }`}
        >
          <Link href='/blog'>
            <a className='my-1 px-4 py-1 text-center w-[90vw] sm:w-auto border-white border-opacity-80 rounded-md border sm:mx-2 cursor-pointer uppercase hover:text-white hover:text-opacity-100 hover:border-opacity-100 transition'>
              Blog
            </a>
          </Link>
          <Link href='/about'>
            <a className='my-1 px-4 py-1 text-center w-[90vw] sm:w-auto border-white border-opacity-80 rounded-md border sm:mx-2 cursor-pointer uppercase hover:text-white hover:text-opacity-100 hover:border-opacity-100 transition'>
              About
            </a>
          </Link>
          <Search />
        </nav>
      </div>
    </header>
  )
}

export default Header
