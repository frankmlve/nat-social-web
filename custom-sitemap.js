module.exports = {
  siteUrl: process.env.WEBSITE_URL || 'http://localhost:3000/',
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  exclude: ['/protected-page', '/awesome/secret-page'],
  alternateRefs: [
    {
      href: process.env.WEBSITE_URL || 'http://localhost:3000/',
      hreflang: 'en-US',
    },
    {
      href: process.env.WEBSITE_URL + '/es' || 'http://localhost:3000/es',
      hreflang: 'es-VE',
    },
  ],
}