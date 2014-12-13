###Hoar

[![LICENSE](http://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/rootslab/hoar#mit-license)
[![NPM VERSION](http://img.shields.io/npm/v/hoar.svg)](https://www.npmjs.org/package/hoar)
[![CODECLIMATE](https://codeclimate.com/github/rootslab/hoar/badges/gpa.svg)](https://codeclimate.com/github/rootslab/hoar)
[![CODECLIMATE-TEST-COVERAGE](https://codeclimate.com/github/rootslab/hoar/badges/coverage.svg)](https://codeclimate.com/github/rootslab/hoar)

[![TRAVIS CI BUILD](http://img.shields.io/travis/rootslab/hoar.svg)](http://travis-ci.org/rootslab/hoar)
[![BUILD STATUS](http://img.shields.io/david/rootslab/hoar.svg)](https://david-dm.org/rootslab/hoar)
[![DEVDEPENDENCY STATUS](http://img.shields.io/david/dev/rootslab/hoar.svg)](https://david-dm.org/rootslab/hoar#info=devDependencies)

[![status](https://sourcegraph.com/api/repos/github.com/rootslab/hoar/.badges/status.png)](https://sourcegraph.com/github.com/rootslab/hoar)
[![views](https://sourcegraph.com/api/repos/github.com/rootslab/hoar/.counters/views.png)](https://sourcegraph.com/github.com/rootslab/hoar)
[![views 24h](https://sourcegraph.com/api/repos/github.com/rootslab/hoar/.counters/views-24h.png)](https://sourcegraph.com/github.com/rootslab/hoar)
[![NPM DOWNLOADS](http://img.shields.io/npm/dm/hoar.svg)](http://npm-stat.com/charts.html?package=hoar)
[![GITTIP](http://img.shields.io/gittip/rootslab.svg)](https://www.gittip.com/rootslab/)

[![NPM GRAPH1](https://nodei.co/npm-dl/hoar.png)](https://nodei.co/npm/hoar/)

[![NPM GRAPH2](https://nodei.co/npm/hoar.png?downloads=true&stars=true)](https://nodei.co/npm/hoar/)

> **_Hoar_**, a light semantic versioning parser/comparator.

> A **_semantic version_**, or **_semver_**, is described by the **v2.0.0** specification found at __http://semver.org/__ or at this __[github repo](https://github.com/mojombo/semver/blob/master/semver.md)__.

###Install

```bash
$ npm install hoar [-g]
// clone repo
$ git clone git@github.com:rootslab/hoar.git
```

> __require__ returns an helper hash/obj.

```javascript
var Hoar  = require( 'hoar' );
```

###Run Tests

```bash
$ cd hoar/
$ npm test
```

###Sample Usage

> See [examples](example/).


###Methods

> Arguments within [ ] are optional, '|' indicates multiple type for an argument.

```javascript
/*
 * Compare 2 versions with a condition.
 * A version could be also specified through an Array like: [ 1, 0, 0 ].
 * Following conditions are supported: '=', '<', '>', '<=', '>=', '<>'
 *
 * NOTE: it is compliant with all precedence rules specified in the
 * "Semver 2.0" specification.
 */
Hoar#compare( String version1 | Array semver1, String version2 | Array semver2, String condition ) : Boolean

/*
 * Some #compare shortcuts for '=', '<', '>', '<=', '>=', '<>'
 */
Hoar#eq( String v1 | Array semver1, String v2 | Array semver2 ) : Boolean

Hoar#lt( String v1 | Array semver1, String v2 | Array semver2 ) : Boolean

Hoar#gt( String v1 | Array semver1, String v2 | Array semver2 ) : Boolean

Hoar#lte( String v1 | Array semver1, String v2 | Array semver2 ) : Boolean

Hoar#gte( String v1 | Array semver1, String v2 | Array semver2 ) : Boolean

Hoar#neq( String v1 | Array semver1, String v2 | Array semver2 ) : Boolean

/*
 * Check if a version, or a list of versions, is/are between a range.
 * The range is specified as a 2-element Array; elements respectively
 * represent the lower and the higher bounds for a version range.
 *
 * NOTE: for default, strict ('<','>') operators are used for range
 * comparisons, optionally you can use the 'nostrict' option:
 *
 * - 0, for range[ 0 ] <  version <  range[ 1 ]
 * - 1, for range[ 0 ] <= version <  range[ 1 ]
 * - 2, for range[ 0 ] <  version <= range[ 1 ]
 * - 3, for range[ 0 ] <= version <= range[ 1 ]
 */
Hoar#range( String version | Array versions, Array range [, Number nostrict [, Boolean debug ] ] ) : Boolean

/*
 * Parse a version string, optionally specifying an array for result,
 * and/or a filter function to be applied to every identifier.
 * It splits the string into a nested Array containing all elements
 * parsed.
 *
 * NOTE: For default filter function gets the current string parsed and
 * removes all non alpha-numeric chars, then convert a string representation
 * of a number to a Number.
 *
 * Example:
 *
 * A call to parse produces a list of 1 or 2 arrays, the first containing
 * the normal version identifiers, the second containing pre-release
 * identifiers, if any exist ( sub-string after '-' ).
 * List of identifiers about build meta data ( sub-string after '+' ),
 * will be pushed to the 'normal version' or 'pre-release version' array.
 *
 * parse( "1.0.1-pre.1.x+build001" );
 *
 * [ [ 1, 0, 1 ], [ 'pre', 1,'x', [ 'build001' ] ] ]
 *
 */
Hoar#parse( String version [, Array result [, Function filter ] ] ) : Array

/*
 * printing infos about a #parse result: Hoar.print( Hoar.parse( '..' ) );
 */
Hoar#print( Array semver ) : undefined


```

------------------------------------------------------------------------


### MIT License

> Copyright (c) 2014 &lt; Guglielmo Ferri : 44gatti@gmail.com &gt;

> Permission is hereby granted, free of charge, to any person obtaining
> a copy of this software and associated documentation files (the
> 'Software'), to deal in the Software without restriction, including
> without limitation the rights to use, copy, modify, merge, publish,
> distribute, sublicense, and/or sell copies of the Software, and to
> permit persons to whom the Software is furnished to do so, subject to
> the following conditions:

> __The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.__

> THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
> MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
> IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
> CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
> TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
> SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[![GA](https://ga-beacon.appspot.com/UA-53998692-1/hoar/Readme?pixel)](https://github.com/igrigorik/ga-beacon)
