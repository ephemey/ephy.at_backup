(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=/*

  Eston Config

*/

{

  "author"  : "mikedidthis",
  "version" : "1.4.2",

  "dribbble" : {
    "data" : {
      "access_token": "",
      "page" : 1,
      "per_page" : 1,
      "response" : "data"
    },
    "cache" : true,
    "dataType" : "jsonp",
    "url" : ""
  },

  "instagram" : {
    "data" : {
      "access_token" : "",
      "count" : 33,
      "page" : 1,
      "per_page" : 1,
      "response" : "data"
    },
    "cache" : true,
    "dataType" : "jsonp",
    "url" : ""
  },

  "share" : {
    "data" : {
      "apikey" : "",
      "url" : "",
    },
    "cache" : true,
    "dataType" : "json",
    "url" : "//free.sharedcount.com/"
  }

}

},{}],2:[function(require,module,exports){
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

},{"./config.json":1,"./events/events":6,"./events/hover":7,"./events/popup":8,"./helpers/distribute":9,"./helpers/offset":11,"./helpers/shuffle":13,"./modules/dribbble":23,"./modules/ghost":25,"./modules/instagram":26,"./modules/share":28}],3:[function(require,module,exports){
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

},{"../helpers/timeago":14,"../helpers/truncate":15}],4:[function(require,module,exports){
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

},{"../helpers/timeago":14,"../helpers/truncate":15}],5:[function(require,module,exports){
// Require.
var truncate  = require( '../helpers/truncate' );
var pluralize = require( '../helpers/pluralize' );

// Directive.
var share = {

  'share-facebook-count' : {
    text : function () {
      var count = this.Facebook.share_count;
      this.Total = this.Total || 0;
      this.Total = count + this.Total;
      return truncate( count );
    }
  },
 'share-facebook-plural' : {
    text : function () {
      return pluralize( this.Facebook.share_count, arguments[ 0 ].element.innerHTML );
    }
  },

  'share-googleplus-count' : {
    text : function () {
      var count = this.GooglePlusOne;
      this.Total = this.Total || 0;
      this.Total = count + this.Total;
      return truncate( count );
    }
  },
  'share-googleplus-plural' : {
    text : function () {
      return pluralize( this.GooglePlusOne, arguments[ 0 ].element.innerHTML );
    }
  },

  'share-linkedin-count' : {
    text : function () {
      var count = this.LinkedIn;
      this.Total = this.Total || 0;
      this.Total = count + this.Total;
      return truncate( count );
    }
  },
  'share-linkedin-plural' : {
    text : function () {
      return pluralize( this.LinkedIn, arguments[ 0 ].element.innerHTML );
    }
  },

  'share-pinterest-count' : {
    text : function () {
      var count = this.Pinterest;
      this.Total = this.Total || 0;
      this.Total = count + this.Total;
      return truncate( count );
    }
  },
  'share-pinterst-plural' : {
    text : function () {
      return pluralize( this.Pinterest, arguments[ 0 ].element.innerHTML );
    }
  },

  'share-stumbleupon-count' : {
    text : function () {
      var count = this.StumbleUpon;
      this.Total = this.Total || 0;
      this.Total = count + this.Total;
      return truncate( count );
    }
  },
  'share-stumbleupon-plural' : {
    text : function () {
      return pluralize( this.StumbleUpon, arguments[ 0 ].element.innerHTML );
    }
  },

  'share-twitter-count' : {
    text : function () {
      var count = this.Twitter;
      this.Total = this.Total || 0;
      this.Total = count + this.Total;
      return truncate( this.Twitter );
    }
  },
  'share-twitter-plural' : {
    text : function () {
      return pluralize( this.Twitter, arguments[ 0 ].element.innerHTML );
    }
  },

  'share-total-count' : {
    text : function () {
      return truncate( this.Total );
    }
  },
  'share-total-plural' : {
    text : function () {
      return pluralize( this.Total, arguments[ 0 ].element.innerHTML );
    }
  }

};

// Exports.
module.exports = share;

},{"../helpers/pluralize":12,"../helpers/truncate":15}],6:[function(require,module,exports){
// Grok an empty jQuery object to use as an events bus, 
// rather than passing it into the module.

var events = $({});

module.exports = events;

},{}],7:[function(require,module,exports){
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

},{"./events":6}],8:[function(require,module,exports){
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

},{"./events":6}],9:[function(require,module,exports){
// Distributes $widgets, evenly, from the middle of $posts.
// Pretty broken, may revise one day.

// Method.
var distributeWidgets = function ( $posts, $widgets, size ) {

  var gaps = $posts.length - 1;
  var top  = Math.floor( gaps / 2 );
  var bot  = Math.floor( gaps / 2 );
  var mid  = gaps - ( top + bot );
  var sets = ~~( $widgets.length / size );

  // If middle and gaps, sets are odd. If no middle and gaps, sets are even.
  if ( ( mid > 0  && sets % 2 === 0 ) || ( mid === 0 && sets % 2 === 1 ) ) {
    sets--;
  } 

  // If we have too many sets, set it to gaps.
  if ( sets > gaps ) {
    sets = gaps;
  }
  
  // Unwrap widgets.
  $widgets.unwrap();

  // Splice all the things!
  var $top = $widgets.splice( 0, ( top * size ) - ( gaps - sets ) );
  var $mid = $widgets.splice( 0, ( mid * size ) );
  var $bot = $widgets.splice( 0, ( bot * size ) - ( gaps - sets ) );
  var $exports = $posts.add( $top ).add( $bot ).add( $mid );

  // Add the middle.
  if ( mid > 0 ) {
    $posts.eq( top ).after( $mid );
  }
  // Add Top.
  for ( var i = 0, len = top; i < len; i++ ) {
    $posts.eq( i ).after( $top.splice( 0, size ) );
  }
  // Add Bottom.
  for ( var j = 0, ken = bot; j < ken; j++ ) {
    $posts.eq( ( gaps - 1 ) - j ).after( $bot.splice( 0, size ) );
  }

  // Remove any remaining $widgets.
  $widgets.remove();

  // Return all elements as a collection.
  return $exports;

};

// Exports.
module.exports = distributeWidgets;

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
// Offsets widget api data, as Ghost doesn't allow {{page}} outside of the pagination
// variable.

var offsetWidgets = function ( page, config ) {

  page = parseInt( page, 10 );

  if ( config.dribbble.data.page ) {
    config.dribbble.data.page = page;
  }
  if ( config.instagram.data.page ) {
    config.instagram.data.page = page;
  }
  
  return config;

};

module.exports = offsetWidgets;

},{}],12:[function(require,module,exports){
// Adds a character if value not one.

var pluralizeString = function ( value, string ) {

  if ( value > 1 || value < 1 ) {
    string = string + 's'
  } 

  return string;

};

module.exports = pluralizeString;

},{}],13:[function(require,module,exports){
// Shuffles an array's order.

// Method.
var shuffleArray = function ( array ) {

  for ( var i = array.length - 1; i > 0; i-- ) {
    
    var j = Math.floor( Math.random() * ( i + 1 ) );
    var temp = array[ i ];
    array[ i ] = array[ j ];
    array[ j ] = temp;
    
  }

  return array;

};

// Exports.
module.exports = shuffleArray;

},{}],14:[function(require,module,exports){
// Converts a time format, into a time ago. Supports ISO and UNIX.

var timeAgo = function ( time ) {

  var templates = {
    prefix: '',
    suffix: ' ago',
    seconds: 'less than a minute',
    minute: 'a minute',
    minutes: '%d minutes',
    hour: 'an hour',
    hours: '%d hours',
    day: 'a day',
    days: '%d days',
    month: 'a month',
    months: '%d months',
    year: 'a year',
    years: '%d years'
  };

  var template = function ( t, n ) {
    return templates[ t ] && templates[ t ].replace( /%d/i, Math.abs( Math.round( n ) ) );
  };

  var timer = function ( time ) {
    
    if ( !time ) return;

    time = time.replace(/\.\d+/, '');
    time = time.replace(/-/, '/').replace(/-/, '/');
    time = time.replace(/T/, ' ').replace(/Z/, ' UTC');
    time = time.replace(/([\+\-]\d\d)\:?(\d\d)/, ' $1$2');
    time = new Date( time * 1000 || time );

    var now = new Date();
    var seconds = ( ( now.getTime() - time ) * .001 ) >> 0;
    var minutes = seconds / 60;
    var hours = minutes / 60;
    var days = hours / 24;
    var years = days / 365;

    return templates.prefix + (
      seconds < 45 && template( 'seconds', seconds ) || 
      seconds < 90 && template( 'minute', 1 ) || 
      minutes < 45 && template( 'minutes', minutes ) || 
      minutes < 90 && template( 'hour', 1 ) || 
      hours < 24 && template( 'hours', hours ) || 
      hours < 42 && template( 'day', 1 ) || 
      days < 30 && template( 'days', days ) || 
      days < 45 && template( 'month', 1 ) || 
      days < 365 && template( 'months', days / 30 ) || 
      years < 1.5 && template( 'year', 1 ) || 
      template( 'years' , years ) ) 
    + templates.suffix;
  
  };

  return timer( time );

};

module.exports = timeAgo;

},{}],15:[function(require,module,exports){
// Truncates a number to one decimal place. 

var truncateNumber = function ( number ) {
  if ( number >= 1000000000 ) {
    return ( number / 1000000000 ).toFixed( 1 ) + 'G';
  }
  if ( number >= 1000000 ) {
    return ( number / 1000000 ).toFixed( 1 ) + 'M';
  }
  if ( number >= 1000 ) {
    return ( number / 1000 ).toFixed( 1 ) + 'K';
  }
  return number;
};

module.exports = truncateNumber;

},{}],16:[function(require,module,exports){
var Attribute, AttributeFactory, BooleanAttribute, Class, Html, Text, helpers, _,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_ = require('../lib/lodash');

helpers = require('./helpers');

module.exports = AttributeFactory = {
  Attributes: {},
  createAttribute: function(element, name) {
    var Attr;
    Attr = AttributeFactory.Attributes[name] || Attribute;
    return new Attr(element, name);
  }
};

Attribute = (function() {
  function Attribute(el, name) {
    this.el = el;
    this.name = name;
    this.templateValue = this.el.getAttribute(this.name) || '';
  }

  Attribute.prototype.set = function(value) {
    this.el[this.name] = value;
    return this.el.setAttribute(this.name, value.toString());
  };

  return Attribute;

})();

BooleanAttribute = (function(_super) {
  var BOOLEAN_ATTRIBUTES, name, _i, _len;

  __extends(BooleanAttribute, _super);

  BOOLEAN_ATTRIBUTES = ['hidden', 'async', 'defer', 'autofocus', 'formnovalidate', 'disabled', 'autofocus', 'formnovalidate', 'multiple', 'readonly', 'required', 'checked', 'scoped', 'reversed', 'selected', 'loop', 'muted', 'autoplay', 'controls', 'seamless', 'default', 'ismap', 'novalidate', 'open', 'typemustmatch', 'truespeed'];

  for (_i = 0, _len = BOOLEAN_ATTRIBUTES.length; _i < _len; _i++) {
    name = BOOLEAN_ATTRIBUTES[_i];
    AttributeFactory.Attributes[name] = BooleanAttribute;
  }

  function BooleanAttribute(el, name) {
    this.el = el;
    this.name = name;
    this.templateValue = this.el.getAttribute(this.name) || false;
  }

  BooleanAttribute.prototype.set = function(value) {
    this.el[this.name] = value;
    if (value) {
      return this.el.setAttribute(this.name, this.name);
    } else {
      return this.el.removeAttribute(this.name);
    }
  };

  return BooleanAttribute;

})(Attribute);

Text = (function(_super) {
  __extends(Text, _super);

  AttributeFactory.Attributes['text'] = Text;

  function Text(el, name) {
    var child;
    this.el = el;
    this.name = name;
    this.templateValue = ((function() {
      var _i, _len, _ref, _results;
      _ref = this.el.childNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        if (child.nodeType === helpers.TEXT_NODE) {
          _results.push(child.nodeValue);
        }
      }
      return _results;
    }).call(this)).join('');
    this.children = _.toArray(this.el.children);
    if (!(this.textNode = this.el.firstChild)) {
      this.el.appendChild(this.textNode = this.el.ownerDocument.createTextNode(''));
    } else if (this.textNode.nodeType !== helpers.TEXT_NODE) {
      this.textNode = this.el.insertBefore(this.el.ownerDocument.createTextNode(''), this.textNode);
    }
  }

  Text.prototype.set = function(text) {
    var child, _i, _len, _ref, _results;
    while (child = this.el.firstChild) {
      this.el.removeChild(child);
    }
    this.textNode.nodeValue = text;
    this.el.appendChild(this.textNode);
    _ref = this.children;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      _results.push(this.el.appendChild(child));
    }
    return _results;
  };

  return Text;

})(Attribute);

