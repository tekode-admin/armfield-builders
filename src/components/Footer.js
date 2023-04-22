import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { PrismicRichText } from '@prismicio/react';
import * as styles from '../styles/Footer.module.scss';

export const Footer = () => {
  const queryResults = useStaticQuery(graphql`
  query Footer {
    prismicFooter {
      data {
        copyright {
          text
        }
        attribution {
          richText
        }
        socials {
          social_title {
            text
          }
          social_link {
            url
          }
        }
      }
    }
  }  
  `);

  let footerData = queryResults.prismicFooter.data ? queryResults.prismicFooter.data : null;

  let socials;
  if (footerData.socials) {
    socials = footerData.socials.map((social, index) => {
      return (
        <a href={social.social_link.url} target="_blank" rel="noreferrer" key={index}>{social.social_title.text}</a>
      );
    });
  }

  return (
    <footer>
      <section className={styles.FooterSection}>
        <div className={styles.FooterCopyrightWrap}>
          {footerData.copyright ? <h6 className={styles.FooterCopyright}>{footerData.copyright.text}</h6> : ''}
          {footerData.attribution ? <div className={styles.FooterAttribution}><PrismicRichText field={footerData.attribution.richText} /></div> : ''}
        </div>
        <div className={styles.FooterSocialWrap}>
          {socials}
        </div>
      </section>
    </footer>
  )
}
