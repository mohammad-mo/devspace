import fs from 'fs'
import path from 'path'

import Layout from '@/components/Layout'
import Post from '@/components/Post'
import Pagination from '@/components/Pagination'
import CategoryList from '@/components/CategoryList'

import { POSTS_PER_PAGE } from '@/config/index'
import { getPosts } from '@/lib/posts'

export default function BlogPage({ posts, numPages, currentPage, categories }) {
  return (
    <Layout title='Blog'>
      <h1 className='text-5xl border-b-4 p-5 font-semibold'>Blog</h1>
      <div className='flex justify-between flex-wrap-reverse sm:flex-nowrap p-5 sm:p-0'>
        <div className='w-full sm:w-3/4 sm:mr-10'>
          <div className='grid lg:grid-cols-2 xl:grid-cols-3 gap-5'>
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>
          <Pagination currentPage={currentPage} numPages={numPages} />
        </div>
        <div className='w-full sm:w-1/4'>
          <CategoryList categories={categories} />
        </div>
      </div>
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

  const posts = getPosts()

  // Get categories for sildebar
  const categories = posts.map((post) => post.frontmatter.category)
  const uniqueCategorie = [...new Set(categories)]

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE)
  const pageIndex = page - 1
  const orderedPosts = posts.slice(
    pageIndex * POSTS_PER_PAGE,
    (pageIndex + 1) * POSTS_PER_PAGE,
  )

  return {
    props: {
      posts: orderedPosts,
      numPages,
      currentPage: page,
      categories: uniqueCategorie,
    },
  }
}
