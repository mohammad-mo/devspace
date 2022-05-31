import Link from 'next/link'
import ExportedImage from 'next-image-export-optimizer'

import CategoryLabel from './CategoryLabel'

const Post = ({ post, compact }) => {
  return (
    <div className='w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6'>
      {!compact && (
        <ExportedImage
          src={post.frontmatter.cover_image}
          alt='post'
          height={420}
          width={600}
          className='mb-4 rounded'
        />
      )}

      <div className='flex justify-between items-center'>
        <span className='font-light text-gray-600'>
          {post.frontmatter.date}
        </span>
        <CategoryLabel>{post.frontmatter.category}</CategoryLabel>
      </div>

      <div className='mt-2'>
        <Link href={`/blog/${post.slug}`}>
          <a
            passhref='true'
            className='text-lg lg:text-xl xl:text-2xl text-gray-700 font-bold hover:underline'
          >
            {post.frontmatter.title}
          </a>
        </Link>
        <p className='mt-2 text-gray-600'>{post.frontmatter.excerpt}</p>
      </div>

      {!compact && (
        <div className='flex justify-between items-center mt-6 space-x-2'>
          <Link href={`/blog/${post.slug}`}>
            <a passhref='true' className='text-gray-900 hover:text-blue-600'>
              Read More
            </a>
          </Link>
          <div className='flex items-center space-x-2'>
            <div className='hidden sm:flex'>
              <ExportedImage
                src={post.frontmatter.author_image}
                alt='author image'
                width={40}
                height={40}
                objectFit='cover'
                className='mx-4 rounded-full'
              />
            </div>
            <h3 className='text-sm text-gray-700 font-bold'>
              {post.frontmatter.author}
            </h3>
          </div>
        </div>
      )}
    </div>
  )
}

export default Post
