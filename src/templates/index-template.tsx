import * as React from "react"
import { graphql, PageProps, Link } from "gatsby"
import ReactMarkdown from "react-markdown"
import remarkGfm from 'remark-gfm'

type DataProps = {
    allStrapiPost: {
        nodes: {
            slug: string,
            title: string,
            abstract: string,
            body: { data: { body: string } }
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
        <>
            {data.allStrapiPost.nodes.map((post) => (
                <>
                    <h1>Title: {post.title}</h1>
                    <div>
                        <ReactMarkdown children={post.body.data.body} remarkPlugins={[remarkGfm]} />
                    </div>
                    <hr />
                    <div>
                        {pageContext.skip == 0 ? null : <Link to={
                            pageContext.skip*pageContext.limit -1 > 0 
                                ? `page-${pageContext.skip / pageContext.limit - 1}`
                                : '/'
                        }>next</Link>}
                        {pageContext.skip*pageContext.limit + 1>= pageContext.totalPosts 
                        ? null
                        : <Link to={`page-${pageContext.skip / pageContext.limit + 1}`}>prev</Link>}
                    </div>
                </>
            ))}
        </>
    )
}

export default Index

export const pageQuery = graphql`
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
        body {
          data {
            body
          }
        }
      }
    }
  }
`
