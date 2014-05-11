/*
 * Hoar compare example
 */

var log = console.log
    , util = require( 'util' )
    , Hoar = require( '../' )
    , compare = Hoar.compare
    // a list of numeric strings
    ver = [
        '10.0.30'
        , '100.1.1'
        , '0.0.1'
        , '0.1.0'
        , '0.0.0'
        , '100.1.1'
        , '100.1.0'
    ]
    , vlen = ver.length
    , cond = [ '<', '>', '<=', '>=', '=' ]
    , clen = cond.length
    , v = ver[ 0 ]
    , i = 0
    , j = 0
    , k = 0
    , t = 0
    ;

// run all possible comparisons
for ( ; i < vlen; j = ++i ) {
    for ( ; j < vlen; ++j ) {
        for ( c = 0; c < clen; ++c ) {
            log( '#%d (%d,%d):', ++k, i, j,
                ver[ i ], cond[ c ], ver[ j ],
                compare( ver[ i ], ver[ j ], cond[ c ] )
            );
        };
    };
};