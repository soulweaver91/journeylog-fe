const path = require('path');

const rewireMobX = require('react-app-rewire-mobx');
const modernizrPlugin = require('react-app-rewire-modernizr');
const rewireDefinePlugin = require('react-app-rewire-define-plugin');

const GitRevisionPlugin = require('git-revision-webpack-plugin');

module.exports = function override(config, env) {
	config = rewireMobX(config, env);
	config = modernizrPlugin(config, env, path.resolve(__dirname, "src/.modernizrrc.json"));

  const gitRevisionPlugin = new GitRevisionPlugin({
    branch: true,
    lightweightTags: true
  });

  config = rewireDefinePlugin(config, env, {
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
  });

	return config;
};
