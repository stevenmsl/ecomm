/*
  Why separate index from bootstrap
  - use dynamic import function to load up the bootstrap js
  - the main.js only contains the content of index.js
  - this allows webpack to load up the code from projects
    before executing bootstrap  
    
*/

/*
   Overall flow how JS file are loaded when visiting http://localhost:8080
   - check Network/JS/Waterfall to have visual clues
     of the flow
   - main.js loaded and executed
   - bootstrap need to be loaded and executed
     - it needs a file from Products
     - webpack fetches remoteEntry.js to figure out how
     - webpack then know it needs to load 
        src_index and faker.js, which is needed by src_index
     - load them both and execute the bootstrp.js
*/

import("./bootstrap");
