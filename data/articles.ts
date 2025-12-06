export interface Article {
  id: number
  title: string
  excerpt: string
  date: string
  category: string
  slug: string
}

export const articlesData: Article[] = [
  {
    id: 1,
    title: "The Art of Minimalist Web Design",
    excerpt:
      "Exploring how simplicity and constraint breed innovation in modern web design.",
    date: "Dec 4, 2024",
    category: "Design",
    slug: "minimalist-web-design",
  },
  {
    id: 2,
    title: "Building Performant React Applications",
    excerpt: "Deep dive into optimization techniques for building lightning-fast React apps.",
    date: "Nov 28, 2024",
    category: "Engineering",
    slug: "react-performance",
  },
  {
    id: 3,
    title: "The Future of Web Standards",
    excerpt: "What's coming next in web technologies and how to prepare your projects.",
    date: "Nov 20, 2024",
    category: "Technology",
    slug: "web-standards-future",
  },
]
