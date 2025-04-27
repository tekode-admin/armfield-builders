import React, { useState } from 'react';
import { PrismicRichText } from '@prismicio/react';

import * as styles from '../styles/Services.module.scss';

const Services = ({data}) => {
    const serviceData = data.data;
    const [selectedServiceIndex, setSelectedServiceIndex] = useState(null);

    const serviceHandler = (index) => {
        selectedServiceIndex === index ? setSelectedServiceIndex(null) : setSelectedServiceIndex(index);
    }

    let services;
    if(serviceData.services){
        services = serviceData.services.map((service, index) => {
            return (
            <li key={index} onClick={() => serviceHandler(index)} onKeyDown={() => serviceHandler(index)} tabIndex={"0"}>
                <div className={[styles.ServicesArrordionHeading, selectedServiceIndex === index ? styles.active : ''].join(' ')}>
                    <h3>{service.service_title.text}</h3>
                    <div className={styles.ServicesAccordionButtonWrap}><div className={styles.ServicesAccordionButton}></div></div>
                </div>
                <div className={[styles.ServiceItemCopy, selectedServiceIndex === index ? styles.active : ''].join(' ')} id={'service-' + index}><PrismicRichText field={service.service_description.richText}/></div>
            </li>
            );
        })
    }
return (
    <section className={styles.ServicesSectionWrap} id={data.uid}>
        <h2>{serviceData.services_title.text}</h2>
        { serviceData.services ? <ul className={styles.ServicesList}>{services}</ul> : ''}
    </section>
)
}

export default Services;