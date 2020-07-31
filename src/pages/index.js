import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const HeaderTitle = styled.h3`
  margin-bottom: ${rhythm(1 / 4)};

  a {
    box-shadow: none;
    color: #2d2d2d;
  }

  a:hover,
  a:focus {
    text-decoration: underline;
  }
`

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO 
          title="Portfolio &amp; Web development blog." 
          description="Hi, I'm Christos, a Web Developer from Melbourne, Victoria, Australia."/>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <article key={node.fields.slug}>
              <header>
                <HeaderTitle>
                  <Link to={node.fields.slug}>{title}</Link>
                </HeaderTitle>
                <small>{node.frontmatter.date}</small>
              </header>
              <section>
                <p
                  style={{ color: "#2d2d2d" }}
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </article>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
