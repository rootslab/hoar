/*
 * Hoar compare simple test
 */

var log = console.log
    , assert = require( 'assert' )
    , equal = assert.equal
    , util = require( 'util' )
    , Hoar = require( '../' )
    , compare = Hoar.compare
    ;

log( '- check comparison results of a version with itself. (%d tests)', 15 );

equal( compare( '1.0.0', '1.0.0', '>' ), false );
equal( compare( '1.0.0', '1.0.0', '>=' ), true );
equal( compare( '1.0.0', '1.0.0', '=' ), true );
equal( compare( '1.0.0', '1.0.0', '<=' ), true );
equal( compare( '1.0.0', '1.0.0', '<' ), false );

equal( compare( '1.1.1', '1.1.1', '>' ), false );
equal( compare( '1.1.1', '1.1.1', '>=' ), true );
equal( compare( '1.1.1', '1.1.1', '=' ), true );
equal( compare( '1.1.1', '1.1.1', '<=' ), true );
equal( compare( '1.1.1', '1.1.1', '<' ), false );

equal( compare( '1.1.2', '1.1.2', '>' ), false );
equal( compare( '1.1.2', '1.1.2', '>=' ), true );
equal( compare( '1.1.2', '1.1.2', '=' ), true );
equal( compare( '1.1.2', '1.1.2', '<=' ), true );
equal( compare( '1.1.2', '1.1.2', '<' ), false );

log( '- run comparisons between normal versions. (%d tests)', 10 );

equal( compare( '1.0.0', '1.0.2', '>' ), false );
equal( compare( '1.0.0', '1.0.2', '>=' ), false );
equal( compare( '1.0.0', '1.0.2', '=' ), false );
equal( compare( '1.0.0', '1.0.2', '<=' ), true );
equal( compare( '1.0.0', '1.0.2', '<' ), true );

equal( compare( '1.1.0', '1.1.2', '>' ), false );
equal( compare( '1.1.0', '1.1.2', '>=' ), false );
equal( compare( '1.1.0', '1.1.2', '=' ), false );
equal( compare( '1.1.0', '1.1.2', '<=' ), true );
equal( compare( '1.1.0', '1.1.2', '<' ), true );

log( '- compare a pre-release with a normal version. (%d tests)', 30 );

equal( compare( '1.0.0-dev1', '1.0.0', '<' ), true );
equal( compare( '1.0.0-dev1', '1.0.0', '<=' ), true );
equal( compare( '1.0.0-dev1', '1.0.0', '=' ), false );
equal( compare( '1.0.0-dev1', '1.0.0', '>=' ), false );
equal( compare( '1.0.0-dev1', '1.0.0', '>' ), false );

equal( compare( '1.0.0', '1.0.0-dev1', '>' ), true );
equal( compare( '1.0.0', '1.0.0-dev1', '>=' ), true );
equal( compare( '1.0.0', '1.0.0-dev1', '=' ), false );
equal( compare( '1.0.0', '1.0.0-dev1', '<=' ), false );
equal( compare( '1.0.0', '1.0.0-dev1', '<' ), false );

equal( compare( '1.1.2', '1.1.2-dev1', '>' ), true );
equal( compare( '1.1.2', '1.1.2-dev1', '>=' ), true );
equal( compare( '1.1.2', '1.1.2-dev1', '=' ), false );
equal( compare( '1.1.2', '1.1.2-dev1', '<=' ), false );
equal( compare( '1.1.2', '1.1.2-dev1', '<' ), false );

equal( compare( '1.1.1', '1.1.2-dev1', '>' ), false );
equal( compare( '1.1.1', '1.1.2-dev1', '>=' ), false );
equal( compare( '1.1.1', '1.1.2-dev1', '=' ), false );
equal( compare( '1.1.1', '1.1.2-dev1', '<=' ), true );
equal( compare( '1.1.1', '1.1.2-dev1', '<' ), true );

equal( compare( '1.1.3', '1.1.2-dev1', '>' ), true );
equal( compare( '1.1.3', '1.1.2-dev1', '>=' ), true );
equal( compare( '1.1.3', '1.1.2-dev1', '=' ), false );
equal( compare( '1.1.3', '1.1.2-dev1', '<=' ), false );
equal( compare( '1.1.3', '1.1.2-dev1', '<' ), false );

equal( compare( '1.3.1', '1.1.2-dev1', '>' ), true );
equal( compare( '1.3.1', '1.1.2-dev1', '>=' ), true );
equal( compare( '1.3.1', '1.1.2-dev1', '=' ), false );
equal( compare( '1.3.1', '1.1.2-dev1', '<=' ), false );
equal( compare( '1.3.1', '1.1.2-dev1', '<' ), false );

