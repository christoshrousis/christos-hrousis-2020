import React from "react"
import styled from "styled-components"

import Waves from "./waves.inline.svg"
import Profile from "./profile.inline.svg"

const Body = styled.section`
  background: linear-gradient(
    60deg,
    rgba(249, 223, 205, 1) 0%,
    rgba(249, 223, 205, 0.75) 100%
  );
`
const Bio = styled.div`
  h1 {
    font-size: 2.75rem;
  }
  h2 {
    font-size: 1.75rem;
  }
  p {
    font-size: 1.25rem;
  }
  @media (max-width: 768px) {
    h1 {
      font-size: 1.25rem;
    }
    h2,
    p {
      font-size: 1rem;
    }
  }
`

const ProfileContainer = styled.div`
  svg {
    height: auto;
    max-width: 275px;
  }
  @media (max-width: 768px) {
    svg {
      max-width: 132px;
    }
  }
`

const Hero = () => {
  return (
    <div>
      <Body
        style={{
          paddingTop: "45px",
          fontFamily: '"Permanent Marker", cursive',
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ProfileContainer>
            <Profile />
          </ProfileContainer>
          <Bio>
            <h1 style={{ margin: 0 }}>Christos Hrousis.</h1>
            <h2 style={{ marginTop: "0.25rem", marginBottom: "1.25rem" }}>
              Web Developer
            </h2>
            <p style={{ margin: 0 }}>
              <a
                title="I sometimes tweet, but mostly follow."
                href="https://twitter.com/christoshrousis"
                style={{ color: "#000" }}
              >
                twitter
              </a>{" "}
              &amp;{" "}
              <a
                title="Here is an excessive overview of my work history."
                href="https://www.linkedin.com/in/christoshrousis"
                style={{ color: "#000" }}
              >
                linkedin
              </a>
            </p>
          </Bio>
        </div>
        <Waves />
      </Body>
    </div>
  )
}

export default Hero
