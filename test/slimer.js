var webpage = require('webpage').create();
webpage
  .open('http://google.com') // loads a page
  .then(function() { // executed after loading
    // store a screenshot of the page
    webpage.viewportSize = { width:650, height:320 };
    webpage.render('page.png', { onlyViewport:true } );    
  });