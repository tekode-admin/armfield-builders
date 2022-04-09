import * as React from 'react'
import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'

const Homepage = () => (
  <Layout isHomepage>
    <Seo title="Home" />
  </Layout>
)

export default Homepage