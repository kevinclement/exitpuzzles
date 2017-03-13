var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');
var watch       = require('metalsmith-watch');
var express     = require('metalsmith-express');
var assets      = require('metalsmith-assets');

Metalsmith(__dirname)
  .metadata({
    title: "My Static Site & Blog",
    description: "It's about saying »Hello« to the World.",
    generator: "Metalsmith",
    url: "http://www.metalsmith.io/",
    headerLinks: [
      {url: "who-we-are", text: "ABOUT"},
      {url: "faq", text: "FAQ"},
      {url: "reviews", text: "REVIEWS"},
      {url: "our-latest-work", text: "PHOTOS"},
      {url: "footer", text: "CONTACT"},
    ]
  })
  .source('./src')
  .destination('./build')
  .clean(true)
  .use(express())
  .use(watch({
          paths: {
            '${source}/**/*': "**/*"
          },
          livereload: true
        }))
  .use(markdown())
  .use(permalinks())
  .use(assets({
    source: './assets',
    destination: './assets'
  }))
  .use(layouts({
    engine: 'handlebars',
    directory: "./src/layouts",
    partials: "./src/layouts/partial"
  }))
  .build(function(err, files) {
    if (err) { throw err; }
  });
