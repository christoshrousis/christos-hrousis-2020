/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import Profile from "./profile.inline.svg"
import { rhythm } from "../utils/typography"

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

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
      }}
    >
      <ProfileContainer>
        <div>
          <Profile />
        </div>
      </ProfileContainer>
      <p>
        Written by <strong>{author}</strong> who lives and works in Melbourne,
        Australia, building useful things.
        {` `}
        <a href={`https://twitter.com/${social.twitter}`}>
          You should follow him on Twitter.
        </a>
      </p>
    </div>
  )
}

export default Bio
