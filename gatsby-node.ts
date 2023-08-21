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

  const blogPost = path.resolve("./src/templates/blog-post.tsx");

  const result = await graphql<{ allContentfulNewBlog2: { nodes: any[] } }>(`
    query MyQuery {
      allContentfulNewBlog2 {
        nodes {
          id
          title
          subtitle
          dateOfIssue
        }
      }
    }
  `);
  if (result && result.data) {
    const posts = result.data.allContentfulNewBlog2.nodes;

    if (blogPost.length > 0) {
      posts.forEach(
        (
          post: {
            id: string;
            title: string;
            subtitle: string;
            dateOfIssue: string;
          },
          index: number
        ) => {
          createPage({
            path: `/blog/${index}/`,
            component: blogPost,
            context: {
              blogID: post.id,
              blogTitle: post.title,
              mySub: post.subtitle,
              date: post.dateOfIssue,
            },
          });
        }
      );
    }
  }
};
