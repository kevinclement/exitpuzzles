var Metalsmith      = require('metalsmith');
var markdown        = require('metalsmith-markdown');
var layouts         = require('metalsmith-layouts');
var permalinks      = require('metalsmith-permalinks');
var watch           = require('metalsmith-watch');
var express         = require('metalsmith-express');
var assets          = require('metalsmith-assets');
var discoverHelpers = require('metalsmith-discover-helpers');

Metalsmith(__dirname)
  .metadata({
    title: "My Static Site & Blog",
    description: "It's about saying »Hello« to the World.",
    generator: "Metalsmith",
    url: "http://www.metalsmith.io/",
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
      [
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
        }
      ],
      [
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
        }
      ],
      [
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
      ]
    ],
    teams: {
      latest: [
        { url: "assets/img/teams/olympia-escape-room-1.png",  title: "",        comment: "Way fun" },
        { url: "assets/img/teams/olympia-escape-room-2.png",  title: "SUCCESS", comment: "Well done" },
        { url: "assets/img/teams/olympia-escape-room-3.png",  title: "SUCCESS", comment: "Piece of cake" },
        { url: "assets/img/teams/olympia-escape-room-4.png",  title: "SUCCESS", comment: "Fun times" },
        { url: "assets/img/teams/olympia-escape-room-5.png",  title: "FAILED",  comment: "Close" },
        { url: "assets/img/teams/olympia-escape-room-6.png",  title: "SUCCESS", comment: "" },
        { url: "assets/img/teams/olympia-escape-room-7.png",  title: "FAILED",  comment: "Almost" },
        { url: "assets/img/teams/olympia-escape-room-8.png",  title: "SUCCESS", comment: "Great effort" },
        { url: "assets/img/teams/olympia-escape-room-9.png",  title: "FAILED",  comment: "Maybe next time" },
        { url: "assets/img/teams/olympia-escape-room-10.png", title: "FAILED",  comment: "Nice try" },
        { url: "assets/img/teams/olympia-escape-room-11.png", title: "SUCCESS", comment: "Victory" },
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
    }
    
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
  .use(discoverHelpers({
    directory: './src/helpers'
  }))
  .use(layouts({
    engine: 'handlebars',
    directory: "./src/layouts",
    partials: "./src/layouts/partial"
  }))  
  .build(function(err, files) {
    if (err) { throw err; }
  });
