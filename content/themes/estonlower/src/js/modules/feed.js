// Feed - Fetch and render data from API.

// Require.
var Transparency = require( '../lib/transparency' );
var shuffle      = require( '../helpers/shuffle' );

$.fn.render      = Transparency.jQueryPlugin;

window.Transparency.matcher = function( element, key ) {
  return element.el.getAttribute( 'data-js' ) == key;
};

// Object.
var Feed = {

  create : function ( $el, api, directive ) {

    var feed = Object.create( this );

    feed.$el         = $el;
    feed.$deferred   = new $.Deferred();
    feed.api         = $.extend( true, {}, api );
    feed.api.context = feed;
    feed.data        = [];
    feed.directive   = directive;

    return feed;

  },

  events : function () {},

  fetch : function () {

    return $.ajax( this.api );

  },

  get : function ( ) {

    return this.data;

  },

  set : function ( data ) {

    this.data = data;

  },

  trim : function ( response ) {

    var data   = response[ this.api.data.response ] || response;
    var length = data.length || 1;
    var count  = parseInt( this.api.data.per_page || this.api.data.perpage || 1 , 10 );
    var page   = parseInt( this.api.data.page || 1 );
    var start  = count * page;

    // Data is fine, leave it.
    if ( length === count ) {
      data = data;
    }
    // We have more data than we need, but we haven't used it.
    else if ( ( ( length >= count ) && ( length >= start ) )  ) {
      data = data.slice( start - count, start );
    }
    // We have more data than we need, but we have used it.
    else if ( ( length > count ) && ( start > length ) ) {
      data = shuffle( data ).slice( 0, count );
    }

    return data;

  },

  render : function ( ) {

    this.$el.render( this.get(), this.directive );

  },

  start : function () {

    this.fetch().done( function ( response ) {

      this.set( this.trim( response ) );
      this.render();
      this.$deferred.resolve( this );

    }).fail( function () {

      this.$el.remove();
      this.$deferred.resolve( this );

    });

    return this.$deferred.promise();

  }

};

// Exports.
module.exports = Feed;
