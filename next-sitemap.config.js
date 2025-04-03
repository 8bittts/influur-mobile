/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://influur-mobile.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*', '/_*'],
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 7000,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/*', '/_*']
      }
    ]
  }
} 