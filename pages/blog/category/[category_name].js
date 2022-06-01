import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import Layout from '@/components/Layout'
import Post from '@/components/Post'
import CategoryList from '@/components/CategoryList'

import { getPosts } from '@/lib/posts'

export default function CategoryBlogPage({ posts, categoryName, categories }) {
  return (
    <Layout>
      <h1 className='text-4xl sm:text-5xl border-b-4 p-5 font-semibold'>
        Posts in {categoryName}
      </h1>
      <div className='flex justify-between flex-wrap-reverse sm:flex-nowrap p-5 sm:p-0'>
        <div className='w-full sm:w-3/4 sm:mr-10'>
          <div className='grid lg:grid-cols-2 xl:grid-cols-3 gap-5'>
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>
        </div>
        <div className='w-full sm:w-1/4'>
          <CategoryList categories={categories} />
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))

  const categories = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8',
    )

    const { data: frontmatter } = matter(markdownWithMeta)

    return frontmatter.category.toLowerCase()
  })

  const paths = categories.map((category) => ({
    params: {
      category_name: category,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { category_name } }) {
  const posts = getPosts()

  // Get categories for sildebar
  const categories = posts.map((post) => post.frontmatter.category)
  const uniqueCategorie = [...new Set(categories)]

  // Filter posts by category
  const categoryPost = posts.filter(
    (post) => post.frontmatter.category.toLowerCase() === category_name,
  )

  return {
    props: {
      posts: categoryPost,
      categoryName: category_name,
      categories: uniqueCategorie,
    },
  }
}
