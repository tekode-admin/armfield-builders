module.exports = {
  siteMetadata: {
    title: 'Armfield Builders',
    description: 'General Contractor',
  },
  plugins: [
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: 'armfieldbuilders',
        linkResolver: require('./src/utils/LinkResolver').linkResolver,
        schemas: {
          header: require('./custom_types/header.json'),
          footer: require('./custom_types/footer.json'),
          home: require('./custom_types/home.json'),
          maintenance: require('./custom_types/maintenance.json'),
          page: require('./custom_types/page.json'),
          project: require('./custom_types/project.json'),
          services: require('./custom_types/services.json'),
          projects: require('./custom_types/projects.json'),
          contact: require('./custom_types/contact.json'),
          hero: require('./custom_types/hero.json'),
          section: require('./custom_types/section.json'),
        },
        shouldDownloadFiles: {
          'hero.data.hero_images.hero_image': true,
          'project.data.project_thumbnail': true,
          'project.data.hero_image': true,
          'project.data.project_images.project_image': true,
        },
        routes: [
          {
            type: "project",
            path: "/projects/:uid"
          }
        ]
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `blurred`,
          quality: 50,
          breakpoints: [768, 1024, 1440, 1920],
        }
      }
    },
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        additionalData: `@use 'setup' as *;`,
        sassOptions: {
          includePaths: [`${__dirname}/src/styles/`],
        }
      }
    }
    ,
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/favicon.png',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [`Iceland`, `Syne`],
      },
    },
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-L625L5GQ0K", // Google Analytics / GA
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        // gtagConfig: {
        //   optimize_id: "GTM-WVX7QML",
        //   anonymize_ip: true,
        //   cookie_expires: 0,
        // },
      },
    },
  ],
}
