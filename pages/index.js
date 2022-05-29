import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import Layout from '../components/Layout'

export default function HomePage({ posts }) {
  return (
    <Layout>
      <h1>Hello word</h1>
    </Layout>
  )
}

export async function getStaticProps() {
  // Reading the posts from posts directory
  const files = fs.readdirSync(path.join('posts'))

  const posts = files.map((filename) => {
    const slug = filename.replace('.md', '')

    // To show the content of markdown files
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8',
    )

    const { data: frontmatter } = matter(markdownWithMeta)

    return {
      slug,
      frontmatter,
    }
  })

  return {
    props: {
      posts,
    },
  }
}
