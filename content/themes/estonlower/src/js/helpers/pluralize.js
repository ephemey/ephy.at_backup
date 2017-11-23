// Adds a character if value not one.

var pluralizeString = function ( value, string ) {

  if ( value > 1 || value < 1 ) {
    string = string + 's'
  } 

  return string;

};

module.exports = pluralizeString;
