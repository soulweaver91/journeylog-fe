const fs = require("fs");
const sass = require("sass");
const globImporter = require("node-sass-glob-importer");

const output = sass.renderSync({
  file: "./src/index.scss",
  importer: globImporter(),
  includePaths: [
    "./src/components",
    "./node_modules"
  ],
  outFile: "./src/index.css",
  outputStyle: "compressed"
});

fs.writeFileSync("./src/index.css", output.css);
