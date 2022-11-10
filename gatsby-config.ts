import type { GatsbyConfig } from "gatsby";
import {config as dotConfig } from "dotenv";

dotConfig({
  path: `.env`
});

const strapiConfig = {
  apiURL: process.env.STRAPI_API_URL,
  token: process.env.STRAPI_TOKEN,
  collectionTypes: ['post', 'author', 'category', 'tag'],
  singleTypes: [],
  inlineImages: {
    typesToParse: {
      Article: ['body'],
      ComponentBlockBody: ['text'],
    },
  },
  locale: ['en'], 
  preview: true,
  headers: {},
  cache: false,
};

const config: GatsbyConfig = {
  pathPrefix: `/blog`,
  siteMetadata: {
    title: `Yawny Coder`,
    description: `Sharing thought of coding`,
    twitterUsername: `@yawnycoder`,
    image: `/icon.png`,
    siteUrl: `https://info.wcoei.net/blog`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-vanilla-extract", "gatsby-plugin-sitemap", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/icon.png"
    }
  }, {
    resolve: 'gatsby-source-strapi-graphql',
    options: strapiConfig
  }, {
    resolve: "gatsby-transformer-sharp"
  }
  // "gatsby-transformer-remark", {
  //   resolve: 'gatsby-source-filesystem',
  //   options: {
  //     "name": "pages",
  //     "path": "./src/pages/"
  //   },
  //   __key: "pages"
  // }, 
  ]
};

export default config;
