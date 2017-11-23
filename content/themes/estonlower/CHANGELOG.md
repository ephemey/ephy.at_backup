# Changelog
All notable changes to this theme will be documented in this file.

## 1.4.2

### Fixed
- Dribbble comments / likes urls

## 1.4.1

### Added
- Added jQuery v2.1.4 via CDN

### Fixed
- Dribbble shots, uses v1 of the api
- Disqus SSL fix. Protocol is now relative (thanks [@troyhunt](https://twitter.com/troyhunt))
- Safari randomly removing iframes (thanks [@joshbear](https://twitter.com/joshbear))

## 1.4.0

### Added
- Mailchimp subscription form (thanks [@fisalcs](https://twitter.com/fisalcs))
- Ask.fm link and icon (thanks [@fisalcs](https://twitter.com/fisalcs))

## 1.3.2

### Added
- `{{navigation}}` support

### Fixed
- Empty footer on static pages
- Google Fonts and SSL fix (thanks [@makingsauce](https://twitter.com/makingsauce))

## 1.3.1

### Added
- Vimeo link and icon (thanks [@midhatmujkic](https://twitter.com/midhatmujkic))

### Fixed
- Icons not appearing on some browsers

## 1.3.0

## Added
- Pre Syntax Highlighting [Highlight.js](https://highlightjs.org/)

## Fixed
- Pre generated with mixed indentation, again :(
- `config.hbs` uses `''` instead of `null`
- Instagram Photos uses `count` instead of `per_page`, following the API
- Modules check for specifics in `config.hbs` before creating instances

## 1.2.4

## Fixed
- Reference to `post/comments.hbs` (thanks [Martin Snajdr](http://snajdr.de/))
- Null'd `config.hbs`

## 1.2.3

### Added
- `post.hbs` partial

## Fixed
- Shares render without the API. Shares Count via API is optional

## 1.2.2

### Added
- Support for Ghost 0.5.8
- Added Read More Link (thanks [@sahilng](https://twitter.com/sahilng))

### Fixed
- Iframe CSS fix
- Fluid embeds incorrect ratio when attributes are 100%

## 1.2.1

### Added
- Support for Ghost 0.5.7

### Fixed
- `author.hbs` missing partial (thanks [leafinote](http://themeforest.net/user/leafinote))

## 1.2.0

### Added
- Support for Ghost 0.5.6
- Animation to `data-js="header"`
- Animation to `data-js="pager"`
- Documentation for Logo
- Documentation for Post Types
- Less Plugin AutoPrefix
- Less Plugin Cless CSS
- Standalone shares
- Support for Footnotes
- Support for Mark
- Support for Logo

### Fixed
- Pre generated with mixed indentation (thanks [@andrewzey](https://twitter.com/andrewzey))
- Documentation now online only
- Post cover images not filling container
- Renamed event `shares.open` to `popup.open`
- Renamed event `shares.close` to `popup.close`
- Shares Pinterest is now exclusive to Photo posts

### Removed
- Attribute `data-js="share-twitter"`
- Partial `post/content.hbs`
- Documentation for Photo post
- Documentation for Photo Overlay post
- Documentation for Quote post
- Documentation for Link post
- Documentation for Chat post
- Documentation for Audio post
- Documentation for Video post

## 1.1.0

### Added
- Support for Ghost 0.5.5
- Featured post on `index.hbs`
- Photo post
- Photo Overlay post
- Quote post
- Link post
- Chat post
- Audio post
- Video post
- Overlay option for Photo post
- Meta tag for designer
- Class `.post--index` to post previews
- Class `.post--permalink` to post permalinks
- Class `.post--page` to page
- Documentation for Navigation
- Documentation for Links
- Documentation for Photo post
- Documentation for Photo Overlay post
- Documentation for Quote post
- Documentation for Link post
- Documentation for Chat post
- Documentation for Audio post
- Documentation for Video post

### Fixed
- Missing `data-ani` attribute on `post.hbs`
- Social Shares total showing `x`, before rendering
- Whitespace on `.post-title` and `.post-tags`
- Unused attributes and classes
- IE9 fix for Post cover header background
- Documentation for Shares
- Empty elements that can't be handled with template logic
- Font weights

### Removed
- Documentation for embed codes
- Support for embed codes

## 1.0.4

### Added
- `page.hbs` now supports media

### Fixed
- CSS Animations not supported on IE 9 or lower

## 1.0.3

### Added
- `config.hbs` ftw! Now handles configuration, dot notation style

### Fixed
- Instagram widget blocking `start` event if `access_token` unauthorised

## 1.0.2

### Removed
- Disqus API requirements. Now uses the standard implementation

### Fixed
- Google analytics not registering for certain account types
- Disqus Comments Counts not returning a value

## 1.0.1

### Added
- Google Analyics
- Theme credits

### Fixed
- Widgets with no config object silently fail, but don't block `start` event
- Media queries revised

## 1.0.0

### Added
- Initial release
