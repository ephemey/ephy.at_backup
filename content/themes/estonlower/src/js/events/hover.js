// Binds hover event and triggers a custom event.

// Require.
var events = require( './events' );

// Method.
var hover = function ( $el ) {

  $.each( $el, function () {
    
    var $hover  = $( this );
    var $inner  = $hover.find( '[data-js~="hover-inner"]' );
    var $cover  = $hover.find( '[data-js~="hover-cover"]' );
    var $header = $hover.find( '[data-js~="hover-header"]' );
    var $footer = $hover.find( '[data-js~="hover-footer"]' );

    $inner.on( 'mouseenter', function ( e ) {
      e.preventDefault();
      e.stopPropagation();
      events.trigger( 'hover.start', [ $header, $cover, $footer ] );
    });

    $inner.on( 'mouseleave', function ( e ) {
      e.preventDefault();
      e.stopPropagation();
      events.trigger( 'hover.stop', [ $header, $cover, $footer ] );
    }); 

  });

};

// Exports.
module.exports = hover;