log( '- compare normal versions with a build meta. (%d tests)', 6 );

equal( compare( '1.0.0+build', '1.0.0', '=' ), true );
equal( compare( '1.0.0+build', '1.0.0', '<=' ), true );
equal( compare( '1.0.0+build', '1.0.0', '>=' ), true );
equal( compare( '1.0.0+build', '1.0.0', '<' ), false );
equal( compare( '1.0.0+build', '1.0.0', '>' ), false );
equal( compare( '1.0.0+build', '1.0.0', '<>' ), false );

log( '- run self-comparisons of a version with the same build . (%d tests)', 6 );

equal( compare( '1.0.0+build', '1.0.0+build', '=' ), true );
equal( compare( '1.0.0+build', '1.0.0+build', '<=' ), true );
equal( compare( '1.0.0+build', '1.0.0+build', '>=' ), true );
equal( compare( '1.0.0+build', '1.0.0+build', '<' ), false );
equal( compare( '1.0.0+build', '1.0.0+build', '>' ), false );
equal( compare( '1.0.0+build', '1.0.0+build', '<>' ), false );

log( '- run self-comparisons of a version with different builds . (%d tests)', 6 );

equal( compare( '1.0.0+build1', '1.0.0+build2', '=' ), true );
equal( compare( '1.0.0+build1', '1.0.0+build2', '<=' ), true );
equal( compare( '1.0.0+build1', '1.0.0+build2', '>=' ), true );
equal( compare( '1.0.0+build1', '1.0.0+build2', '<' ), false );
equal( compare( '1.0.0+build1', '1.0.0+build2', '>' ), false );
equal( compare( '1.0.0+build1', '1.0.0+build2', '<>' ), false );

log( '- run comparisons between pre-releases and normal version with build meta . (%d tests)', 6 );

equal( compare( '1.0.0-dev1', '1.0.0+build', '<' ), true );
equal( compare( '1.0.0-dev1', '1.0.0+build', '<=' ), true );
equal( compare( '1.0.0-dev1', '1.0.0+build', '=' ), false );
equal( compare( '1.0.0-dev1', '1.0.0+build', '>=' ), false );
equal( compare( '1.0.0-dev1', '1.0.0+build', '>' ), false );
equal( compare( '1.0.0-dev1', '1.0.0+build', '<>' ), true );

log( '- run comparisons between same pre-releases. (%d tests)', 6 );

equal( compare( '1.0.0-dev1.100', '1.0.0-dev1.100', '=' ), true );
equal( compare( '1.0.0-dev1.100', '1.0.0-dev1.100', '>' ), false );
equal( compare( '1.0.0-dev1.100', '1.0.0-dev1.100', '>=' ), true );
equal( compare( '1.0.0-dev1.100', '1.0.0-dev1.100', '<' ), false );
equal( compare( '1.0.0-dev1.100', '1.0.0-dev1.100', '<=' ), true );
equal( compare( '1.0.0-dev1.100', '1.0.0-dev1.100', '<>' ), false );

log( '- run comparisons between different pre-releases. (%d tests)', 6 );

equal( compare( '1.0.0-dev1.100', '1.0.0-dev1.101', '=' ), false );
equal( compare( '1.0.0-dev1.100', '1.0.0-dev1.101', '>' ), false );
equal( compare( '1.0.0-dev1.100', '1.0.0-dev1.101', '>=' ), false );
equal( compare( '1.0.0-dev1.100', '1.0.0-dev1.101', '<' ), true );
equal( compare( '1.0.0-dev1.100', '1.0.0-dev1.101', '<=' ), true );
equal( compare( '1.0.0-dev1.100', '1.0.0-dev1.101', '<>' ), true );


log( '- run comparisons between same base pre-releases, but with different lengths. (%d tests)', 6 );

equal( compare( '1.0.0-dev1.100', '1.0.0-dev1.100.123', '=' ), false );
equal( compare( '1.0.0-dev1.100', '1.0.0-dev1.100.123', '>' ), false );
equal( compare( '1.0.0-dev1.100', '1.0.0-dev1.100.123', '>=' ), false );
equal( compare( '1.0.0-dev1.100', '1.0.0-dev1.100.123', '<' ), true );
equal( compare( '1.0.0-dev1.100', '1.0.0-dev1.100.001', '<=' ), true );
equal( compare( '1.0.0-dev1.100', '1.0.0-dev1.100.001', '<=' ), true );

log( '- run comparisons between pre-releases, semver.org section 11 examples. (%d tests)', 14 );

