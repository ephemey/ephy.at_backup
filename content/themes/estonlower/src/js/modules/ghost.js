// Ghost - Based on Post, includes a clean up method specific to Ghost.

// Require.
var Post = require( '../modules/post' );

// Object.
var Ghost = Object.create( Post, {

  create : {
    value : function ( $el ) {

      return Post.create.call( this, $el );

    }
  },

  clean : {
    value : function () {

      // Cache elements.
      var $excerpt = this.$el.find( '[data-js~="excerpt"]' );
      var $tags    = this.$el.find( '[data-js~="tags"]');

      // Remove empty excerpt.
      if ( $excerpt.length ) {
        // Check if there is any text inside the excerpt.
        if ( !$excerpt.text().trim().length ) {
          $excerpt.remove();
        }
      }

      // Remove helper tags.
      if ( $tags.length ) {

        var tags = [];
        $.each( $tags.children(), function () {
          if ( this.children[ 0 ].innerHTML.indexOf( '_' ) ) {
            tags.push( this );
          }
        });
        tags.length ? $tags.html( tags ) : $tags.remove();

      }

    }
  }

});

// Exports.
module.exports = Ghost;
