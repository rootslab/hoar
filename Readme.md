###Hoar
[![build status](https://secure.travis-ci.org/rootslab/hoar.png?branch=master)](http://travis-ci.org/rootslab/hoar) 
[![NPM version](https://badge.fury.io/js/hoar.png)](http://badge.fury.io/js/hoar)

[![NPM](https://nodei.co/npm/hoar.png?downloads=true&stars=true)](https://nodei.co/npm/hoar/)

[![NPM](https://nodei.co/npm-dl/hoar.png)](https://nodei.co/npm/hoar/)

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

> Arguments within [ ] are optional.

```javascript
/*
 * Compare 2 versions with a condition.
 * Following conditions are supported: '=', '<', '>', '<=', '>=', '<>'
 */
Hoar#compare( String version1, String version2, String condition ) : Boolean

/*
 * Parse a version string, optionally specifying an array for result,
 * and/or a filter function to be applied to every identifier.
 * It splits the string into a nested Array containing all elements
 * parsed.
 *
 * Example:
 *
 * A call to parse produces a list of 1 or 2 arrays, the first containing
 * the normal version identifiers, the second containing pre-release
 * identifiers, if any exist ( sub-string after '-' ).
 * List of identifiers about build meta data ( sub-string after '+' ),
 * was pushed to the normal or pre-release version array.
 *
 * parse( "1.0.1-pre.1.x+build001" );
 *
 * [ [ 1, 0, 1 ], [ 'pre', 1,'x', [ 'build001' ] ] ]
 *
 */
Hoar#parse( String version [, Array result [, Function filter ] ] ) : Array

/*
 * logging info about a #parse result: Hoar.print( Hoar.parse( '..' ) );
 */
Hoar#print( Array ) : undefined
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
> SOFTWARE OR THE USE OR OTHER DEALINGS IN T