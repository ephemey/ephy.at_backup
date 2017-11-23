/*

  Eston Core - <3 mikedidthis

*/

'use strict';

// Require.
// Core.
var config     = require( './config.json' );

// Modules.
var Dribbble   = require( './modules/dribbble' );
var Instagram  = require( './modules/instagram' );
var Post       = require( './modules/ghost' );
var Share      = require( './modules/share' );

// Events.
var events     = require( './events/events' );
var hover      = require( './events/hover' );
var popup      = require( './events/popup' );

// Helpers.
var distribute = require( './helpers/distribute' );
var offset     = require( './helpers/offset' );
var shuffle    = require( './helpers/shuffle' );


// Start Method.
var start = function ( options ) {

  // Merge options into config.
  config = $.extend( true, config, options );

  // Offset widget api data.
  config = offset( $( '[data-js~="pager-current"]' ).text(), config );

  // Store instances and promises.
  var instances = [];
  var promises  = [];

  // Create and start module instances.
  $.each( $( '[data-js~="post"]' ), function () {
    var instance = Post.create( $( this ) );
    if ( instance ) {
      instances.push( instance );
    }
  });

  $.each( $( '[data-js~="dribbble"]' ), function () {
    var instance = Dribbble.create( $( this ) );
    if ( instance ) {
      instances.push( instance );
      promises.push( instance.$deferred );
    }
  });

  $.each( $( '[data-js~="instagram"]' ), function () {
    var instance = Instagram.create( $( this ) );
    if ( instance ) {
      instances.push( instance );
      promises.push( instance.$deferred );
    }
  });

  for ( var i = instances.length - 1; i >= 0; i-- ) {
    instances[ i ].start();
  };

  // Wait for module instances promises to complete.
  $.when.apply( $, promises ).then( function () {

    // Distribute widget in post gaps.
    var $posts = distribute( $( '[data-js~="post"]' ), shuffle( $( '[data-js~="widget"]' ) ), 2 );

    // Bind events.
    $.each( $( '[data-js~="hover"]' ), function () {
      hover( $( this ) );
    });
    $.each( $( '[data-js~="popup"]' ), function () {
      popup( $( this ) );
    });

    // Trigger start.complete event.
    events.trigger( 'start.complete', [ $posts ] );

  });

};

// Expose core to window.
window.eston = {
  config : config,
  start : start,
  events : events
};
