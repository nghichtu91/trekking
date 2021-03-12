/* eslint-disable no-param-reassign, consistent-return, no-restricted-syntax */
// const { i18n } = require('./next-i18next.config')
const { determineBuildId } = require('./build-id')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withPlugins = require('next-compose-plugins')
// const lessToJS = require('less-vars-to-js')
// const fs = require('fs')
// const clone = require('clone')
const path = require('path')
module.exports = withPlugins([[withBundleAnalyzer]], {
  target: 'serverless',
  i18n: {
    defaultNS: 'common',
    defaultLocale: 'vi',
    locales: ['vi', 'en'],
  },
  localePath: path.resolve('./public/locales'),
  generateBuildId: async () => {
    const buildId = await determineBuildId()
    console.log(`> Build ID: ${buildId}`)
    return buildId
  },
})

