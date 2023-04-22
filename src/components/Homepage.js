import React from 'react';
import Hero from './Hero';
import Services from './Services';
import Projects from './Projects';
import Contact from './Contact/Contact';

const Homepage = ({ homeSections }) => {

    let sections;

    if (homeSections) {
        sections = homeSections.map((section, index) => {
            switch (section.home_section.document.uid) {                
                case 'hero':
                    return <Hero key={index} data={section.home_section.document.data} />;
                case 'services':
                    return <Services key={index} data={section.home_section.document} />;
                case 'projects':
                    return <Projects key={index} data={section.home_section.document} />;
                case 'contact':
                    return <Contact key={index} data={section.home_section.document} />;
                default:
                    return null;
            }
        });
    }
    return (
        <section>
            {sections}
        </section>
    )
}

export default Homepage;