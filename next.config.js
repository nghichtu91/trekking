const { determineBuildId } = require('./build-id')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  generateBuildId: async () => {
    const buildId = await determineBuildId()
    console.log(`> Build ID: ${buildId}`)
    return buildId
  },
})