// Share - Based on Feed.

// Require.
var config    = require( '../config.json' );
var directive = require( '../directives/share' );
var Feed      = require( './feed' );

// Object.
var Share = Object.create( Feed, {

  create : {
    value : function ( $el ) {

      var instance;

      // Check we have an API key.
      if ( !( config.share.data.apikey === '' ) ) {

        instance = Feed.create.call( this, $el, config.share, directive );

      }

      return instance;

    }
  }

});

// Exports.
module.exports = Share;
