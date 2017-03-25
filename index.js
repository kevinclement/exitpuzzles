var Metalsmith     = require('metalsmith');
var msMarkdown     = require('metalsmith-markdown');
var msLayouts      = require('metalsmith-layouts');
var msWatch        = require('metalsmith-watch');
var msExpress      = require('metalsmith-express');
var msAssets       = require('metalsmith-assets');
var msConcat       = require('metalsmith-concat');
var msFingerprint  = require('metalsmith-fingerprint');
var moveRemove     = require('metalsmith-move-remove');
var ncp            = require('ncp');
var rimraf         = require('rimraf');
var argv           = require('yargs').argv;

// get watch and serve config from command line (--watch, --serve)
var opt = {
  build: true,
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
bundle(ms, opt);
fingerprint(ms, opt);
templates(ms, opt);
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
  ms.metadata({
    year: new Date().getFullYear(),
    headerLinks: [
      { url: "who-we-are",      text: "ABOUT"},
      { url: "faq",             text: "FAQ"},
      { url: "reviews",         text: "REVIEWS"},
      { url: "our-latest-work", text: "PHOTOS"},
      { url: "footer",          text: "CONTACT"},
    ],
    rooms: {
      landlord: {
        images: [
          { url: "assets/img/room/room1.jpg" },
          { url: "assets/img/room/room2.jpg" },
          { url: "assets/img/room/room3.jpg" },
          { url: "assets/img/room/room4.jpg" },
          { url: "assets/img/room/room5.jpg" },
          { url: "assets/img/room/room6.jpg" }
        ]
      }
    },
    faqs: [
        {
          title: "What is an escape room?", 
          text:  "An escape room is a real live immersive experience for you and your friends.  Players must solve the rooms fun and challenging puzzles before " + 
                 "your groups time runs out. Clues are tricky, but no special skills or knowledge is required." 
        },
        {
          title: "Where is the game located?", 
          text:  "We are located at 109 State Avenue NE, Olympia WA 98501.  We're in a building called The Olympia Press Building, which is located on " +
                 "the corner of State and Capital.  For more information about parking and building access, please visit our <a href='#footer'>contact</a> page."
        },
        {
          title: "How long is the experience?", 
          text:  "From start to finish, the entire experience is about 1 hour and 40 minutes long. Players will have 70 minutes to complete the game, " +
                  "with around 15 minutes of rules and information before the game, and 15 minutes after the game for debriefing and photos. " +
                  "Some teams may complete the game in under 70 minutes."
        },
        {
          title: "Will we really be locked in the room?", 
          text:  "No. Your goal is to reach the conclusion of the narrative by uncovering clues, solving puzzles and discovering the rooms mysteries in the time " +
                  "allotted. Players may exit and re-enter the room at any time. Note that no refunds or additional time will be given for players who leave the room." 
        },
        {
          title: "Will we be paired up with strangers?", 
          text:  "Unless you reserve all 8 tickets for a time slot, other players may purchase those tickets and join your group. Extra people will help you since " + 
                  "the puzzles are designed to be solved with all 8 players participating.  The more people you have, the better your chances are for solving all " + 
                  "the rooms riddles."
        },
        { 
          title: "Is this game suitable for kids?", 
          text:  "Yes, sometimes kids are the ones with the creativity to find a solution.  Our game is suitable for players of all ages 7 and up provided they " +
                  "are accompanied by enough adult players.  However, as the puzzles progress and become more challenging, we recommend teams that are at least 13 and up."
        },
        {
          title: "How early should we arrive for our game?", 
          text:  "Please plan to arrive 15 minutes before your start time.  This is essential.  You must arrive on time to participate.  When you arrive you will " + 
                  "receive a quick briefing on the game.  Then the fun begins."
        },
        {
          title: "What should I bring with us?", 
          text:  "You only need to bring your best wits and puzzle-solving ability. Wear anything you are comfortable in, and have your reading glasses available " +
                  "if needed.  You may not use your cell phone in the room."
        },
        {
          title: "Do you do special events?", 
          text:  "An escape room is a great way to celebrate special occasions, birthdays or corporate events. If you have a special event you want to set up, " + 
                  "give us a call and we can customize your event to be a one of a kind memorable experience."
        }
    ],

    // TODO: add back and send to main
    /* 
    teams: [
        { url: "assets/img/teams/olympia-escape-room-11.png", title: "SUCCESS", comment: "Victory" },
        { url: "assets/img/teams/olympia-escape-room-10.png", title: "FAILED",  comment: "Nice try" },        
        { url: "assets/img/teams/olympia-escape-room-4.png",  title: "SUCCESS", comment: "Fun times" },
        { url: "assets/img/teams/olympia-escape-room-3.png",  title: "SUCCESS", comment: "Piece of cake" },
        { url: "assets/img/teams/olympia-escape-room-1.png",  title: "",        comment: "Way fun" },
        { url: "assets/img/teams/olympia-escape-room-2.png",  title: "SUCCESS", comment: "Well done" },        
        { url: "assets/img/teams/olympia-escape-room-5.png",  title: "FAILED",  comment: "Close" },
        { url: "assets/img/teams/olympia-escape-room-6.png",  title: "SUCCESS", comment: "" },
        { url: "assets/img/teams/olympia-escape-room-7.png",  title: "FAILED",  comment: "Almost" },
        { url: "assets/img/teams/olympia-escape-room-8.png",  title: "SUCCESS", comment: "Great effort" },
        { url: "assets/img/teams/olympia-escape-room-9.png",  title: "FAILED",  comment: "Maybe next time" },
        { url: "assets/img/teams/olympia-escape-room-12.png", title: "SUCCESS", comment: "" },
        { url: "assets/img/teams/olympia-escape-room-13.png", title: "",        comment: "" },
        { url: "assets/img/teams/olympia-escape-room-14.png", title: "SUCCESS", comment: "Elementary" },
        { url: "assets/img/teams/olympia-escape-room-15.png", title: "SUCCESS", comment: "Killer group" },
        { url: "assets/img/teams/olympia-escape-room-16.png", title: "FAILED",  comment: "" },
        { url: "assets/img/teams/olympia-escape-room-17.png", title: "FAILED",  comment: "" },
        { url: "assets/img/teams/olympia-escape-room-18.png", title: "SUCCESS", comment: "Great group effort" },
        { url: "assets/img/teams/olympia-escape-room-19.png", title: "",        comment: "" },
        { url: "assets/img/teams/olympia-escape-room-20.png", title: "SUCCESS", comment: "Well done" },
        { url: "assets/img/teams/olympia-escape-room-21.png", title: "FAILED",  comment: "" },
      ]
    */    
  });
}

/*---------------------------------------------------------------------*/
/*  Markdown
/*---------------------------------------------------------------------*/
function markdown(ms, options) {
  ms.use(msMarkdown());
}

/*---------------------------------------------------------------------*/
/*  Assets copying
/*---------------------------------------------------------------------*/
function assets(ms, options) {
  ms.use(msAssets({
    source: './assets/img',
    destination: './assets/img'
  }))
  .use(msAssets({
    source: './assets/plugins/font-awesome/fonts',
    destination: './assets/fonts'
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
        "plugins/font-awesome/css/font-awesome-custom.css",
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
        "js/analytics.js",
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
  ms.use(moveRemove({
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
    ms.use(msExpress());
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