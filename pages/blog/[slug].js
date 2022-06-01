import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

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
  const router = useRouter()

  return (
    <Layout title={title}>
      <div className='w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6'>
        <button
          className='px-3 py-1 bg-slate-200 rounded-md shadow'
          onClick={() => router.back()}
        >
          Go Back
        </button>
        <div className='flex justify-between items-center my-4 space-x-2'>
          <h1 className='text-3xl md:text-4xl lg:text-5xl'>{title}</h1>
          <CategoryLabel>{category}</CategoryLabel>
        </div>
        <Image
          src={cover_image}
          width='100%'
          height='70%'
          layout='responsive'
          objectFit='contain'
          alt='cover image'
        />
        <div className='flex justify-between items-center bg-gray-100 p-2 my-8 rounded-md'>
          <div className='flex items-center'>
            <div className='mx-4 w-10 h-10 hidden sm:block'>
              <Image
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
