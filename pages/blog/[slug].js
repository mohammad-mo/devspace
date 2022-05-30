import Link from 'next/link'
import ExportedImage from 'next-image-export-optimizer'

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

import Layout from '@/components/Layout'
import CategoryLabel from '@/components/CategoryLabel'

const PostPage = ({
  frontmatter: { title, category, date, cover_image, author, author_image },
  content,
  slug,
}) => {
  return (
    <Layout title={title}>
      <Link href='/blog'>
        <a
          passhref='true'
          className='px-3 py-2 bg-gray-200 rounded shadow font-medium'
        >
          Go Back
        </a>
      </Link>
      <div className='w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6'>
        <div className='flex justify-between items-center mt-4'>
          <h1 className='text-5xl mb-7'>{title}</h1>
          <CategoryLabel>{category}</CategoryLabel>
        </div>
        <ExportedImage
          src={cover_image}
          width='100%'
          height='70%'
          layout='responsive'
          objectFit='contain'
          alt='cover image'
        />
        <div className='flex justify-between items-center bg-gray-100 p-2 my-8 rounded'>
          <div className='flex items-center'>
            <div className='mx-4 w-10 h-10 hidden sm:block'>
              <ExportedImage
                src={author_image}
                alt='author image'
                width='100%'
                height='100%'
                className='rounded-full '
              />
            </div>
            <h4>{author}</h4>
          </div>
          <div className='mr-4'>{date}</div>
        </div>

        <div className='blog-text mt-2'>
          {/* using marked to compile markdown to HTML.  */}
          <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
        </div>
      </div>
    </Layout>
  )
}

export default PostPage

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', slug + '.md'),
    'utf-8',
  )

  const { data: frontmatter, content } = matter(markdownWithMeta)

  return {
    props: {
      frontmatter,
      content,
      slug,
    },
  }
}
