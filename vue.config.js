const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true, // test
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => {
        options.customElement = true;
        return options;
      });
    config.optimization.delete("splitChunks");
  },
});
