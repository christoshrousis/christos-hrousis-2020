import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Project = styled.div`
    display: flex;
    align-items: center;
`

const ImageContainer = styled.div`
    max-width: 250px;
    width: 250px;
`


class ProjectsIndex extends React.Component {
    render() {
        const { data } = this.props
        const siteTitle = data.site.siteMetadata.title

        return (
            <Layout location={this.props.location} title={siteTitle}>
                <SEO title="Personal web development blog." />
                <h2>Projects I've worked on.</h2>
                <Project>
                    <ImageContainer>
                        <Img
                            title="Liptember Homepage"
                            alt="A screenshot of the Liptember homepage"
                            sizes={data.projectImage.childImageSharp.sizes}
                        />
                    </ImageContainer>
                    <div>
                        <h3>Liptember</h3>
                        <p>Liptember lorem ipsum ladidadiset.</p>
                    </div>
                </Project>
            </Layout>
        )
    }
}

export default ProjectsIndex

export const pageQuery = graphql`
  query {
    projectImage: file(relativePath: { eq: "liptember.png" }) {
        childImageSharp {
            sizes(maxWidth: 250) {
                ...GatsbyImageSharpSizes_tracedSVG
            }
        }
    }
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
