import * as React from "react"
import { graphql, PageProps } from "gatsby"
import ReactMarkdown from "react-markdown"
import remarkGfm from 'remark-gfm'
import { convertImageUrl } from '../common/image'
import Layout from "../components/layout"
import rehypeRaw from "rehype-raw"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github.css"
import { SEO } from "../components/seo"


type DataProps = {
    slug: string,
    title: string,
    abstract: string,
    author?: { name: string },
    category?: { name: string },
    body: string
}

const Post = (page: PageProps) => {
    return (
        <Layout>
            <h2>{(page.pageContext as DataProps).title}</h2>
            {(page.pageContext as DataProps).author?.name}
            <div>
                <ReactMarkdown
                    children={convertImageUrl((page.pageContext as DataProps).body)}
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw, rehypeHighlight]}
                />
            </div>
        </Layout>
    )
}

export default Post

export const Head = (page: PageProps) => (
    <SEO
        pathname={page.location.pathname.replace("blog/","")}
        title={(page.pageContext as DataProps).title}
        description={(page.pageContext as DataProps).abstract}>
    </SEO>
)
