// Require.
var timeago  = require( '../helpers/timeago' );
var truncate = require( '../helpers/truncate' );

// Directive.
var dribbble = {

  'widget-author-url' : {
    href : function () {
      return this.html_url;
    }
  },

  'widget-author-title' : {
    text : function () {
      return this.title;
    }
  },

  'widget-media' : {
    style : function () {
      return 'background-image: url(' + this.images.hidpi + ')';
    }
  },

  'widget-date' : {
    href : function () {
      return this.html_url;
    }
  },

  'widget-date-stamp' : {
    text : function () {
      // Date returned is some bullshits ISO wannabe.
      return timeago( this.created_at.replace(/\//g, '-' ).replace(' ', 'T' ).replace(' ', '') );
    }
  },

  'widget-comment' : {
    href : function () {
      return this.html_url + '#comments-section';
    }
  },

  'widget-comment-count' : {
    text : function () {
      return truncate( this.comments_count );
    }
  },

  'widget-like' : {
    href : function () {
      return this.html_url + '/fans';
    }
  },

  'widget-like-count' : {
    text : function () {
      return truncate( this.likes_count );
    }
  }

};

// Exports.
module.exports = dribbble;
