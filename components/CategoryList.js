import Link from 'next/link'
import { useRouter } from 'next/router'

const CategoryList = ({ categories }) => {
  const router = useRouter()
  return (
    <div className='w-full bg-white rounded-lg shadow-md mt-8'>
      <h3 className='text-center text-xl bg-black text-white p-3 rounded'>
        Blog Categories
      </h3>
      <ul className='divide-y divide-slate-300'>
        {categories.map((category, index) => (
          <Link href={`/blog/category/${category.toLowerCase()}`} key={index}>
            <li
              className={
                router.query.category_name === category.toLowerCase()
                  ? 'p-4 cursor-pointer bg-slate-200'
                  : 'p-4 cursor-pointer hover:bg-slate-200'
              }
            >
              {category}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default CategoryList
