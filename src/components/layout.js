import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import { rhythm, scale } from "../utils/typography"

const Hero = styled.section`
  align-items: center;
  background-color: #f9dfcd;
  display: flex;
  font-family: "Permanent Marker", cursive;
  justify-content: center;
`
const Bio = styled.div`
  h1 {
    font-size: 2.75rem;
    margin: 0;
  }
  h2 {
    font-size: 1.75rem;
    margin-top: 0.25rem;
    margin-bottom: 1.25rem;
  }
  p {
    font-size: 1.25rem;
    margin: 0;
  }
  a {
    color: #000;
  }
`

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }

    if (location.pathname === rootPath) {
      return (
        <div>
          <Hero>
            <div>
              <img src="http://place-puppy.com/200x200" />
            </div>
            <Bio>
              <h1>Christos Hrousis.</h1>
              <h2>Software Engineer</h2>
              <p>
                <a
                  title="I sometimes tweet, but mostly follow."
                  href="https://twitter.com/christoshrousis"
                >
                  twitter
                </a>
                ,{" "}
                <a
                  title="Here is an excessive overview of my work history."
                  href="https://www.linkedin.com/in/christoshrousis"
                >
                  linkedin
                </a>{" "}
                &amp;{" "}
                <a
                  title="If you want to actually send a private message to me."
                  href="mailto:chris@thinkinpixels.com.au"
                >
                  email
                </a>
                .
              </p>
            </Bio>
          </Hero>
          <div
            style={{
              marginLeft: `auto`,
              marginRight: `auto`,
              maxWidth: rhythm(24),
              padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
            }}
          >
            <header>{header}</header>
            <main>{children}</main>
            <footer>
              © {new Date().getFullYear()}, Built with
              {` `}
              <a href="https://www.gatsbyjs.org">Gatsby</a>
            </footer>
          </div>
        </div>
      )
    } else {
      return (
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(24),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          <header>{header}</header>
          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      )
    }
  }
}

export default Layout
