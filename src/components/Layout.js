import * as React from 'react'

import { Header } from './Header'
import { Footer } from './Footer'
import './../styles/reset.css'

export const Layout = ({ isHomepage, children }) => (
  <>
    <Header isHomepage={isHomepage}/>
    {children}
    <Footer />
  </>
)
