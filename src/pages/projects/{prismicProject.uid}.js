import { PrismicRichText } from '@prismicio/react';
import { graphql } from 'gatsby';
import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { Seo } from '../../components/Seo';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Modal from '../../components/Modal';
import reduxStore from '../../redux/reduxStore';
import {setOpenModal} from '../../redux/actions/actions';


import * as styles from '../../styles/Project.module.scss';

export const Project = ({ data }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  let projectImages;

  if (!data) return null;
  const projectData = data.prismicProject.data;
  const projectHero = getImage(projectData.hero_image.localFile);

  const openSelectedImage = (image) => {
    setSelectedImage(image);
    reduxStore.dispatch(setOpenModal(true));
  }

  if (projectData.project_images.length > 0) {
    projectImages = projectData.project_images.map((projectImage, index) => {
      let image = getImage(projectImage.project_image.localFile);
      return <div onClick={() => openSelectedImage(image)} key={index} className={styles.ProjectWrap}><GatsbyImage image={image} alt={''} className={styles.ProjectMasonryImage}/></div>;
    });
  }

  const closeMenu = () => {
    reduxStore.dispatch(setOpenModal(false));
    setSelectedImage(null);
  }

  return (
    <Layout isHomepage>
      <Seo title={projectData.project_title.text} />
      <section className={styles.ProjectSection}>
        <div className={styles.ProjectHero}>
          <GatsbyImage image={projectHero} alt={''} className={styles.ProjectHeroImage} />
        </div>
        <div className={styles.ProjectContentWrap}>
          <div className={styles.ProjectSpecsWrap}>
            {projectData.project_location ? <h5>{projectData.project_location.text}</h5> : null}
            <div className={styles.ProjectSpecsBreak}></div>
            {projectData.project_type ? <h5>{projectData.project_type.text}</h5> : null}
          </div>
          {projectData.project_title ? <h1 className={styles.ProjectTitle}>{projectData.project_title.text}</h1> : null}
          {projectData.project_copy ? <PrismicRichText field={projectData.project_copy.richText} /> : null}
          <div className={styles.ProjectMasonryLayout}>
            {projectImages}
            {selectedImage ? <Modal callback={closeMenu}><GatsbyImage image={selectedImage} alt={''} className={styles.ProjectModalImage}/></Modal> : null }
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
query projectQuery($uid: String) {
    prismicProject(uid: {eq: $uid}) {
      id
      data {
        project_title {
          text
        }
        project_copy {
          richText
        }
        hero_image {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
        }
        project_images {
            project_image {
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
        }
        project_type {
          text
        }
        project_location {
          text
        }
        show
      }
    }
  }
`;

export default Project;