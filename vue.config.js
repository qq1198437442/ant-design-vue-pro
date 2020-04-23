module.exports = {
  css: {
    loaderOptions: {
      less: {
        // 这里的选项会传递给 css-loader
        javascriptEnabled: true
      }
    }
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
