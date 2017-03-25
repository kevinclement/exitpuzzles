'use strict'

var Handlebars = require('handlebars');

module.exports = function (count) { 
  var hidden = '';
  if (count > 2) {
    hidden = ' hidden';
  }

  var tmp = '<div class="portfolio-item teamPhoto grow' + hidden + '">   ' +
   '   <div class="inner-content">                                       ' +
   '       <div class="portfolio-content">                               ' +
   '           <div class="portfolio-detail">                            ' +
   '               <a href="' + this.url + '" title="' + this.title + '">' +
   '                   <div class="portfolio-text">                      ' +
   '                       <h4>' + this.title + '</h4>                   ' +
   '                       <p>' + this.comment + '</p>                   ' +
   '                   </div>                                            ' +
   '               </a>                                                  ' +
   '           </div>                                                    ' +
   '       </div>                                                        ' +
   '       <img src="' + this.url + '" alt="" class="img-responsive"/>   ' +
   '       </div>                                                        ' +
   '  </div>                                                             ';
  return new Handlebars.SafeString(tmp);
}