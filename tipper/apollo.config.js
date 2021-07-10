// apollo.config.js
module.exports = {
    client: {
      service: {
        // URL to the GraphQL API
        url: 'https://www.talkuppity.tk/hasura/v1/graphql',
      },
      // Files processed by the extension
      includes: [
        'src/**/*.vue',
        'src/**/*.js',
      ],
    },
  }
  