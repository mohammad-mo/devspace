import Post from './Post'

const SearchResults = ({ results }) => {
  if (results.length === 0) return <></>
  return (
    <div className='absolute top-20 -inset-x-[8.5rem] xs:-inset-x-44 sm:inset-x-auto sm:right-0 z-10 border-2 border-slate-300 bg-white text-black min-w-fit sm:w-96 h-96 rounded-md overflow-y-auto'>
      <div className='p-5 sm:p-10'>
        <h2 className='text-3xl'>{results.length} Results</h2>
        {results.map((result, index) => (
          <Post key={index} post={result} compact={true} />
        ))}
      </div>
    </div>
  )
}

export default SearchResults
