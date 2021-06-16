const { toPairs } = require('ramda');
const {
  pathPrefix,
  title,
  author,
  description,
  siteUrl,
  twitter = '',
  github = '',
  disqusShortName = '',
  lang = 'en',
  googleTrackingId: trackingId,
} = require('./config').site;
const supportedLanguages = require('./config').supportedLanguages;

module.exports = {
  pathPrefix,
  siteMetadata: {
    title,
    author,
    description,
    siteUrl,
    social: {
      twitter,
      github,
    },
    disqusShortName,
    lang,
    langsEntries: toPairs(supportedLanguages),
  },
  plugins: [
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: ['@weknow/gatsby-remark-twitter'],
      },
    },
    {
      resolve: `gatsby-plugin-monetization`,
      options: {
        paymentPointer: `$ilp.uphold.com/i3rLUpU3gRp8`,
      },
    },
    'gatsby-plugin-eslint',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: 'blog',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GSoC 21 @ MetaCall`,
        short_name: `GSoC '21`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/profile-icon.jpg`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: 'gatsby-plugin-i18n',
      options: {
        langKeyDefault: lang,
        useLangKeyLayout: false,
        pagesPaths: ['/content/blog/'],
      },
    },
  ],
};
