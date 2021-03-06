var Metalsmith     = require('metalsmith');
var msMarkdown     = require('metalsmith-markdown');
var msLayouts      = require('metalsmith-layouts');
var msWatch        = require('metalsmith-watch');
var msExpress      = require('metalsmith-express');
var msAssets       = require('metalsmith-assets');
var msConcat       = require('metalsmith-concat');
var msFingerprint  = require('metalsmith-fingerprint');
var msMetadata     = require('metalsmith-metadata');
var msUglify       = require('metalsmith-uglify');
var msCleanCSS     = require('metalsmith-clean-css');
var msHtmlMinifier = require("metalsmith-html-minifier");
var msMoveRemove   = require('metalsmith-move-remove');
var msRedirect     = require('metalsmith-redirect');
var ncp            = require('ncp');
var rimraf         = require('rimraf');
var argv           = require('yargs').argv;

// get watch and serve config from command line (--watch, --serve)
var opt = {
  build: true,
  production: argv.prod,
  watch: argv.watch,
  serve: argv.serve,
  deploy: argv.deploy,
}

// show what options we're running as
printStartString(opt);

// setup all use parts of metalsmith
var ms = Metalsmith(__dirname);
metadata(ms, opt);
assets(ms, opt);
markdown(ms, opt);
redirects(ms, opt);
bundle(ms, opt);
minify(ms, opt);
fingerprint(ms, opt);
templates(ms, opt);
minify_html(ms, opt);
cleanup(ms, opt);
watch(ms, opt);
serve(ms, opt);

// finally do the build
build(ms, opt)

/*---------------------------------------------------------------------*/
/*  Print the starting string
/*---------------------------------------------------------------------*/
function printStartString(options) {
  process.stdout.write('Starting... [');

  var optArr = [];
  ['deploy', 'build', 'watch', 'serve'].forEach((cmd) => {
    if (options[cmd]) optArr.push(cmd.toUpperCase());
  });

  process.stdout.write(optArr.join(',') + ']\n');
}

/*---------------------------------------------------------------------*/
/*  Metadata
/*---------------------------------------------------------------------*/
function metadata(ms, options) {
  
  // add year for copywrite
  ms.metadata({
    year: new Date().getFullYear()
  });

  // pull other metadata from config files
  ms.use(msMetadata({
    nav:     'config/nav.json',
    reviews: 'config/reviews.json',
    rooms:   'config/rooms.json',
    faq:     'config/faq.json',
    teams:   'config/teams.json'
  }));
}

/*---------------------------------------------------------------------*/
/*  Markdown
/*---------------------------------------------------------------------*/
function markdown(ms, options) {
  ms.use(msMarkdown());
}

/*---------------------------------------------------------------------*/
/*  Redirects
/*---------------------------------------------------------------------*/
function redirects(ms, options) {
  ms.use(msRedirect({
    '/review': 'https://www.google.com/search?q=Exit+Puzzles+Escape+Room,+109+State+Ave+NE,+Olympia,+WA+98501&ludocid=11310057705896057084#lrd=0x5491751be5f5f8df:0x9cf5658f6d1a98fc,3'
  }))
}

/*---------------------------------------------------------------------*/
/*  Assets copying
/*---------------------------------------------------------------------*/
function assets(ms, options) {
  ms.use(msAssets({
    source: './assets/img',
    destination: './assets/img'
  }));

  ms.use(msAssets({
    source: './src/nophones',
    destination: './nophones'
  }));
}

