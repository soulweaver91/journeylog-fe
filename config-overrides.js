const path = require('path');

const {
  override,
  addDecoratorsLegacy,
  addBundleVisualizer,
  addWebpackAlias
} = require('customize-cra');
const webpack = require('webpack');
const GitRevisionPlugin = require('git-revision-webpack-plugin');

const gitRevisionPlugin = new GitRevisionPlugin({
  branch: true,
  lightweightTags: true
});

module.exports = override(
  addDecoratorsLegacy(),
  process.env.BUNDLE_VISUALIZE === '1' && addBundleVisualizer(),
  // Set up Modernizr
  (config => {
    const loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;

    loaders.unshift({
      type: 'javascript/auto',
      test: /\.modernizrrc(\.json)?$/,
      use: ['modernizr-loader', 'json-loader'],
    });

    return config;
  }),
  // Set up define plugin
  (config => {
    config.plugins.push(new webpack.DefinePlugin({
      'process.env.GIT_PUBLIC_REPOSITORY': JSON.stringify('https://github.com/soulweaver91/journeylog-fe'),
      'process.env.GIT_VERSION': JSON.stringify(gitRevisionPlugin.version()),
      'process.env.GIT_COMMITHASH': JSON.stringify(gitRevisionPlugin.commithash()),
      'process.env.GIT_BRANCH': JSON.stringify(gitRevisionPlugin.branch()),
      'process.env.BUILD_DATE': JSON.stringify((new Date()).toLocaleString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
        hour12: false
      }))
    }));

    return config;
  }),
  addWebpackAlias({'modernizr$': path.resolve(__dirname, "src/.modernizrrc.json") })
);
