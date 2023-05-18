const babelConfig = require('pwa-kit-dev/configs/babel/babel-config')

babelConfig.default.presets[2] = [
    '@babel/preset-react',
    {runtime: 'automatic', importSource: '@emotion/react'}
]
babelConfig.default.plugins.push('@emotion/babel-plugin')

module.exports = babelConfig
