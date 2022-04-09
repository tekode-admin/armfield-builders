module.exports = {
  siteMetadata: {
    title: 'Armfield Builders',
    description: 'General Contractor',
  },
  plugins: [
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: 'homeplacebeerco',
        linkResolver: require('./src/utils/LinkResolver').linkResolver,
        schemas: {
          contact_form: require('./custom_types/contact_form.json'),
          header: require('./custom_types/header.json'),
          footer: require('./custom_types/footer.json'),
          navigation: {},
          page: {},
          homepage: {}
        },
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        additionalData: `@use 'Setup' as *;`,
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
        fonts: [`Lato\:400,400,700,700i,900`, `Iceland`],
      },
    },
  ],
}
