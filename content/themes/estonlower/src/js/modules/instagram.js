// Instagram - Based on Feed.

// Require.
var config    = require( '../config.json' );
var directive = require( '../directives/instagram' );
var Feed      = require( './feed' );

// Object.
var Instagram = Object.create( Feed, {

  create : {
    value : function ( $el ) {

      if ( !( config.instagram.data.access_token === '' ) || !( config.instagram.url === '' ) ) {

        // Switch count to per_page as I messed up.
        config.instagram.data.per_page = config.instagram.data.count;
        config.instagram.data.count = 33;

        return Feed.create.call( this, $el, config.instagram, directive );

      }

    }
  }

});

// Exports.
module.exports = Instagram;
