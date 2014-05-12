/*
 * Hoar range with array of version strings test
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
    , a1 = [ v2 ]
    , a2 = [ v2, v3 ]
    , a3 = [ v1, v2, v6 ]
    ;

log( '- check some range results, also with pre-releases. (%d tests)', 14 );
 
log( '\n- range: %s <= %j <= %s \n- expected: %s', v1, a1, v6, true );
equal( range( a1, [ v1, v6 ], 3, true ), true );

log( '\n- range: %s <= %j <= %s \n- expected: %s', v1, a2, v6, false );
equal( range( a2, [ v1, v6 ], 3, true ), false );

log( '\n- range: %s <= %j <= %s \n- expected: %s', v1, a2, v3, true );
equal( range( a2, [ v1, v3 ], 3, true ), true );

log( '\n- range: %s < %j <= %s \n- expected: %s', v1, a2, v3, true );
equal( range( a2, [ v1, v3 ], 2, true ), true );

log( '\n- range: %s <= %j < %s \n- expected: %s', v1, a2, v3, false );;
equal( range( a2, [ v1, v3 ], 1, true ), false );

log( '\n- range: %s <= %j <= %s \n- expected: %s', v4, a3, v6, true );
equal( range( a3, [ v4, v6 ], 3, true ), true );

log( '\n- range: %s < %j < %s \n- expected: %s', v4, a3, v3, true );
equal( range( a3, [ v4, v3 ], 0, true ), true );