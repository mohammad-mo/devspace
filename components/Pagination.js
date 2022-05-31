import Link from 'next/link'

const Pagination = ({ currentPage, numPages }) => {
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === numPages
  const prevPage = `/blog/page/${currentPage - 1}`
  const nextPage = `/blog/page/${currentPage + 1}`

  if (numPages === 1) return <></>

  return (
    <div className='mt-6'>
      <ul className='flex pl-0 list-none my-2'>
        {!isFirstPage && (
          <Link href={prevPage}>
            <li className='relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer'>
              Previous
            </li>
          </Link>
        )}

        {/* { length: numPages(2) } returns [0, 1] */}
        {Array.from({ length: numPages }, (_, i) => (
          <Link href={`/blog/page/${i + 1}`} key={`page-${i}`}>
            <li
              className={
                currentPage === i + 1
                  ? 'relative block py-2 px-3 leading-tight bg-gray-200 border border-gray-300 text-gray-800 mr-1 hover:bg-white cursor-pointer'
                  : 'relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer'
              }
            >
              {i + 1}
            </li>
          </Link>
        ))}

        {!isLastPage && (
          <Link href={nextPage}>
            <li className='relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer'>
              Next
            </li>
          </Link>
        )}
      </ul>
    </div>
  )
}

export default Pagination
