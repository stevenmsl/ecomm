const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  devServer: {
    port: 8080,
  },
  plugins: [
    new ModuleFederationPlugin({
      /*
        - this is not used for a container
        - added for clarity
        - only needed for Remotes
      */
      name: "container",
      /*
        - lists projects that the container can search
          to get additional code
        - webpack will load the code if anything in container
          has an import 
          - import "products/ProductsIndex";
        - webpack will look at this remotes section if it
          can't find the modules you are importing in the
          node_modules folder
        - products@http://localhost:8081/remoteEntry.js
          - products : the name property in the Products webpack config file
          - http://localhost:8081/remoteEntry.js : url for the remoteEntry file
      */
      remotes: {
        products: "products@http://localhost:8081/remoteEntry.js",
        cart: "cart@http://localhost:8082/remoteEntry.js",
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
