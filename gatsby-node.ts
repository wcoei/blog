import { GatsbyNode } from 'gatsby';
import path, { resolve } from 'path';

export const createPages: GatsbyNode['createPages'] = async ({
    actions,
    graphql,
}) => {
    const { createPage } = actions;

    const allPosts: {
        errors?: any;
        data?: {
            allStrapiPost: {
                nodes: {
                    slug: string,
                    title: string,
                    author: { name: string },
                    category?: { name: string },
                    body: { data: { body: string } }
                }[]
            }
        }
    } = await graphql(`
        query allPostsQuery {
            allStrapiPost {
                nodes {
                    slug
                    title
                    author {
                        name
                    }
                    category {
                        name
                    }
                    body {
                        data {
                            body
                        }
                    }
                }
            }
        }
    `);

    allPosts.data?.allStrapiPost.nodes.forEach(node => {
        createPage({
            path: node.slug,
            component: path.resolve(__dirname, './src/templates/post-template.tsx'),
            //data: node,
            context: node
        });
    });

    let totalPosts = allPosts.data ? allPosts.data.allStrapiPost.nodes.length : 0
    const pageSize = 1
    for (let skip = 0; skip < totalPosts; skip += pageSize) {
        createPage({
            path: skip == 0 ? '/' : `/page-${Math.round(skip / pageSize)}`,
            component: path.resolve(__dirname, './src/templates/index-template.tsx'),
            //data: node,
            context: {
                skip,
                limit: pageSize,
                totalPosts
            }
        });
    }
};