/*
 * Hoar shortcuts test
 */
var log = console.log
    , assert = require( 'assert' )
    , equal = assert.equal
    , util = require( 'util' )
    , Hoar = require( '../' )
    , compare = Hoar.compare
    , eq = Hoar.eq
    , gt = Hoar.gt
    , gte = Hoar.gte
    , lt = Hoar.lt
    , lte = Hoar.lte
    , neq = Hoar.neq
    ;

log( '- check results for #compare shortcuts methods. (%d tests)', 6 );

log( '- testing equality with #eq.' );
equal( eq( '1.0.0+54-dev.1.2.3', '1.0.0+56-dev.1.2.3' ), compare( '1.0.0+54-dev.1.2.3', '1.0.0+56-dev.1.2.3', '=' ) );

log( '- testing greater than with #gt.' );
equal( gt( '1.0.0', '1.0.0' ), compare( '1.0.0', '1.0.0', '>' ) );

log( '- testing greater than or equality with #gte.' );
equal( gte( '1.0.0', '1.0.0' ), compare( '1.0.0', '1.0.0', '>=' ) );

log( '- testing less than with #lt.' );
equal( lt( '1.0.0', '1.0.0+build' ), compare( '1.0.0', '1.0.0+build', '<' ) );

log( '- less than or equal with #lte.' );
equal( lte( '1.0.0-dev1', '1.0.0' ), compare( '1.0.0-dev1', '1.0.0', '<=' ) );

log( '- inequality with #neq.' );
equal( neq( '1.0.0+-', '1.0.0' ), compare( '1.0.0+-', '1.0.0', '<>' ) );