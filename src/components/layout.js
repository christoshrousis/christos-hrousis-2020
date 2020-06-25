import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import Hero from "./hero"
import { rhythm } from "../utils/typography"
import Profile from "./profile.inline.svg"

const BlogTitle = styled.div``
const HeaderContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;

  h3 {
    font-family: "Permanent Marker", cursive;
    font-size: 2rem;
  }

  h3,
  p {
    margin-bottom: 0;
    margin-top: 0;
  }

  p {
    font-family: "Montserrat", sans-serif;
    position: absolute;
    opacity: 0;
    transition: opacity 250ms cubic-bezier(0.62, 0.28, 0.23, 0.99);
    margin-top: -4px;
    font-size: 0.85rem;
  }

  :hover {
    p {
      opacity: 1;
    }
  }
`

const ProfileContainer = styled.div`
  div {
    background: #f9dfcd;
    border-radius: 100%;
    height: 65px;
    margin-right: 25px;
    width: 65px;
  }
  svg {
    height: auto;
    width: 65px;
  }
`

const Footer = styled.footer`
  background: white;
  display: flex;
  position: fixed;
  bottom: 0;
  border-top: 1px solid rgba(249, 223, 205, 1);
  font-size: 0.85rem;
  padding-bottom: 15px;
  padding-top: 8px;
  margin-left: auto;
  margin-right: auto;
  max-width: 39.375rem;
  justify-content: space-between;
  text-align: right;
  width: 100%;
  @media (max-width: 768px) {
    left: 0;
    max-width: 100vw;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 0.6rem;
    padding-bottom: 7px;
    padding-top: 5px;
  }
`

const Links = styled.span`
  margin-left: -5px;
  a {
    margin: 0 2.5px;
  }
`

const Main = styled.main`
  padding-bottom: 60px;
`
class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = null
    } else {
      header = (
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          <HeaderContainer>
            <BlogTitle>
              <h3>{title}</h3>
              <p>Return home</p>
            </BlogTitle>
            <ProfileContainer>
              <div>
                <Profile />
              </div>
            </ProfileContainer>
          </HeaderContainer>
        </Link>
      )
    }

    return (
      <div>
        {location.pathname === rootPath ? <Hero /> : null}
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(24),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          <header>{header}</header>
          <Main>{children}</Main>
          <Footer>
            <Links>
              <Link to="/">Home</Link>
              <Link to="/projects">Projects</Link>
            </Links>
            <span>🔥💀<b>WRITE OR DIE</b>☠️🔥</span>
          </Footer>
        </div>
      </div>
    )
  }
}

export default Layout
