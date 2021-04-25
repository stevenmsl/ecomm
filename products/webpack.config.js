/*
  - webpack is responsible for bundling the code
    - the default output is main.js in the dist folder
  - webpack-dev-server 
    - the dev web server to host html and JS files
  - html-webpack-plugin
    - this plugin will take the generated output files
      from webpack and injects them into the index.html
      so they can be loaded up in the browser
    - don't create the script tags manually in the index 
      html by yourself as it's hard to predict what the
      file names and how many files webpack will produce 

*/

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

/*
   Module Federation Plugin
   - The plugin will spit out files to help with module federation
     - those files will be loaded by the container 
   - you can observe which JS files are loaded on the Network/JS
     tab when visiting the container site at http://localhost:8080 
   - remoteEntry.js
     - contains a list of files that are available from
       this project plus directions on how to load them
   - src_index
     - version of src/index.js that can be safely loaded
       into the browser 
   - faker.js
     - version of faker that can be safely loaded into
       the browser
*/

module.exports = {
  mode: "development",
  devServer: {
    port: 8081,
  },
  plugins: [
    /*
      - name
        - this is used by the container to 
          specify where to find the code
          for products
      - filename
        - sets the name of the manifest file
        - don't change it (remoteEntry.js)
      - exposes
        - aliases filenames
        - so the container will import the
          ProductsIndex module which is 
          pointing to the index.js in the
          src folder of this project
        - shared
          - faker is shared between products
            and cart
          - webpack will decide how many copies
            of faker module it should load by
            looking at the version used by 
            products and cart separately
          - you can also mark faker as a singleton
            but you will receive a warning message
            if products and card are using incompatible
            version of faker              
          - you need to import shared modules
            asynchronously         
    */
    new ModuleFederationPlugin({
      name: "products",
      filename: "remoteEntry.js",
      exposes: {
        "./ProductsIndex": "./src/bootstrap",
      },
      shared: ["faker"],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
