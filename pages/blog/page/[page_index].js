import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import Layout from '../../../components/Layout'
import Post from '../../../components/Post'
import Pagination from '../../../components/Pagination'

import { sortByDate } from '../../../utils'
import { POSTS_PER_PAGE } from '../../../config'

export default function BlogPage({ posts, numPages, currentPage }) {
  return (
    <Layout title='Blog'>
      <h1 className='text-5xl border-b-4 p-5 font-bold'>Blog</h1>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
      <Pagination currentPage={currentPage} numPages={numPages} />
    </Layout>
  )
}

export async function getStaticPaths() {
  // Reading the posts from posts directory
  const files = fs.readdirSync(path.join('posts'))

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE)

  let paths = []
  for (let i = 1; i <= numPages; i++) {
    paths.push({
      params: { page_index: i.toString() },
    })
  }

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const page = +params?.page_index || 1

  // Reading the posts from posts directory
  const files = fs.readdirSync(path.join('posts'))

  const posts = files.map((filename) => {
    const slug = filename.replace('.md', '')

    // To show the content of markdown files
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8',
    )

    // Convert string(from markdown file) to object
    const { data: frontmatter } = matter(markdownWithMeta)

    return {
      slug,
      frontmatter,
    }
  })

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE)
  const pageIndex = page - 1
  const orderedPosts = posts
    .sort(sortByDate)
    .slice(pageIndex * POSTS_PER_PAGE, (pageIndex + 1) * POSTS_PER_PAGE)

  return {
    props: {
      posts: orderedPosts,
      numPages,
      currentPage: page,
    },
  }
}
