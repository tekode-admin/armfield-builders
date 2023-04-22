import React, {useEffect, useState} from 'react';
import { PrismicRichText, PrismicText } from '@prismicio/react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import BackgroundImage from 'gatsby-background-image';
import * as styles from '../styles/Hero.module.scss';
import { Autoplay } from 'swiper';

const Hero = ({ data }) => {
    const [activeHeroIndex, setActiveHeroIndex] = useState(null);
    const [activeCaption, setActiveCaption] = useState('');

    let heroImages;
    if (data.hero_images) {
        heroImages = data.hero_images.map((image, index) => {
            const heroImage = getImage(image.hero_image.localFile);
            return (
                <SwiperSlide key={index} className={styles.SwiperSlide}>
                    <GatsbyImage image={heroImage} alt={''} className={styles.HeroImage}/>
                    {image.hero_image_caption ? <p>{image.hero_image_caption.text}</p> : ''}
                </SwiperSlide>
            );
        })
    }

    const slideChangeHandler = (swiper) => {
        setActiveHeroIndex(swiper.realIndex + 1);
        setActiveCaption(data.hero_images[swiper.realIndex].hero_image_caption);
    }

    return (
        <section className={styles.HeroWrap}>
            <div className={styles.HeroSwiperWrap}>
            {data.hero_images ? <div className={styles.HeroProgressWrap}>{activeHeroIndex} <span className={styles.ProgressBreak}></span> {data.hero_images.length}</div> : null}
            <Swiper
                className='mySwiper'
                slidesPerView={1}
                loop={true}
                autoplay={{delay: 10000, disableOnInteraction: false}}
                modules={[Autoplay]}
                onSlideChange={(swiper) => slideChangeHandler(swiper)}>
                {heroImages}
            </Swiper>
            {data.hero_images && activeCaption ? <div className={styles.HeroImageCaption}>{activeCaption.text}</div> : null}
            </div>
            <div className={styles.HeroCopyWrap}>
                <PrismicRichText field={data.hero_copy.richText} />
            </div>
            {data.hero_business_name ? <div className={styles.HeroBusinessName}>{data.hero_business_name.text}</div> : ''}
        </section>
    )
}

export default Hero;