Html = (function(_super) {
  __extends(Html, _super);

  AttributeFactory.Attributes['html'] = Html;

  function Html(el) {
    this.el = el;
    this.templateValue = '';
    this.children = _.toArray(this.el.children);
  }

  Html.prototype.set = function(html) {
    var child, _i, _len, _ref, _results;
    while (child = this.el.firstChild) {
      this.el.removeChild(child);
    }
    this.el.innerHTML = html + this.templateValue;
    _ref = this.children;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      _results.push(this.el.appendChild(child));
    }
    return _results;
  };

  return Html;

})(Attribute);

Class = (function(_super) {
  __extends(Class, _super);

  AttributeFactory.Attributes['class'] = Class;

  function Class(el) {
    Class.__super__.constructor.call(this, el, 'class');
  }

  return Class;

})(Attribute);

},{"../lib/lodash":21,"./helpers":19}],17:[function(require,module,exports){
var Context, Instance, after, before, chainable, cloneNode, _ref;

_ref = require('./helpers'), before = _ref.before, after = _ref.after, chainable = _ref.chainable, cloneNode = _ref.cloneNode;

Instance = require('./instance');

module.exports = Context = (function() {
  var attach, detach;

  detach = chainable(function() {
    this.parent = this.el.parentNode;
    if (this.parent) {
      this.nextSibling = this.el.nextSibling;
      return this.parent.removeChild(this.el);
    }
  });

  attach = chainable(function() {
    if (this.parent) {
      if (this.nextSibling) {
        return this.parent.insertBefore(this.el, this.nextSibling);
      } else {
        return this.parent.appendChild(this.el);
      }
    }
  });

  function Context(el, Transparency) {
    this.el = el;
    this.Transparency = Transparency;
    this.template = cloneNode(this.el);
    this.instances = [new Instance(this.el, this.Transparency)];
    this.instanceCache = [];
  }

  Context.prototype.render = before(detach)(after(attach)(chainable(function(models, directives, options) {
    var children, index, instance, model, _i, _len, _results;
    while (models.length < this.instances.length) {
      this.instanceCache.push(this.instances.pop().remove());
    }
    while (models.length > this.instances.length) {
      instance = this.instanceCache.pop() || new Instance(cloneNode(this.template), this.Transparency);
      this.instances.push(instance.appendTo(this.el));
    }
    _results = [];
    for (index = _i = 0, _len = models.length; _i < _len; index = ++_i) {
      model = models[index];
      instance = this.instances[index];
      children = [];
      _results.push(instance.prepare(model, children).renderValues(model, children).renderDirectives(model, index, directives).renderChildren(model, children, directives, options));
    }
    return _results;
  })));

  return Context;

})();

},{"./helpers":19,"./instance":20}],18:[function(require,module,exports){
var AttributeFactory, Checkbox, Element, ElementFactory, Input, Radio, Select, TextArea, VoidElement, helpers, _,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_ = require('../lib/lodash.js');

helpers = require('./helpers');

AttributeFactory = require('./attributeFactory');

module.exports = ElementFactory = {
  Elements: {
    input: {}
  },
  createElement: function(el) {
    var El, name;
    if ('input' === (name = el.nodeName.toLowerCase())) {
      El = ElementFactory.Elements[name][el.type.toLowerCase()] || Input;
    } else {
      El = ElementFactory.Elements[name] || Element;
    }
    return new El(el);
  }
};

Element = (function() {
  function Element(el) {
    this.el = el;
    this.attributes = {};
    this.childNodes = _.toArray(this.el.childNodes);
    this.nodeName = this.el.nodeName.toLowerCase();
    this.classNames = this.el.className.split(' ');
    this.originalAttributes = {};
  }

  Element.prototype.empty = function() {
    var child;
    while (child = this.el.firstChild) {
      this.el.removeChild(child);
    }
    return this;
  };

  Element.prototype.reset = function() {
    var attribute, name, _ref, _results;
    _ref = this.attributes;
    _results = [];
    for (name in _ref) {
      attribute = _ref[name];
      _results.push(attribute.set(attribute.templateValue));
    }
    return _results;
  };

  Element.prototype.render = function(value) {
    return this.attr('text', value);
  };

  Element.prototype.attr = function(name, value) {
    var attribute, _base;
    attribute = (_base = this.attributes)[name] || (_base[name] = AttributeFactory.createAttribute(this.el, name, value));
    if (value != null) {
      attribute.set(value);
    }
    return attribute;
  };

  Element.prototype.renderDirectives = function(model, index, attributes) {
    var directive, name, value, _results;
    _results = [];
    for (name in attributes) {
      if (!__hasProp.call(attributes, name)) continue;
      directive = attributes[name];
      if (!(typeof directive === 'function')) {
        continue;
      }
      value = directive.call(model, {
        element: this.el,
        index: index,
        value: this.attr(name).templateValue
      });
      if (value != null) {
        _results.push(this.attr(name, value));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  return Element;

})();

Select = (function(_super) {
  __extends(Select, _super);

  ElementFactory.Elements['select'] = Select;

  function Select(el) {
    Select.__super__.constructor.call(this, el);
    this.elements = helpers.getElements(el);
  }

  Select.prototype.render = function(value) {
    var option, _i, _len, _ref, _results;
    value = value.toString();
    _ref = this.elements;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      option = _ref[_i];
      if (option.nodeName === 'option') {
        _results.push(option.attr('selected', option.el.value === value));
      }
    }
    return _results;
  };

  return Select;

})(Element);

VoidElement = (function(_super) {
  var VOID_ELEMENTS, nodeName, _i, _len;

  __extends(VoidElement, _super);

  function VoidElement() {
    return VoidElement.__super__.constructor.apply(this, arguments);
  }

  VOID_ELEMENTS = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

  for (_i = 0, _len = VOID_ELEMENTS.length; _i < _len; _i++) {
    nodeName = VOID_ELEMENTS[_i];
    ElementFactory.Elements[nodeName] = VoidElement;
  }

  VoidElement.prototype.attr = function(name, value) {
    if (name !== 'text' && name !== 'html') {
      return VoidElement.__super__.attr.call(this, name, value);
    }
  };

  return VoidElement;

})(Element);

Input = (function(_super) {
  __extends(Input, _super);

  function Input() {
    return Input.__super__.constructor.apply(this, arguments);
  }

  Input.prototype.render = function(value) {
    return this.attr('value', value);
  };

  return Input;

})(VoidElement);

TextArea = (function(_super) {
  __extends(TextArea, _super);

  function TextArea() {
    return TextArea.__super__.constructor.apply(this, arguments);
  }

  ElementFactory.Elements['textarea'] = TextArea;

  return TextArea;

})(Input);

Checkbox = (function(_super) {
  __extends(Checkbox, _super);

  function Checkbox() {
    return Checkbox.__super__.constructor.apply(this, arguments);
  }

  ElementFactory.Elements['input']['checkbox'] = Checkbox;

  Checkbox.prototype.render = function(value) {
    return this.attr('checked', Boolean(value));
  };

  return Checkbox;

})(Input);

Radio = (function(_super) {
  __extends(Radio, _super);

  function Radio() {
    return Radio.__super__.constructor.apply(this, arguments);
  }

  ElementFactory.Elements['input']['radio'] = Radio;

  return Radio;

})(Checkbox);

},{"../lib/lodash.js":21,"./attributeFactory":16,"./helpers":19}],19:[function(require,module,exports){
var ElementFactory, expando, html5Clone, _getElements;

ElementFactory = require('./elementFactory');

exports.before = function(decorator) {
  return function(method) {
    return function() {
      decorator.apply(this, arguments);
      return method.apply(this, arguments);
    };
  };
};

exports.after = function(decorator) {
  return function(method) {
    return function() {
      method.apply(this, arguments);
      return decorator.apply(this, arguments);
    };
  };
};

exports.chainable = exports.after(function() {
  return this;
});

exports.onlyWith$ = function(fn) {
  if ((typeof jQuery !== "undefined" && jQuery !== null) || (typeof Zepto !== "undefined" && Zepto !== null)) {
    return (function($) {
      return fn(arguments);
    })(jQuery || Zepto);
  }
};

exports.getElements = function(el) {
  var elements;
  elements = [];
  _getElements(el, elements);
  return elements;
};

_getElements = function(template, elements) {
  var child, _results;
  child = template.firstChild;
  _results = [];
  while (child) {
    if (child.nodeType === exports.ELEMENT_NODE) {
      elements.push(new ElementFactory.createElement(child));
      _getElements(child, elements);
    }
    _results.push(child = child.nextSibling);
  }
  return _results;
};

exports.ELEMENT_NODE = 1;

exports.TEXT_NODE = 3;

html5Clone = function() {
  return document.createElement('nav').cloneNode(true).outerHTML !== '<:nav></:nav>';
};

exports.cloneNode = (typeof document === "undefined" || document === null) || html5Clone() ? function(node) {
  return node.cloneNode(true);
} : function(node) {
  var cloned, element, _i, _len, _ref;
  cloned = Transparency.clone(node);
  if (cloned.nodeType === exports.ELEMENT_NODE) {
    cloned.removeAttribute(expando);
    _ref = cloned.getElementsByTagName('*');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      element = _ref[_i];
      element.removeAttribute(expando);
    }
  }
  return cloned;
};

expando = 'transparency';

exports.data = function(element) {
  return element[expando] || (element[expando] = {});
};

exports.nullLogger = function() {};

exports.consoleLogger = function() {
  return console.log(arguments);
};

exports.log = exports.nullLogger;

},{"./elementFactory":18}],20:[function(require,module,exports){
var Instance, chainable, helpers, _,
  __hasProp = {}.hasOwnProperty;

_ = require('../lib/lodash.js');

chainable = (helpers = require('./helpers')).chainable;

module.exports = Instance = (function() {
  function Instance(template, Transparency) {
    this.Transparency = Transparency;
    this.queryCache = {};
    this.childNodes = _.toArray(template.childNodes);
    this.elements = helpers.getElements(template);
  }

  Instance.prototype.remove = chainable(function() {
    var node, _i, _len, _ref, _results;
    _ref = this.childNodes;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      node = _ref[_i];
      _results.push(node.parentNode.removeChild(node));
    }
    return _results;
  });

  Instance.prototype.appendTo = chainable(function(parent) {
    var node, _i, _len, _ref, _results;
    _ref = this.childNodes;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      node = _ref[_i];
      _results.push(parent.appendChild(node));
    }
    return _results;
  });

  Instance.prototype.prepare = chainable(function(model) {
    var element, _i, _len, _ref, _results;
    _ref = this.elements;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      element = _ref[_i];
      element.reset();
      _results.push(helpers.data(element.el).model = model);
    }
    return _results;
  });

  Instance.prototype.renderValues = chainable(function(model, children) {
    var element, key, value, _results;
    if (_.isElement(model) && (element = this.elements[0])) {
      return element.empty().el.appendChild(model);
    } else if (typeof model === 'object') {
      _results = [];
      for (key in model) {
        if (!__hasProp.call(model, key)) continue;
        value = model[key];
        if (value != null) {
          if (_.isString(value) || _.isNumber(value) || _.isBoolean(value) || _.isDate(value)) {
            _results.push((function() {
              var _i, _len, _ref, _results1;
              _ref = this.matchingElements(key);
              _results1 = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                element = _ref[_i];
                _results1.push(element.render(value));
              }
              return _results1;
            }).call(this));
          } else if (typeof value === 'object') {
            _results.push(children.push(key));
          } else {
            _results.push(void 0);
          }
        }
      }
      return _results;
    }
  });

  Instance.prototype.renderDirectives = chainable(function(model, index, directives) {
    var attributes, element, key, _results;
    _results = [];
    for (key in directives) {
      if (!__hasProp.call(directives, key)) continue;
      attributes = directives[key];
      if (!(typeof attributes === 'object')) {
        continue;
      }
      if (typeof model !== 'object') {
        model = {
          value: model
        };
      }
      _results.push((function() {
        var _i, _len, _ref, _results1;
        _ref = this.matchingElements(key);
        _results1 = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          element = _ref[_i];
          _results1.push(element.renderDirectives(model, index, attributes));
        }
        return _results1;
      }).call(this));
    }
    return _results;
  });

  Instance.prototype.renderChildren = chainable(function(model, children, directives, options) {
    var element, key, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = children.length; _i < _len; _i++) {
      key = children[_i];
      _results.push((function() {
        var _j, _len1, _ref, _results1;
        _ref = this.matchingElements(key);
        _results1 = [];
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          element = _ref[_j];
          _results1.push(this.Transparency.render(element.el, model[key], directives[key], options));
        }
        return _results1;
      }).call(this));
    }
    return _results;
  });

  Instance.prototype.matchingElements = function(key) {
    var el, elements, _base;
    elements = (_base = this.queryCache)[key] || (_base[key] = (function() {
      var _i, _len, _ref, _results;
      _ref = this.elements;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        el = _ref[_i];
        if (this.Transparency.matcher(el, key)) {
          _results.push(el);
        }
      }
      return _results;
    }).call(this));
    helpers.log("Matching elements for '" + key + "':", elements);
    return elements;
  };

  return Instance;

})();

},{"../lib/lodash.js":21,"./helpers":19}],21:[function(require,module,exports){
 var _ = {};

_.toString = Object.prototype.toString;

_.toArray = function(obj) {
  var arr = new Array(obj.length);
  for (var i = 0; i < obj.length; i++) {
    arr[i] = obj[i];
  }
  return arr;
};

_.isString = function(obj) { return _.toString.call(obj) == '[object String]'; };

_.isNumber = function(obj) { return _.toString.call(obj) == '[object Number]'; };

_.isArray = Array.isArray || function(obj) {
  return _.toString.call(obj) === '[object Array]';
};

_.isDate = function(obj) {
  return _.toString.call(obj) === '[object Date]';
};

_.isElement = function(obj) {
  return !!(obj && obj.nodeType === 1);
};

_.isPlainValue = function(obj) {
  var type;
  type = typeof obj;
  return (type !== 'object' && type !== 'function') || exports.isDate(obj);
};

_.isBoolean = function(obj) {
  return obj === true || obj === false;
};

module.exports = _;

},{}],22:[function(require,module,exports){
var $, Context, Transparency, helpers, _,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

_ = require('../lib/lodash.js');

helpers = require('./helpers');

Context = require('./context');

Transparency = {};

Transparency.render = function(context, models, directives, options) {
  var log, _base;
  if (models == null) {
    models = [];
  }
  if (directives == null) {
    directives = {};
  }
  if (options == null) {
    options = {};
  }
  log = options.debug && console ? helpers.consoleLogger : helpers.nullLogger;
  log("Transparency.render:", context, models, directives, options);
  if (!context) {
    return;
  }
  if (!_.isArray(models)) {
    models = [models];
  }
  context = (_base = helpers.data(context)).context || (_base.context = new Context(context, Transparency));
  return context.render(models, directives, options).el;
};

Transparency.matcher = function(element, key) {
  return element.el.id === key || __indexOf.call(element.classNames, key) >= 0 || element.el.name === key || element.el.getAttribute('data-bind') === key;
};

Transparency.clone = function(node) {
  return $(node).clone()[0];
};

Transparency.jQueryPlugin = helpers.chainable(function(models, directives, options) {
  var context, _i, _len, _results;
  _results = [];
  for (_i = 0, _len = this.length; _i < _len; _i++) {
    context = this[_i];
    _results.push(Transparency.render(context, models, directives, options));
  }
  return _results;
});

if ((typeof jQuery !== "undefined" && jQuery !== null) || (typeof Zepto !== "undefined" && Zepto !== null)) {
  $ = jQuery || Zepto;
  if ($ != null) {
    $.fn.render = Transparency.jQueryPlugin;
  }
}

if (typeof module !== "undefined" && module !== null ? module.exports : void 0) {
  module.exports = Transparency;
}

if (typeof window !== "undefined" && window !== null) {
  window.Transparency = Transparency;
}

if (typeof define !== "undefined" && define !== null ? define.amd : void 0) {
  define(function() {
    return Transparency;
  });
}

},{"../lib/lodash.js":21,"./context":17,"./helpers":19}],23:[function(require,module,exports){
// Dribbble - Based on Feed.

// Require.
var config    = require( '../config.json' );
var directive = require( '../directives/dribbble' );
var Feed      = require( './feed' );

// Object.
var Dribbble = Object.create( Feed, {

  create : {
    value : function ( $el ) {

      return Feed.create.call( this, $el, config.dribbble, directive );

    }
  }

});

// Exports.
module.exports = Dribbble;

},{"../config.json":1,"../directives/dribbble":3,"./feed":24}],24:[function(require,module,exports){
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

},{"../helpers/shuffle":13,"../lib/transparency":22}],25:[function(require,module,exports){
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

},{"../modules/post":27}],26:[function(require,module,exports){
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

},{"../config.json":1,"../directives/instagram":4,"./feed":24}],27:[function(require,module,exports){
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

},{"../config.json":1,"../events/events":6,"../helpers/embed":10,"../modules/share":28}],28:[function(require,module,exports){
// Share - Based on Feed.

// Require.
var config    = require( '../config.json' );
var directive = require( '../directives/share' );
var Feed      = require( './feed' );

// Object.
var Share = Object.create( Feed, {

  create : {
    value : function ( $el ) {

      var instance;

      // Check we have an API key.
      if ( !( config.share.data.apikey === '' ) ) {

        instance = Feed.create.call( this, $el, config.share, directive );

      }

      return instance;

    }
  }

});

// Exports.
module.exports = Share;

},{"../config.json":1,"../directives/share":5,"./feed":24}]},{},[2]);
