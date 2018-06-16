const path = require('path');

const rewireMobX = require('react-app-rewire-mobx');
const modernizrPlugin = require('react-app-rewire-modernizr');

module.exports = function override(config, env) {
	config = rewireMobX(config, env);
	config = modernizrPlugin(config, env, path.resolve(__dirname, "src/.modernizrrc.json"));

	return config;
};
