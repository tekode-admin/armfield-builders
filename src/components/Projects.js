import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector } from 'react-redux';
import * as styles from '../styles/Projects.module.scss';
import { Link } from 'gatsby';
import { Autoplay } from 'swiper';

const Projects = ({ data }) => {
    const projectsData = data.data;
    let projects;
    const isMobile = useSelector(state => state.isMobile);

    if (projectsData.projects) {
        projects = projectsData.projects.map((project, index) => {
            const projectThumbnail = getImage(project.project.document.data.project_thumbnail.localFile);
            return (
                <SwiperSlide key={index} className={styles.SwiperSlide}>
                    <Link to={'projects/' + project.project.slug}>
                        <div className={styles.SwiperContent}>
                            <GatsbyImage image={projectThumbnail} alt={''} className={styles.ProjectThumbnail} />
                            {project.project.document.data.project_location ? <h5 className={styles.ProjectLocation}>{project.project.document.data.project_location.text}</h5> : ''}
                            {project.project.document.data.project_type ? <h5 className={styles.ProjectCaption}>{project.project.document.data.project_type.text}</h5> : ''}
                        </div>
                    </Link>
                </SwiperSlide>
            );
        });
    }

    return (
        <section className={styles.ProjectsWrap} id={data.uid}>
            {projectsData.projects_title ? <h2 className={styles.ProjectsTitle}>{projectsData.projects_title.text}</h2> : ''}
            <Swiper
                slidesPerView={1.75}
                // className={styles.SwiperWrap}
                spaceBetween={20}
                slidesOffsetBefore={isMobile ? 20 : 10}
                slidesOffsetAfter={isMobile ? 10 : 30}
                loop={true}
                autoplay={{delay: 5000, disableOnInteraction: false}}
                modules={[Autoplay]}
            >
                {projects}
            </Swiper>
        </section>
    )
}

export default Projects;