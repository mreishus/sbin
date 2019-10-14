// postcss.config.js
const purgecss = require("@fullhuman/postcss-purgecss")({
  // Specify the paths to all of the template files in your project
  content: [
    "./js/**/*.html",
    "./js/**/*.jsx",
    "./js/**/*.js",
    "./js/**/*.tsx",
    "./js/**/*.ts",
    "../lib/sbin_web/templates/**/*.eex",
    "../lib/sbin_web/templates/**/*.leex"
    // etc.
  ]

  // Include any special characters you're using in this regular expression
  //defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
});

// console.log({ z: process.env });
// console.log({ z: process.env.npm_lifecycle_event === "deploy" });

module.exports = {
  plugins: [
    require("postcss-import"),
    require("tailwindcss"),
    require("autoprefixer"),
    // Disabled, NODE_ENV is always dev here?
    // Spent a while trying to figure this up, not successful
    // This works!
    ...(process.env.npm_lifecycle_event === "deploy" ? [purgecss] : [])
  ]
};
