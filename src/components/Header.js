import * as React from 'react'
import { useStaticQuery, graphql, Link, navigate } from 'gatsby'
import { PrismicRichText } from '@prismicio/react';
import * as styles from '../styles/Header.module.scss';
import reduxStore from '../redux/reduxStore';
import { setOpenModal } from '../redux/actions/actions';
import { useSelector } from 'react-redux';
import Modal from './Modal';
import Logo from '../images/logo.svg';

export const Header = () => {
  const isMobile = useSelector(state => state.isMobile);

  const queryResults = useStaticQuery(graphql`
  query Header {
    prismicHeader {
      data {
        header_sections {
          anchor_link {
            text
          }
          section {
            document {
              ... on PrismicServices {
                id
                data {
                  services_title {
                    text
                  }
                }
              }
              ... on PrismicProjects {
                id
                data {
                  projects_title {
                    text
                  }
                }
              }
              ... on PrismicContact {
                id
                data {
                  contact_title {
                    richText
                  }
                }
              }
            }
            uid
          }
        }
      }
    }
  }  
  `);

  let headerData = queryResults.prismicHeader.data ? queryResults.prismicHeader.data : null;
  let headerSections;

  if (headerData.header_sections) {
    headerSections = headerData.header_sections.map((section, index) => {
      let title;
      let text = true;
      switch (section.section.uid) {
        case 'services':
          title = section.section.document.data.services_title.text;
          break;
        case 'projects':
          title = section.section.document.data.projects_title.text;
          break;
        case 'contact':
          title = section.section.document.data.contact_title.richText;
          text = false;
          break;
      }
      return (
        <li key={index} className={styles.HeaderMenuItem} onClick={() => scrollToEl(section.section.uid)}><div role="button">{text ? title : <PrismicRichText field={title} />}</div></li>
      )
    });
  }

  const scrollToEl = (el) => {
    if (typeof window !== 'undefined' && window.location.pathname === '/') {
      let element = document.getElementById(el);
      if (isMobile) {
        closeMenu();
      }
      setTimeout(function () {
        element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      navigate("/");
      setTimeout(function () {
        let element = document.getElementById(el);
        if (isMobile) {
          closeMenu();
        }
        element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }

  const openMenu = () => {
    reduxStore.dispatch(setOpenModal(true));
  }

  const closeMenu = () => {
    reduxStore.dispatch(setOpenModal(false));
  }

  return (
    <header className={styles.HeaderWrap}>
      <Link to={"/"}><img className={styles.HeaderLogo} src={Logo} alt="Armfield Builders" /></Link>
      {isMobile ?
        <button className={styles.HeaderMenuCopy} onClick={() => openMenu()}>Menu</button>
        :
        <ul className={styles.HeaderMenuOptionsWrap}>{headerSections}</ul>
      }
      <nav>
        <Modal callback={closeMenu}><ul className={styles.HeaderMenuOptionsWrap}>{headerSections}</ul></Modal>
      </nav>
    </header>
  )
}
