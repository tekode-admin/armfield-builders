import * as React from 'react'
import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'
import Homepage from '../components/Homepage';
import { graphql } from 'gatsby';

const HomeTemplate = ({ data }) => {
  if (!data) return null;
  return (
    <Layout isHomepage>
      <Seo title="Home" />
      <Homepage homeSections={data.prismicHome.data.home_sections} />
    </Layout>
  );
}

export const query = graphql`
query Home {
  prismicHome {
    data {
      home_sections {
        home_section {
          document {
            ... on PrismicHero {
              id
              uid
              data {
                hero_business_name {
                  text
                }
                hero_copy {
                  richText
                }
                hero_images {
                  hero_image {
                    localFile {
                      childImageSharp {
                        gatsbyImageData,
                        fluid(quality: 90, maxWidth: 1920) {
                          srcWebp
                        }
                      }
                    }
                  }
                  hero_image_caption {
                    text
                  }
                }
              }
            }
            ... on PrismicServices {
              id
              uid
              data {
                services {
                  service_title {
                    text
                  }
                  service_description {
                    richText
                  }
                }
                services_title {
                  text
                }
              }
            }
            ... on PrismicProjects {
              id
              uid
              data {
                projects {
                  project {
                    slug
                    document {
                      ... on PrismicProject {
                        id
                        data {
                          project_type {
                            text
                          }
                          project_title {
                            text
                          }
                          project_thumbnail {
                            localFile {
                              childImageSharp {
                                gatsbyImageData
                              }
                            }
                          }
                          project_location {
                            text
                          }
                          show
                        }
                      }
                    }
                  }
                }
                projects_title {
                  text
                }
              }
            }
            ... on PrismicContact {
              id
              uid
              data {
                contact_title {
                  richText
                }
                name {
                  text
                }
                email {
                  text
                }
                phone {
                  text
                }
                services {
                  service_title {
                    text
                  }
                }
                message {
                  text
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

export default HomeTemplate;