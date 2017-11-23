// Require.
var timeago  = require( '../helpers/timeago' );
var truncate = require( '../helpers/truncate' );

// Directive.
var instagram = {

  'widget-author-url' : {
    href : function () {
      return this.link;
    }
  },

  'widget-author-title' : {
    text : function () {
      return this.user.username;
    }
  },

  'widget-media' : {
    style : function () {
      return 'background-image: url(' + this.images.standard_resolution.url + ')';
    }
  },

  'widget-date' : {
    href : function () {
      return this.link;
    }
  },

  'widget-date-stamp' : {
    text : function () {
      return timeago( this.created_time );
    }
  },

  'widget-comment' : {
    href : function () {
      return this.link;
    }
  },

  'widget-comment-count' : {
    text : function () {
      return truncate( this.comments.count );
    }
  },

  'widget-like' : {
    href : function () {
      return this.link;
    }
  },

  'widget-like-count' : {
    text : function () {
      return truncate( this.likes.count );
    }
  }


};

// Exports.
module.exports = instagram;