equal( compare( '1.0.0-alpha', '1.0.0-alpha.1', '<' ), true );
equal( compare( '1.0.0-alpha', '1.0.0-alpha.1', '<>' ), true );
equal( compare( '1.0.0-alpha.1', '1.0.0-alpha.beta', '<' ), true );
equal( compare( '1.0.0-alpha.1', '1.0.0-alpha.beta', '<>' ), true );
equal( compare( '1.0.0-alpha.beta', '1.0.0-beta', '<' ), true );
equal( compare( '1.0.0-alpha.beta', '1.0.0-beta', '<>' ), true );
equal( compare( '1.0.0-beta', '1.0.0-beta.2', '<' ), true );
equal( compare( '1.0.0-beta', '1.0.0-beta.2', '<>' ), true );
equal( compare( '1.0.0-beta.2', '1.0.0-beta.11', '<' ), true );
equal( compare( '1.0.0-beta.2', '1.0.0-beta.11', '<>' ), true );
equal( compare( '1.0.0-beta.11', '1.0.0-rc.1', '<' ), true );
equal( compare( '1.0.0-beta.11', '1.0.0-rc.1', '<>' ), true );
equal( compare( '1.0.0-beta.11', '1.0.0', '<' ), true );
equal( compare( '1.0.0-beta.11', '1.0.0', '<>' ), true );

log( '- run some "<>" comparisons (%d tests)', 5 );

equal( compare( '1.0.0', '1.0.0', '<>' ), false );
equal( compare( '1.0.0', '1.0.1', '<>' ), true );
equal( compare( '1.0.0+build', '1.0.0', '<>' ), false );
equal( compare( '1.0.0+54-dev.1.2.3', '1.0.0+56-dev.1.2.3', '<>' ), false );
equal( compare( '1.0.0-dev.1.2.3', '1.0.0+56-dev.1.2.3', '<>' ), false );

log( '- run some weird pre-release and build comparisons (%d tests)', 9 );

equal( compare( '1.0.0+54-dev.1.2.3', '1.0.0+56-dev.1.2.3', '=' ), true );
equal( compare( '1.0.0-dev.1.2.3', '1.0.0+56-dev.1.2.3', '=' ), true );
equal( compare( '1.0.0-dev+', '1.0.0-dev', '=' ), true );
equal( compare( '1.0.0-dev+', '1.0.0-dev', '<=' ), true );
equal( compare( '1.0.0-dev+', '1.0.0-dev', '>=' ), true );
equal( compare( '1.0.0-dev+', '1.0.0-dev', '<' ), false );
equal( compare( '1.0.0-dev+', '1.0.0-dev', '>' ), false );
equal( compare( '1.0.0-dev+', '1.0.0-dev', '<>' ), false );
equal( compare( '1.0.0-dev+', '1.0.0-dev', '=' ), true );

log( '- run some weird + and - comparisons (%d tests)', 24 );

equal( compare( '1.0.0-', '1.0.0', '=' ), true );
equal( compare( '1.0.0-', '1.0.0', '<=' ), true );
equal( compare( '1.0.0-', '1.0.0', '>=' ), true );
equal( compare( '1.0.0-', '1.0.0', '<' ), false );
equal( compare( '1.0.0-', '1.0.0', '>' ), false );
equal( compare( '1.0.0-', '1.0.0', '<>' ), false );

equal( compare( '1.0.0+', '1.0.0', '=' ), true );
equal( compare( '1.0.0+', '1.0.0', '<=' ), true );
equal( compare( '1.0.0+', '1.0.0', '>=' ), true );
equal( compare( '1.0.0+', '1.0.0', '<' ), false );
equal( compare( '1.0.0+', '1.0.0', '>' ), false );
equal( compare( '1.0.0+', '1.0.0', '<>' ), false );

equal( compare( '1.0.0+-', '1.0.0', '=' ), true );
equal( compare( '1.0.0+-', '1.0.0', '<=' ), true );
equal( compare( '1.0.0+-', '1.0.0', '>=' ), true );
equal( compare( '1.0.0+-', '1.0.0', '>' ), false );
equal( compare( '1.0.0+-', '1.0.0', '>' ), false );
equal( compare( '1.0.0+-', '1.0.0', '<>' ), false );

equal( compare( '1.0.0-+', '1.0.0', '=' ), true );
equal( compare( '1.0.0+-', '1.0.0', '<=' ), true );
equal( compare( '1.0.0+-', '1.0.0', '>=' ), true );
equal( compare( '1.0.0+-', '1.0.0', '<' ), false );
equal( compare( '1.0.0+-', '1.0.0', '>' ), false );
equal( compare( '1.0.0+-', '1.0.0', '<>' ), false );