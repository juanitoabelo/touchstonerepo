module.exports = {
  siteMetadata: {
    title: 'Touchstone Admin Dashboard',
    description: 'Admin dashboard template based on Gatsby with @paljs/ui component package.',
    author: 'Juanito Abelo',
  },
  flags: {
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
    PRESERVE_WEBPACK_CACHE: true,
    FAST_DEV: true,
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-typescript',
    "gatsby-plugin-use-query-params",
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/Layouts/index.tsx`),
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
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'videos',
        path: `${__dirname}/src/videos`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'oah-admin',
        short_name: 'OAH',
        start_url: '/dashboard',
        display: 'minimal-ui',
        icon: 'src/images/OAH.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-171177495-3***',
      },
    },
  ],
};