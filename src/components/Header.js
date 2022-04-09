import * as React from 'react'
import { Link } from 'gatsby'

export const Header = ({ isHomepage }) => {
  const homepageClass = isHomepage ? 'homepage-header' : ''
  return (
    <header className={`site-header ${homepageClass}`}>
      Header
    </header>
  )
}
