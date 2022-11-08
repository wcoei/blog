import * as React from "react"
import { graphql, PageProps } from "gatsby"
import ReactMarkdown from "react-markdown"
import remarkGfm from 'remark-gfm'

type DataProps = {
    slug: string,
    title: string,
    author?: { name: string },
    category?: { name: string },
    body: { data: { body: string } }
}

const Post = (page: PageProps) => {
    return (
        <>
            <h1>{(page.pageContext as DataProps).title}</h1>
            {(page.pageContext as DataProps).author?.name}
            <div>
                <ReactMarkdown children={(page.pageContext as DataProps).body.data.body} remarkPlugins={[remarkGfm]}/>
            </div>
        </>
    )
}

export default Post
