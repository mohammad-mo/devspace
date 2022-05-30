import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import { sortByDate } from '@/utils/index'

// Reading the posts from posts directory
const files = fs.readdirSync(path.join('posts'))

export function getPosts() {
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

  return posts.sort(sortByDate)
}
