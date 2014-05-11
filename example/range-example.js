/*
 * Hoar range example
 */

var log = console.log
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

log ( v1, '<', v2, '<', v3, range( v2, [ v1, v3 ] ) );
log ( v1, '<=', v2, '<', v3, range( v2, [ v1, v3 ], 1 ) );
log ( v1, '<', v2, '<=', v3, range( v2, [ v1, v3 ], 2 ) );
log ( v1, '<=', v2, '<=', v3, range( v2, [ v1, v3 ], 3 ) );

log ( v2, '<', v2, '<', v3, range( v2, [ v2, v3 ] ) );
log ( v2, '<=', v2, '<', v3, range( v2, [ v2, v3 ], 1 ) );
log ( v2, '<', v2, '<=', v3, range( v2, [ v2, v3 ], 2 ) );
log ( v2, '<=', v2, '<=', v3, range( v2, [ v2, v3 ], 3 ) );

log ( v5, '<', v5, '<', Infinity, range( v5, [ v5 ], 2 ) );

log ( -Infinity, '<', v5, '<=', v6, range( v5, [ undefined, v6 ], 2 ) );
log ( -Infinity, '<', v5, '<', Infinity, range( v5, [] ) );

log ( v4, '<', v5, '<', v6, range( v5, [ v4, v6 ] ) );