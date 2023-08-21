import type { GatsbyNode } from "gatsby";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import dotenv from "dotenv";
import path from "path";
require(`dotenv`).config({
  path: `.env.${process.env.NODE_ENV}`,
});
dotenv.config();

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
    },
  });
};

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions;

  const blogPost = path.resolve('./src/templates/blog-post.ts')

  const result = await graphql(`
    query MyQuery {
      allContentfulNewBlog2 {
        edges {
          node {
            id
            dateOfIssue
            spaceId
            title
            subtitle
            image {
              width
              height
            }
          }
        }
      }
    }
  `);

  if (blogPost.length > 0) {
    blogPost.forEach((post: {
        slug: any; node: { slug: any; }; 
}, index: number) => {
      const previousPostSlug = index === 0 ? null : post.node.slug
      const nextPostSlug =
        index === blogPost.length - 1 ? null : post.node.slug

      createPage({
        path: `/blog/${post.slug}/`,
        component: "blogPost",
        context: {
          slug: post.slug,
          previousPostSlug,
          nextPostSlug,
        },
      })
    })
  }

};
