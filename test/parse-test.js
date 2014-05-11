/*
 * Hoar parse test
 */

var log = console.log
    , assert = require( 'assert' )
    , util = require( 'util' )
    , Hoar = require( '../' )
    , parse = Hoar.parse
    ;


log( '- check #parse results with null values (%d tests).', 3 );

assert.deepEqual( parse( null ), parse( '0.0.0' ) );
assert.deepEqual( parse( NaN ), parse( '0.0.0' ) );
assert.deepEqual( parse( undefined ), parse( '0.0.0' ) );

log( '- check #parse results with some weird values (%d tests).', 14 );

assert.deepEqual( parse( '' ), parse( '0.0.0' ) );
assert.deepEqual( parse( '.' ), parse( '0.0.0' ) );
assert.deepEqual( parse( '..' ), parse( '0.0.0' ) );
assert.deepEqual( parse( '1..' ), parse( '1.0.0' ) );
assert.deepEqual( parse( '.1.' ), parse( '0.1.0' ) );
assert.deepEqual( parse( '..1' ), parse( '0.0.1' ) );
assert.deepEqual( parse( '1..2' ), parse( '1.0.2' ) );
assert.deepEqual( parse( '1.2.' ), parse( '1.2.0' ) );
assert.deepEqual( parse( '.1.2' ), parse( '0.1.2' ) );
assert.deepEqual( parse( '1.2' ), parse( '1.2.0' ) );
assert.deepEqual( parse( '1.' ), parse( '1.0.0' ) );
assert.deepEqual( parse( '.1' ), parse( '0.1.0' ) );
assert.deepEqual( parse( '1' ), parse( '1.0.0' ) );
assert.deepEqual( parse( '1.2.3' ), parse( '1.2.3' ) );

log( '- check #parse results with leading 0s (%d tests).', 17 );

assert.deepEqual( parse( '0' ), parse( '0.0.0' ) );
assert.deepEqual( parse( '0.' ), parse( '0.0.0' ) );
assert.deepEqual( parse( '.0' ), parse( '0.0.0' ) );
assert.deepEqual( parse( '..0' ), parse( '0.0.0' ) );
assert.deepEqual( parse( '.0.' ), parse( '0.0.0' ) );
assert.deepEqual( parse( '00' ), parse( '0.0.0' ) );
assert.deepEqual( parse( '00.' ), parse( '0.0.0' ) );
assert.deepEqual( parse( '.00' ), parse( '0.0.0' ) );
assert.deepEqual( parse( '..00' ), parse( '0.0.0' ) );
assert.deepEqual( parse( '.00.' ), parse( '0.0.0' ) );
assert.deepEqual( parse( '0.0.' ), parse( '0.0.0' ) );
assert.deepEqual( parse( '0.0.0' ), parse( '0.0.0' ) );
assert.deepEqual( parse( '0.0.1' ), parse( '0.0.1' ) );
assert.deepEqual( parse( '000' ), parse( '0.0.0' ) );
assert.deepEqual( parse( '000.000.' ), parse( '0.0.0' ) );
assert.deepEqual( parse( '0001.0002.0003' ), parse( '1.2.3' ) );
assert.deepEqual( parse( '00100.0010.000100' ), parse( '100.10.100' ) );
