// Post - Creates modules and binds events specific to a post.

// Require.
var config   = require( '../config.json' );
var embed    = require( '../helpers/embed' );
var events   = require( '../events/events' );
var Share    = require( '../modules/share' );

// Object.
var Post = {

  create : function ( $el ) {

    // Create instance.
    var post       = Object.create( this );

    // Populate instance.
    post.$el       = $el;
    post.$deferred = new $.Deferred();  
    post.id        = $el.prop( 'id' );
    post.permalink = $el.data( 'permalink' );

    // Add Share.
    post.Share = Share.create( $el.find( '[data-js~="share"]' ) );

    // Add Share URL.
    if ( post.Share ) {
      post.Share.api.data.url = $el.data( 'permalink' );
    }

    return post;

  },

  clean : function () {},

  embed : embed,

  start : function () {

    var promises = [];

    this.clean();
    this.embed( this.$el.find( '[data-js~="embed"]' ) );

    if ( this.Share ) {
      // When Share done, render complete attr.
      this.Share.start().done( function ( module ) {
        module.$el.attr( 'data-js', module.$el.attr( 'data-js' ) + ' share-start' );
      });

    }

    $.when.apply( $, promises ).then( $.proxy( function () {

      this.$deferred.resolve( this );
      events.trigger( 'post.complete', [ this.$el ] );
    
    }, this ) );
    
    return this.$deferred.promise();

  }

};

// Exports.
module.exports = Post;
