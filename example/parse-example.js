/* 
 * Hoar parse example
 */

var log = console.log
    , util = require( 'util' )
    , Hoar = require( '../' )
    , parse = Hoar.parse
    // a list of semver strings
    , ver = [
        '1.0.1'
        , '0.1.0+build.01.x.14'
        , '10.0.8-dev.89.78+10.build.alpha.10'
        , '10.0.8+èé€¸ùmééet##a°Ł#build.x.y.10.10-dev.890.000'
        , '10.0.8+meta.build.x.y.10.10-dev.890.000'
        , '10.0.8-dev.89.78.bah.x.z'
    ]
    , vlen = ver.length
    , v = ver[ 0 ]
    , i = 0
    ; 

for ( ; i < vlen; v = ver[ ++i ] ) {
    log( ' \n- item: %s \n- parsed:\n %s'
         , util.inspect( v, false, 1, true )
         , util.inspect( parse( v ), false, 2, true )
        );
    Hoar.print( parse( v ) );
};