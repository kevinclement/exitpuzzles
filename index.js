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
    faqRows: [
      { 
        questions: [
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
        ]
      }, { 
        questions: [
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
        ]
      }, { 
        questions: [
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
      }
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
