import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Project = styled.div`
    display: flex;
    align-items: center;
    margin: 4rem 0;
    @media (max-width: 600px) {
        display: block;
    }
`

const ImageContainer = styled.div`
    flex-shrink: 0;
    width: 285px;
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
                <Title>Some projects I've worked on.</Title>
                
                <Project>
                    <ImageContainer>
                        <a href="https://tribefamilylawyers.com.au/" target="_blank" rel="noreferrer" title="See Tribe Live.">
                            <Img
                                title="Tribe Homepage"
                                alt="A screenshot of the Tribe homepage"
                                sizes={data.tribe.childImageSharp.sizes}
                            />
                        </a>
                    </ImageContainer>
                    <RightHandSideContainer>
                        <h3>Tribe</h3>
                        <Subtitle><b>Year:</b> 2020</Subtitle>
                        <p>Specialty Family Law portal for everyday Australians.</p>
                        <ul>
                            <li>Website &amp; "No Code".</li>
                            <li>Wordpress &amp; CRM integration.</li>
                            <li>Website development &amp; technical consultation.</li> 
                        </ul>
                        <LinkOut href="https://tribefamilylawyers.com.au/" target="_blank" rel="noreferrer" title="See Tribe Live.">See Tribe Homepage</LinkOut>
                    </RightHandSideContainer>
                </Project>

                <Project>
                    <ImageContainer>
                        <a href="https://wesdome.com/" target="_blank" rel="noreferrer" title="See Wesdome Live.">
                            <Img
                                title="Wesdome Homepage"
                                alt="A screenshot of the Wesdome homepage"
                                sizes={data.wesdome.childImageSharp.sizes}
                            />
                        </a>
                    </ImageContainer>
                    <RightHandSideContainer>
                        <h3>Wesdome</h3>
                        <Subtitle><b>Year:</b> 2017</Subtitle>
                        <p>Keystone client project for Blendmedia.</p>
                        <ul>
                            <li>Marketing and Invester Relations Website.</li>
                            <li>PHP w/ proprietry frameworks.</li>
                            <li>Website development.</li> 
                            <li>Designed &amp; developed the Blendermedia "Atomic" SCSS system.</li>
                            <li>Final iteration of the Blendermedia "Gulp" based build system.</li> 
                        </ul>
                        <LinkOut href="https://wesdome.com/" target="_blank" rel="noreferrer" title="See Wesdome Live.">See Wesdome Homepage</LinkOut>
                    </RightHandSideContainer>
                </Project>

                <Project>
                    <ImageContainer>
                        <a href="https://piknic.ca/" target="_blank" rel="noreferrer" title="See Piknic Live.">
                            <Img
                                title="Piknic Homepage"
                                alt="A screenshot of the Piknic homepage"
                                sizes={data.piknic.childImageSharp.sizes}
                            />
                        </a>
                    </ImageContainer>
                    <RightHandSideContainer>
                        <h3>Piknic</h3>
                        <Subtitle><b>Year:</b> 2016</Subtitle>
                        <p>A platform for cost effective websites, for public corporations.</p>
                        <ul>
                            <li>Website &amp; CMS Product.</li>
                            <li>PHP w/ proprietry frameworks.</li>
                            <li>Product Development, Full-stack Development.</li> 
                            <li>Developed piknic.ca website &amp; contributed 4 designs.</li>
                        </ul>
                        <LinkOut href="https://piknic.ca/" target="_blank" rel="noreferrer" title="See Piknic Live.">See Piknic Homepage</LinkOut>
                    </RightHandSideContainer>
                </Project>

                <Project>
                    <ImageContainer>
                        <a href="https://liptember.com.au/" target="_blank" rel="noreferrer" title="See Liptember Live.">
                            <Img
                                title="Liptember Homepage"
                                alt="A screenshot of the Liptember homepage"
                                sizes={data.liptember.childImageSharp.sizes}
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
    tribe: file(relativePath: { eq: "mockups/tribe.png" }) {
        childImageSharp {
            sizes(maxWidth: 250) {
                ...GatsbyImageSharpSizes_tracedSVG
            }
        }
    }
    wesdome: file(relativePath: { eq: "mockups/wesdome.png" }) {
        childImageSharp {
            sizes(maxWidth: 250) {
                ...GatsbyImageSharpSizes_tracedSVG
            }
        }
    }
    piknic: file(relativePath: { eq: "mockups/piknic.png" }) {
        childImageSharp {
            sizes(maxWidth: 250) {
                ...GatsbyImageSharpSizes_tracedSVG
            }
        }
    }
    liptember: file(relativePath: { eq: "mockups/liptember.png" }) {
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
