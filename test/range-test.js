/*
 * Hoar range test
 */

var log = console.log
    , assert = require( 'assert' )
    , equal = assert.equal
    , util = require( 'util' )
    , Hoar = require( '../' )
    , range = Hoar.range
    , v1 = '0.8.0'
    , v2 = '1.1.0'
    , v3 = '2.0.0'
    , v4 = '0.8.0-dev01.40'
    , v5 = '0.8.1-dev01.100'
    , v6 = '2.0.0-pre'
    ;

log( '- check some range results, also with pre-releases. (%d tests)', 14 );

equal( range( v2, [ v1, v3 ] ), true );
equal( range( v2, [ v2, v3 ], 1 ), true );
equal( range( v2, [ v2, v3 ] ), false );

equal( range( v2, [ v2, v3 ] ), false );
equal( range( v2, [ v2, v3 ], 1 ), true );
equal( range( v2, [ v2, v3 ], 2 ), false );
equal( range( v2, [ v2, v3 ], 3 ), true );

equal( range( v5, [ v5 ] ), false );
equal( range( v5, [ v5 ], 1 ), true );
equal( range( v5, [ v5 ], 2 ), false );
equal( range( v5, [ v5 ], 3 ), true );

equal( range( v5, [ undefined, v6 ] ), true );
equal( range( v5, [] ), true );

equal( range( v5, [ v4, v6 ] ), true );
