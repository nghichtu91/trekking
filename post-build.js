const fs = require('fs-extra')
console.log('-> Copying locales directory...');
const localeSrc = './public/locales';
const localeDest = './.serverless_nextjs/default-lambda/public/locales';

// const dsdsdDest = './.serverless_nextjs/default-lambda/next-i18next.config.js'
fs.copySync(localeSrc, localeDest, { recursive: true });

// fs.copyFile('./next-i18next.config.js', dsdsdDest);
console.log('Locale directory was copied successfully');