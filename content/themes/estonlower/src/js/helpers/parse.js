// Parses a twitter string and turns it html.

// Method.
var parse = function ( string ) {

  var patterns = {
    link: /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,
    user: /(^|\s)@(\w+)/g,
    hash: /(^|\s)#(\w+)/g
  };
  return string.replace(patterns.link,'<a href="$1" target="_blank">$1</a>')
  .replace(patterns.user, '$1@<a href="http://www.twitter.com/$2" target="_blank">$2</a>')
  .replace(patterns.hash, '$1#<a href="http://search.twitter.com/search?q=%23$2" target="_blank">$2</a>');

};

module.exports = parse;
