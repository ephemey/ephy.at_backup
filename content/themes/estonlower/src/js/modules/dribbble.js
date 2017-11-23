// Dribbble - Based on Feed.

// Require.
var config    = require( '../config.json' );
var directive = require( '../directives/dribbble' );
var Feed      = require( './feed' );

// Object.
var Dribbble = Object.create( Feed, {

  create : {
    value : function ( $el ) {

      return Feed.create.call( this, $el, config.dribbble, directive );

    }
  }

});

// Exports.
module.exports = Dribbble;
