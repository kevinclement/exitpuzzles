var page = require('webpage').create();

page.onConsoleMessage = function(msg, lineNum, sourceId) {
  console.log('CONSOLE: ' + msg);
};

 page.viewportSize = {
   width: 1024,
   height: 6400
 };

page.includeJs('https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js', function() {
    console.log('included');

     (page.evaluate(function() {
        console.log('loaded2');
    //   // jQuery is loaded, now manipulate the DOM
    //   var $loginForm = $('form#login');
    //   $loginForm.find('input[name="username"]').value('phantomjs');
    //   $loginForm.find('input[name="password"]').value('c45p3r');
     }))
});

page.open('http://127.0.0.1:8080', function() {

    page.evaluate(function() {

        var style = document.createElement('style');
        var text  = document.createTextNode('');
            style.setAttribute('type', 'text/css');
            style.appendChild(text);
            document.head.insertBefore(style, document.head.firstChild);

        // Turn off height 100% to fix phantom issue
        //document.getElementById("intro").style.height = "100px";
        console.log(navigator.userAgent);
        //document.getElementById("intro").className += "phantom";
    });

    window.setTimeout(function () {
        page.render('exit.png');
        phantom.exit();
    }, 200);
});

// var webshot = require('webshot');

// var mobileOptions = {
//   screenSize: {
//     width: 320,
//     height: 480
//   },
//   shotSize: {
//     width: 320,
//     height: 'all'
//   },
//   userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us)' +
//              ' AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g'
// };

// var options = {
//    screenSize: {
//      height: 6300
//    },

//    customCSS: "body { background:green; }",

//    renderDelay: 3000

// }; 

// webshot('http://127.0.0.1:8080/', 'exit.jpeg', options, function(err) {
//     // screen shot saved
// });
 