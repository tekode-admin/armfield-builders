import * as React from 'react'
import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'

import * as styles from '../styles/404.module.scss';

const NotFoundPage = () => (
  <Layout>
    <Seo title="Not found" />
   <section className={styles.fourOhFourSection}>
    <h1>404</h1>
    <h2>Oops! Sorry, this page has not been constructed yet!</h2>
   </section>
  </Layout>
)

export default NotFoundPage
