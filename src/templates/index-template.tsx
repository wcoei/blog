import * as React from "react"
import { graphql, PageProps, Link } from "gatsby"
import ReactMarkdown from "react-markdown"
import remarkGfm from 'remark-gfm'
import { convertImageUrl } from '../common/image'
import Layout from "../components/layout"
import rehypeRaw from "rehype-raw" 
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github.css"
import { SEO } from "../components/seo"

type DataProps = {
  allStrapiPost: {
    nodes: {
      slug: string,
      title: string,
      abstract: string,
      body: string,
      author?: { name: string },
      category?: { name: string },
      Preview?: { url: string, name: string },
      createAt: string,
      tag?: { name: string }[],
    }[]
  }
}

type PageContextProps = {
  skip: number,
  limit: number,
  totalPosts: number
}

const Index = (pageProps: PageProps<DataProps, PageContextProps>) => {
  const { data, pageContext } = pageProps
  return (
    <Layout>
      {data.allStrapiPost.nodes.map((post) => (
        <div key={post.slug}>
          <h2><Link to={`/pages/${post.slug}`}>Title: {post.title} </Link></h2>
          <div>
            <ReactMarkdown
              children={convertImageUrl(post.body)}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
            />
            <div></div>
          </div>
          <hr />
        </div>
      ))}
      <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
        {pageContext.skip == 0 ? null : <Link to={
          pageContext.skip / pageContext.limit - 1 > 0
            ? `/page-${pageContext.skip / pageContext.limit - 1}/`
            : '/'
        }>next</Link>}
        {pageContext.skip * pageContext.limit + 1 >= pageContext.totalPosts
          ? null
          : <Link to={`/page-${pageContext.skip / pageContext.limit + 1}/`}>prev</Link>}
      </div>
    </Layout>
  )
}

export default Index

export const Head = (page: PageProps) => (
  <SEO pathname={page.location.pathname.replace("blog/","")}>
  </SEO>
)


export const IndexQuery = graphql`
query pagedQuery($limit: Int!, $skip: Int!) {
    allStrapiPost(
      sort: {fields: createdAt, order: DESC}
      skip: $skip
      limit: $limit
    ) {
      nodes {
        slug
        abstract
        category {
          name
        }
        previewImage {
          url
          name
        }
        createdAt
        author {
          name
        }
        tags {
          name
        }
        title
        body
      }
    }
  }
`

