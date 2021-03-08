// const withLess = require('@zeit/next-less')
const { determineBuildId } = require('./build-id')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  i18n: {
    localeDetection: false,
    locales: ['en', 'vi'],
    defaultLocale: 'vi',
  },
  generateBuildId: async () => {
    const buildId = await determineBuildId()
    console.log(`> Build ID: ${buildId}`)
    return buildId
  },
})
