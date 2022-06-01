import { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'

import SearchResults from './SearchResults'

const Search = () => {
  const [showSearch, setShowSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const getResults = async () => {
      if (searchTerm === '') {
        setSearchResults([])
      } else {
        const res = await fetch(`/api/search?q=${searchTerm}`)
        const { results } = await res.json()
        setSearchResults(results)
      }
    }

    getResults()
  }, [searchTerm])

  return (
    <div className='mx-2 mt-4 mb-2 sm:mt-0 sm:mb-0'>
      <FaSearch
        onClick={() => setShowSearch(!showSearch)}
        className='cursor-pointer text-white text-opacity-80 hover:text-white hover:text-opacity-100 transition'
      />
      {showSearch && (
        <div className='relative container mx-auto flex items-center'>
          <div className='absolute top-6 sm:top-8 -left-[8.5rem] -right-[8.5rem] sm:left-auto sm:right-0 text-gray-600'>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type='search'
                name='search'
                id='search'
                className='bg-slate-100 h-10 px-5 rounded-md text-sm focus:outline-slate-300 w-72'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Search Posts...'
              />
            </form>
          </div>
          <SearchResults results={searchResults} />
        </div>
      )}
    </div>
  )
}

export default Search
