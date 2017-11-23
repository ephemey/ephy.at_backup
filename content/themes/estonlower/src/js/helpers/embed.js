// Creates a fluid embed element, ala fluid css trick.

// Method.
var embed = function ( $el ) {

  $.each( $el, function () {

    // Calculate vertical ratio.
    var ratio = function () {

      var $embed = $el.children().eq( 0 );

      var width  = parseInt( $embed.attr( 'width' ), 10 );
      var height = parseInt( $embed.attr( 'height' ), 10 );

      if ( $embed.attr( 'width' ) === '100%' ) {
        width = height;
      }
      if ( $embed.attr( 'height' ) === '100%' ) {
        height = width;
      }

      return ( ( 100 / width ) * height );

    };

    // Render.
    $el.css( 'paddingTop', ratio() + '%' );

  });

};

module.exports = embed;
