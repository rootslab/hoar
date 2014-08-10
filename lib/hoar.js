/*
 * Hoar, a light semantic versioning parser/comparator.
 *
 * Copyright(c) 2014 Guglielmo Ferri <44gatti@gmail.com>
 * MIT Licensed
 */

exports.version = require( '../package' ).version;
exports.Hoar = ( function () {
    var log = console.log
        , isArray = Array.isArray
        , alpha = /[^a-z0-9]/gi
        , num = /[^0-9]/g
        , abs = Math.abs
        , max = Math.max
        , min = Math.min
        , echoFn = function( v ) { return v; }
        , clear = function ( n ) {
            var k = n.replace( alpha, '' );
            n = +k;
            return isNaN( n ) ? k : abs( n );
        }
        , split = function ( ver, filter, length, char ) {
            var str = String( ver )
                , c = ( typeof char === 'string' ) ? c[ 0 ] : '.'
                , fn = ( typeof filter === 'function' ) ? filter : echoFn
                , slen = str.length
                , i = 0
                , p = 0
                , k = 0
                , result = []
                , len = isNaN( + length ) ? 0 : min( length, 256 )
                ;
            do {
                if ( str[ i ] === c ) {
                    result[ p++ ] = fn( str.slice( k, i ) );
                    k = i + 1;
                }
            } while ( ++i <= slen );
            // last element
            result[ p ] = fn( str.slice( k ) );
            // fill missing section with 0s
            while ( ++p < len ) result[ p ] = 0;
            return result;
        }
        , parse = function ( str, arr, filter, length ) {
            var entries = str ? String( str ).split( '-' ) : [ '' ]
                , elen = entries.length
                , rel = null
                , r = entries[ 0 ]
                , p = entries[ 1 ]
                , h = null
                , k = null
                , len = length || 3
                , result = isArray( arr ) ? arr : []
                , fn = typeof filter === 'function' ? filter : clear
                ;

            if ( elen ^ 2 || p === '' || p === '+' ) {
                // no pre-release
                k = r.split( '+' );
                if ( k.length ^ 2 || k[ 1 ] === '' ){
                    // no build
                    result.push( split( k[ 0 ], fn, len ) );
                    return result;
                }
                h = split( k[ 0 ], fn );
                // push build results into the current array
                h.push( split( k[ 1 ], fn ) );
                result.push( h );
                return result;
            }
            // release
            parse( r, result, fn, 3 );
            // pre-release
            parse( p, result, fn, 1 );
            return result;
        }
        , print = function ( arr ) {
            var v = arr[ 0 ]
                , p = arr[ 1 ]
                , search = function ( arr, pre ) {
                    var list = isArray( arr ) ? arr : []
                        , len = list.length
                        , l = null
                        , t = pre ? 'pre ' : ''
                        , i = 0
                        ;
                    while ( len ) {
                        l = list[ i ];
                        if ( isArray( l ) ) {
                           log( '- %sversion:', t, list.slice( 0, i ).join( '.' ) );
                           log( '- %sversion build:', t, l.join( '.' ) );
                           break;
                        }
                        if ( ++i === len ) {
                            log( '- %sversion:', t, list.join( '.' ) );
                            break;
                        }
                    }
                }
                ;
            log( '\n- input:', arr );
            search( v );
            search( p, true );
        }
        // normal version
        , check = function ( version1, version2, condition ) {
            var v1 = version1 || [ NaN, NaN, NaN ]
                , v2 = version2 || [ NaN, NaN, NaN ]
                , cond = condition || '='
                ;

            switch ( cond ) {
                case '<=':
                    if ( v1[ 0 ] > v2[ 0 ] ) {
                        return false;
                    }
                    if ( v1[ 0 ] < v2[ 0 ] ) {
                        return true;
                    }
                    if ( v1[ 1 ] < v2[ 1 ] ) {
                        return true;
                    }
                    if ( v1[ 1 ] > v2[ 1 ] ) {
                        return false;
                    }
                    if ( v1[ 2 ] > v2[ 2 ] ) {
                        return false;
                    }
                    return true;
                case '>=':
                    if ( v1[ 0 ] < v2[ 0 ] ) {
                        return false;
                    }
                    if ( v1[ 0 ] > v2[ 0 ] ) {
                        return true;
                    }
                    if ( v1[ 1 ] < v2[ 1 ] ) {
                        return false;
                    }
                    if ( v1[ 1 ] > v2[ 1 ] ) {
                        return true;
                    }
                    if ( v1[ 2 ] < v2[ 2 ] ) {
                        return false;
                    }
                    return true;
                case '>':
                    if ( v1[ 0 ] > v2[ 0 ] ) {
                        return true;
                    }
                    if ( v1[ 0 ] < v2[ 0 ] ) {
                        return false;
                    }
                    if ( v1[ 1 ] > v2[ 1 ] ) {
                        return true;
                    }
                    if ( v1[ 1 ] < v2[ 1 ] ) {
                        return false;
                    }
                    if ( v1[ 2 ] > v2[ 2 ] ) {
                        return true;
                    }
                    return false;
                case '<':
                    if ( v1[ 0 ] < v2[ 0 ] ) {
                        return true;
                    }
                    if ( v1[ 0 ] > v2[ 0 ] ) {
                        return false;
                    }
                    if ( v1[ 1 ] < v2[ 1 ] ) {
                        return true;
                    }
                    if ( v1[ 1 ] > v2[ 1 ] ) {
                        return false;
                    }
                    if ( v1[ 2 ] < v2[ 2 ] ) {
                        return true;
                    }
                    return false;
                case '=':
                    return ( v1[ 0 ] === v2[ 0 ] ) &&
                        ( v1[ 1 ] === v2[ 1 ] ) &&
                        ( v1[ 2 ] === v2[ 2 ] )
                        ;
                case '<>':
                    return ( v1[ 0 ] !== v2[ 0 ] ) ||
                        ( v1[ 1 ] !== v2[ 1 ] ) ||
                        ( v1[ 2 ] !== v2[ 2 ] )
                        ;
            }
        }
        , answer = function ( op, bool ) {
            switch ( op ) {
                case '<>':
                    return true;
                case '=':
                    return false;
                case '<':
                case '<=':
                    return ! bool;
                break;
                default:
                    return bool;
            }
        }
        /*
         * Precedence for two pre-release versions with 
         * the same major, minor, and patch version MUST
         * be determined by comparing each dot separated
         * identifier from left to right until a difference
         * is found as follows: 
         *
         * - Identifiers consisting of only digits are compared
         *   numerically.
         * - Identifiers with letters or hyphens are compared
         *   lexically in ASCII sort order.
         * - Numeric identifiers always have lower precedence
         *   than non-numeric identifiers.
         * - A larger set of pre-release fields has a higher
         *   precedence than a smaller set, if all of the
         *   preceding identifiers are equal.
         *
         * Example:
         * 1.0.0-alpha < 1.0.0-alpha.1 < 1.0.0-alpha.beta <
         * 1.0.0-beta < 1.0.0-beta.2 < 1.0.0-beta.11 < 1.0.0-rc.1 < 1.0.0.
         *
         * http://semver.org
         * https://github.com/mojombo/semver/blob/master/semver.md
         */
        , checkPre = function ( pv, pw, cond ) {
            var c = cond
                , pvlen = pv.length
                , pwlen = pw.length
                , lmin = min( pvlen, pwlen )
                , lmax = max( pvlen, pwlen )
                , offset = lmax - lmin
                , i = 0
                , pvnum = NaN
                , pwnum = NaN
                , pvtype = null
                , pwtype = null
                , f = true
                ;
            for ( ; i < lmin; ++i ) {
                pvnum = isNaN( + pv[ i ] ) ? pv[ i ] : + pv[ i ];
                pwnum = isNaN( + pw[ i ] ) ? pw[ i ] : + pw[ i ];
                pvtype = typeof pv[ i ];
                pwtype = typeof pw[ i ];
                /*
                 * check identifiers types, could be number
                 * or string, number has lower precedence.
                 */
                // if true ? v > w : v < w
                if ( pvtype !== pwtype ) return answer( c, pvtype === 'string' ? true : false );
                // same type
                if ( pvnum === pwnum ) {
                    if ( i < lmin - 1 ) continue;
                    /*
                     * Last item, check the offset between versions
                     * lengths, when two strings are equal, the 
                     * larger one has higher precedence.
                     * If answer is true ? v > w : v < w.
                     */
                    return offset ?
                           answer( c, pvlen > pwlen ) :
                           ~ c.indexOf( '=' ) ? true : false
                           ;
                }
                // number and string comparison
                switch ( c ) {
                    case '<>':
                        f = true;
                    break;
                    case '=':
                        f = false;
                    break;
                    case '<':
                    case '<=':
                        f = pvnum < pwnum;
                    break;
                    case '>':
                    case '>=':
                        f = pvnum > pwnum;
                    break;
                }
                break;
            }
            return f;
        }
        , compare = function ( ver1, ver2, cond ) {
            var v = ver1
                , w = ver2
                , vlen = 0
                , wlen = 0
                , c = cond || '='
                ;
            if ( ! isArray( v ) ) {
                v = parse( v );
            } else {
                v = v.slice( 0, 2 );
            }
            if ( ! isArray( w ) ) {
                w = parse( w );
            } else {
                w = w.slice( 0, 2 );
            }

            vlen = v.length;
            wlen = w.length;

            // compare only primary versions
            if ( vlen === 1 && wlen === 1 ) return check( v[ 0 ], w[ 0 ], c );
            /*
             * pre-release present, first compare if
             * primary versions are equal, otherwise
             * skip further comparisons.
             */
            if ( check( v[ 0 ], w[ 0 ], '=' ) ) {
                // check if both pre-releases are present
                if ( vlen === 2 && wlen === 2 ) return checkPre( v[ 1 ], w[ 1 ], c );
                // if true ? v > w : v < w
                return answer( c, ( vlen === 1 ) && ( wlen === 2 ) );
            }
            // versions are not equal, compare only primary versions
            return ( c === '=' ) ? false : check( v[ 0 ], w[ 0 ], c );
        }
        ;

    return {
        compare : compare
        , eq : function ( v, w ) {
            return compare( v, w, '=' );
        }
        , gt : function ( v, w ) {
            return compare( v, w, '>' );
        }
        , gte : function ( v, w ) {
            return compare( v, w, '>=' );
        }
        , lt : function ( v, w ) {
            return compare( v, w, '<' );
        }
        , lte : function ( v, w ) {
            return compare( v, w, '<=' );
        }
        , neq : function ( v, w ) {
            return compare( v, w, '<>' );
        }
        , parse : parse
        , print : print
        , range : function ( values, vrange, nostrict, verbose ) {
            var v = isArray( values ) ? values : [ values ]
                , vlen = v.length
                , vr = isArray( vrange ) ? vrange : []
                , r1 = vr[ 0 ] || - Infinity
                , r2 = vr[ 1 ] || +Infinity
                , maj = '>'
                , min = '<'
                , i = 0
                ;
            switch ( nostrict ) {
                case 3:
                    maj += '=';
                case 2:
                    min += '=';
                break;
                case 1:
                    maj += '=';
                break;
            }
            for ( ; i < vlen; ++i ) {
                if ( verbose ) {
                    log( v[ i ], maj, r1, compare( v[ i ], r1, maj ) );
                    log( v[ i ], min, r2, compare( v[ i ], r2, min ) );
                }
                if ( compare( v[ i ], r1, maj ) && compare( v[ i ], r2, min ) ) continue;
                return false;
            }
            return !!i;
        }
    };

} )();