/*
相关内容参看47小节，动态引入主题
*/
const path = require("path");
const AntDesignThemePlugin = require("antd-theme-webpack-plugin");

const options = {
  antDir: path.join(__dirname, "./node_modules/ant-design-vue"),
  stylesDir: path.join(__dirname, "./src"),
  varFile: path.join(
    __dirname,
    "./node_modules/ant-design-vue/lib/style/themes/default.less"
  ),
  mainLessFile: "",
  themeVariables: ["@primary-color"],
  generateOnce: false
};
const webpack = require("webpack");
const themePlugin = new AntDesignThemePlugin(options);
module.exports = {
  css: {
    loaderOptions: {
      less: {
        // 这里的选项会传递给 css-loader
        javascriptEnabled: true,
        modifyVars: {
          "primary-color": "#1DA57A",
          "link-color": "#1DA57A",
          "border-radius-base": "2px"
        }
      }
    }
  },
  configureWebpack: {
    plugins: [
      themePlugin,
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
  },
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear();

    // 添加要替换的 loader
    // eslint-disable-next-line prettier/prettier
    svgRule
      .use('vue-svg-loader')
        .loader('vue-svg-loader')
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        bypass: function(req, res) {
          if (req.headers.accept.indexOf("html") !== -1) {
            // console.log(req.headers.accept.indexOf("html"));
            console.log("Skipping proxy for browser request.");
            return "/index.html";
            // return res.send([5, 20, 36, 10, 10, 20]);
          } else if (process.env.MOCK !== "none") {
            const name = req.path
              .split("/api/")[1]
              .split("/")
              .join("_");
            const mock = require(`./mock/${name}`);
            const result = mock(req.method);
            delete require.cache[require.resolve(`./mock/${name}`)];
            // console.log(result);
            return res.send(result);
          } else {
            return res.send([5, 20, 36, 10, 10, 20]);
          }
        }
      }
    }
  }
};
