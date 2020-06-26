import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Project = styled.div`
    display: flex;
    align-items: center;
    @media (max-width: 600px) {
        display: block;
    }
`

const ImageContainer = styled.div`
    width: 355px;
    @media (max-width: 600px) {
        display: block;
        margin: 0 auto;
        width: 250px;
    }
`

const RightHandSideContainer = styled.div`
   padding-left: 25px;
   h3 {
       margin-bottom: 0;
       margin-top: 1rem;
   }
   p, ul {
       font-size: .75rem;
       margin-bottom: .5rem;
       margin-top: .5rem;
   }
  ul {
      padding-left: 20px;
  }
  li {
      margin: 0;
  }
`

const Subtitle = styled.p`
    font-size: .75rem;
`

const LinkOut = styled.a`
    display: inline-block;
    margin-bottom: .5rem;
    font-size: .75rem;
`

const Title = styled.h1`
    font-size: 2rem;
    margin-bottom: 5rem;
`
class ProjectsIndex extends React.Component {
    render() {
        const { data } = this.props
        const siteTitle = data.site.siteMetadata.title

        return (
            <Layout location={this.props.location} title={siteTitle}>
                <SEO title="Personal web development blog." />
                <Title>Projects I've worked on.</Title>
                <Project>
                    <ImageContainer>
                        <a href="https://liptember.com.au/" target="_blank" rel="noreferrer" title="See Liptember Live.">
                            <Img
                                title="Liptember Homepage"
                                alt="A screenshot of the Liptember homepage"
                                sizes={data.projectImage.childImageSharp.sizes}
                            />
                        </a>
                    </ImageContainer>
                    <RightHandSideContainer>
                        <h3>Liptember</h3>
                        <Subtitle><b>Year:</b> 2014</Subtitle>
                        <p>A non-for-profit charity supporting women's health.</p>
                        <ul>
                            <li>Peer-to-peer donations platform.</li>
                            <li>Ruby on Rails, Heroku, AWS &amp; Stripe.</li>
                            <li>Full-stack Development, API development, User Access Control.</li>
                        </ul>
                        <LinkOut href="https://liptember.com.au/" target="_blank" rel="noreferrer" title="See Liptember Live.">See Liptember Homepage</LinkOut>
                    </RightHandSideContainer>
                </Project>
            </Layout>
        )
    }
}

export default ProjectsIndex

export const pageQuery = graphql`
  query {
    projectImage: file(relativePath: { eq: "mockups/liptember.png" }) {
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
