#### Build

[gulp.js](http://gulpjs.com/) handles the build process. To start the compile and watch processes, run the following command:

```javascript
gulp
```

To compile assets, run the following command:

```javascript
gulp compile
```

To compile minified assets, run the following command:

```javascript
gulp minify
```

To watch the assets for changes and refresh the browser, run the following command:

```javascript
gulp watch
```

#### Handlebars

[Handlebars](https://github.com/assemble/handlebars-helpers) is used serverside by Ghost to render markup. Partials / Templates are used to render various pages of the theme.

| Template          | Notes                      |
|-------------------|----------------------------|
| `author.hbs`      | Author Index               |
| `default.hbs`     | Base Layout                |
| `page.hbs`        | Static Page                |
| `post.hbs`        | Single Post                |
| `tag.hbs`         | Tag Index                  |


###### Partials

[`src/partials/*.hbs`](partials/) are included by the template `default.hbs`.

| Partial                |  Notes                      |
|------------------------|-----------------------------|
| `config.hbs`           | User's Configuration        |
| `credits.hbs`          | Theme Credits               |
| `description.hbs`      | Blog Description            |
| `disqus.hbs`           | Disqus                      |
| `dribbble.hbs`         | Dribbble Shots              |
| `google-analytics.hbs` | Google Analytics            |
| `highlight-js.hbs`     | Highlight JS                |
| `instagram.hbs`        | Instagram Photos            |
| `links.hbs`            | Social Links                |
| `logo.hbs`             | Blog Logo                   |
| `nagivation.hbs`       | Navigation Links            |
| `pagination.hbs`       | Pagination Links            |
| `post.hbs`             | Post                        |
| `tagged.hbs`           | Tagged Links                |
| `title.hbs`            | Blog Title                  |

###### Post Partials

[`src/partials/post/*.hbs`](partials/post/) are included by the partial `post.hbs`.

| Partial              |  Notes                                                       |
|----------------------|--------------------------------------------------------------|
| `author.hbs`         | Post Author Details                                          |
| `comments-count.hbs` | Post Comments Count                                          |
| `comments.hbs`       | Post Comments                                                |
| `date.hbs`           | Post Published Date                                          |
| `excerpt.hbs`        | Post Excerpt ( Audio, Photo, Text, Video Post Types Only )   |
| `media.hbs`          | Post Media ( Audio, Photo, Video Post Types Only )           |
| `more.hbs`           | Post Read More ( Audio, Photo, Text, Video Post Types Only ) |
| `shares-count.hbs`   | Post Shares Count                                            |
| `shares.hbs`         | Post Shares Links                                            |
| `tags.hbs`           | Post Tags / Keywords                                         |
| `title.hbs`          | Post Title ( Audio, Photo, Text, Video Post Types Only )     |
| `types.hbs`          | Post Types ( Chat, Link, Quote Post Types Only )             |


#### Less

[LESS](http://lesscss.org/) is used to generate the CSS. The theme CSS is split into two areas, [`src/less/layout.less`](src/less/layout.less) and [`src/less/skin-default.less`](src/less/skin-default.less).

Class names losely follow the [BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) methodology.

| Block   | Element           | Block Modifier              | 
|---------|-------------------|-----------------------------|
| `.post` | `.post-header`    | `.post--overlay`            |

###### Base

[`src/less/base/*.less`](src/less/base/) contains styles for default DOM elements.

###### Block

[`src/less/block/*.less`](src/less/block/) is an abstract style that is reusable in multiple areas of the layout. 

###### Config

[`src/less/config/*.less`](src/less/config/) is used in tandom with either [`src/less/layout.less`](src/less/layout.less) or [`src/less/skin-default.less`](src/less/skin-default.less). 

###### Layout

[`src/less/layout/*.less`](src/less/layout/) handles a specific part of the layout. It takes control of any child blocks and handles how the blocks adjust, via media queries.

###### Skin

[`src/less/skin/*.less`](src/less/skin/) handles the skin styles of either the base, a block or the layout.

#### Javascript

[jQuery](http://jquery.com/) is the only requirement the build process doesn't fulfill. This is included via the template tag `{{ghost_foot}}`.

DOM elements used within the core, are selected using `data-js`. DOM element that are required by a module, are prefixed with the module name. Example module `share` will require a DOM element with the data attribute `data-js="share"`.

###### Core

[`src/js/core.js`](src/js/core.js) uses [browserify](http://browserify.org/) to piece together the themes features. The core consists of one method `start( options )`. This requires an object to be populated in [`partials/config.hbs`](partials/config.hbs). This object is then merged into [`src/js/config.json`](src/js/config.json), to allow input from the outside world.

###### Directives

[`src/js/directives/*.js`](src/js/directive/) are objects that instruct the template engine, [transparency](https://github.com/leonidas/transparency), the data to render onto a specific DOM element. 

###### Helpers

[`src/js/helper/*.js`](src/js/helpers/) are helper methods used in various places around the core.

###### Modules

[`src/js/modules/*.js`](src/js/modules/) are objects that take care of one specific feature. Each module has a [`$.Deferred()`](http://api.jquery.com/category/deferred-object/) object.

The two consistant methods for each module are `create()` and `start()`.  `create()` creates an instance of the module, while `start()` acts as a controller for the instance and also resolves `*.$deferred()`.
