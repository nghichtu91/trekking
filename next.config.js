/* eslint-disable no-param-reassign, consistent-return, no-restricted-syntax */
// const { i18n } = require('./next-i18next.config')
const { determineBuildId } = require('./build-id')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withAntdLess = require('next-plugin-antd-less');

const withPlugins = require('next-compose-plugins')
const path = require('path')

const lesttt = withAntdLess({
  // optional
  modifyVars: { '@primary-color': '#04f' },
  // optional
  // lessVarsFilePath: './src/styles/variables.less',
  // optional
  lessVarsFilePathAppendToEndOfContent: false,
  // optional https://github.com/webpack-contrib/css-loader#object
  cssLoaderOptions: {},

  // Other Config Here...

  webpack(config) {
    return config;
  },

  // ONLY for Next.js 10, if you use Next.js 11, delete this block
  // future: {
  //   webpack5: true,
  // },
});

module.exports = withPlugins([[withBundleAnalyzer, lesttt]], {
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

