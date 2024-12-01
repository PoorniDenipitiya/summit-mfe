const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "sysco-ecommerce",
    projectName: "sysco-ecommerce-admin-mfe",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    devServer: {
      headers: {
         "Content-Security-Policy": "default-src 'self'; img-src 'self' blob: data: https: localhost:*; media-src blob: data:;"
      },
    },
  });
};
