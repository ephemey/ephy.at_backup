// Binds click event and triggers a custom event.

// Require.
var events = require( './events' );

// Method.
var popup = function ( $el ) {

  $.each( $el, function () {

    var open   = false;
    var $popup = $( this );
    var $list  = $popup.find( '[data-js~="popup-list"]' );

    $popup.on( 'click', function ( e ) {

      e.preventDefault();

      if ( !open ) {
        events.trigger( 'popup.open', [ $popup, $list ] );
        open = true;
      } else {
        events.trigger( 'popup.close', [ $popup, $list ] );
        open = false;
      }

    });
    
    $list.on( 'click', function ( e ) {
       e.stopPropagation();
       $popup.trigger( 'click' );
    });

  });

};

// Exports.
module.exports = popup;