/*---------------------------------------------------------------------*/
/*  Bundling
/*---------------------------------------------------------------------*/
function bundle(ms, options) {
  ms.use(msConcat({
      files: [
        "plugins/jquery.min.js",
        "plugins/bootstrap/js/bootstrap.js",
        "plugins/detectmobilebrowser/detectmobilebrowser.js",
        "plugins/smartresize/smartresize.js",
        "plugins/jquery-easing/jquery.easing.min.js",
        "plugins/jquery-sticky/jquery.sticky.js",
        "plugins/jquery-inview/jquery.inview.min.js",
        "plugins/owl-carousel/owl.carousel.min.js",
        "plugins/isotope/isotope.pkgd.min.js",
        "plugins/jquery-magnificPopup/jquery.magnific-popup.min.js"
      ],
      searchPaths: "assets/",
      output: 'assets/js/vendor.js'
    }))
    .use(msConcat({
      files: [
        "plugins/bootstrap/css/bootstrap.css",
        "plugins/animate-css/animate.css",
        "plugins/owl-carousel/owl.carousel.css",
        "plugins/owl-carousel/owl.theme.css",
        "plugins/jquery-magnificPopup/magnific-popup.css"
      ],
      insertNewLine: true,
      searchPaths: "assets/",
      output: 'assets/css/vendor.css'
    }))
    .use(msConcat({
      files: [
        "js/animation.js",
        "js/component/animation.js",
        "js/component/map.js",
        "js/main.js",
      ],
      searchPaths: "assets/",
      output: 'assets/js/app.js'
    }))
    .use(msConcat({
      files: [
        "css/component/component.css",
        "css/component/colors/yellow.css",
        "css/rinjani.css",
        "css/colors/yellow.css",
        "css/main.css",
      ],
      searchPaths: "assets/",
      output: 'assets/css/app.css'
    }));
}
/*---------------------------------------------------------------------*/
/*  Minification
/*---------------------------------------------------------------------*/
function minify(ms, options) {
  if (!options.production) { return; }

  // setup uglify for javascript
  ms.use(msUglify({
    nameTemplate: "[name].[ext]"
  }));

  // setup clean-css for css
  ms.use(msCleanCSS());
}

function minify_html(ms, options) {
  if (!options.production) { return; }

  ms.use(msHtmlMinifier());
}

/*---------------------------------------------------------------------*/
/*  Fingerprint files
/*---------------------------------------------------------------------*/
function fingerprint(ms, options) {
  ms.use(msFingerprint({
    pattern: [
      'assets/js/vendor.js',
      'assets/css/vendor.css',
      'assets/js/app.js',
      'assets/css/app.css'
    ]
  }))
}

/*---------------------------------------------------------------------*/
/*  Setup templating and tempating parts
/*---------------------------------------------------------------------*/
function templates(ms, options) {
  ms.use(msLayouts({
     engine: 'handlebars',
     directory: "./src/layouts",
     partials: "./src/layouts/partial"
  }))
}

/*---------------------------------------------------------------------*/
/*  Cleanup - stuff we dont want in final directory
/*---------------------------------------------------------------------*/
function cleanup(ms, options) {
  ms.use(msMoveRemove({
    remove: [
      'index.md',
      'layouts/*',
      'assets/css/app.css',
      'assets/js/app.js',
      'assets/js/vendor.js',
      'assets/css/vendor.css']
  }));
}

/*---------------------------------------------------------------------*/
/*  Watch
/*---------------------------------------------------------------------*/
function watch(ms, options) {
  if (options.watch) {
    ms.use(msWatch({
        paths: {
          '${source}/**/*': "**/*",
          './assets/**/*': "**/*"
        },
        livereload: true
      }));
  }
}

/*---------------------------------------------------------------------*/
/*  Serve
/*---------------------------------------------------------------------*/
function serve(ms, options) {
  if (options.serve) {
    ms.use(msExpress({ port: 3333 }));
  }
}

/*---------------------------------------------------------------------*/
/*  Build & Deploy
/*---------------------------------------------------------------------*/
function build(ms, options) {
  ms.build(function(err, files) {
      if (err) { throw err; }

      // if deploying copy build to dist
      if (options.deploy) {
        console.log('  removing old dist folder...');
        rimraf('dist/*', {}, () => {
          console.log('  copying build to dist...');
          ncp('build/', 'dist/', (err) => {
            if (err) {
              return console.error(err);
            }
          });
        });
      }
  });
}