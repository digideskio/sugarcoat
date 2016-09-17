var assert = require( 'chai' ).assert;
var fs = require( 'fs' );

var parser = require( '../generators/pattern-library/parser' );

suite( 'Parser: parseVarCode', function () {

    var parse
        , code
        , config
        ;

    setup( function () {
        config = {
            settings: {
                dest: './documentation',
                title: 'Pattern Library'
            },
            sections: [
                {
                    title: 'CSS File',
                    files: './test/assert/parseVarCode.css'
                },
                {
                    title: 'SASS File',
                    files: './test/assert/parseVarCode.scss'
                }
            ]
        };
        parse = parser( config );
    });

    test( 'if the variable string "--var" is detected and parsed correctly in CSS', function () {

        var path = config.sections[ 0 ].files;

        var testPromise = new Promise( function( resolve, reject ) {

            fs.readFile( path, 'utf-8', function( err, data ) {

                if ( err ) return false;

                var value = parse.parseVarCode( data, path );



                return resolve( value );
            });
        });

        return testPromise.then( function( result ) {

            // general
            assert.equal( Array.isArray( result ), true, 'returns an array' );
            assert.equal( result.length, 6, 'parses 6 variables' );

            // 1 red var
            assert.equal( result[ 0 ].variable, '--var1', 'variable is set' );
            assert.equal( result[ 0 ].value, 'red;', 'value is set' );

            // 2 white var
            assert.equal( result[ 1 ].variable, '--var2', 'variable is set' );
            assert.equal( result[ 1 ].value, 'white;', 'value after tab(s) set' );

            // 3 blue var
            assert.equal( result[ 2 ].variable, '--var3', 'variable is set' );
            assert.equal( result[ 2 ].value, 'blue;', 'value is set' );
            assert.equal( result[ 2 ].comment, 'inline comment', '/* inline comment */' );

            // 4 black var
            assert.equal( result[ 3 ].variable, '--var4', 'variable is set' );
            assert.equal( result[ 3 ].value, 'black;', 'value is set' );
            assert.equal( result[ 3 ].comment, 'no space inline comment', '/*inline comment*/' );

            // 5 gold var
            assert.equal( result[ 4 ].variable, '--var5', 'variable is set' );
            assert.equal( result[ 4 ].value, 'gold;', 'value is set' );
            assert.equal( result[ 4 ].comment, 'inline comment', '// inline comment' );

            // 6 purple var
            assert.equal( result[ 5 ].variable, '--var6', 'variable is set' );
            assert.equal( result[ 5 ].value, 'purple;', 'value is set' );
            assert.equal( result[ 5 ].comment, 'no space inline comment', '//inline comment' );
        });
    });

    test( 'if the variable string "$" is detected and parsed correctly in SCSS', function () {

        var path = config.sections[ 1 ].files;

        var testPromise = new Promise( function( resolve, reject ) {

            fs.readFile( path, 'utf-8', function( err, data ) {

                if ( err ) return false;

                var value = parse.parseVarCode( data, path );



                return resolve( value );
            });
        });

        return testPromise.then( function( result ) {

            // general
            assert.equal( Array.isArray( result ), true, 'returns an array' );
            assert.equal( result.length, 4, 'parses 4 variables' );

            // 1 red var
            assert.equal( result[ 0 ].variable, '$var1', 'variable is set' );
            assert.equal( result[ 0 ].value, 'red;', 'value is set' );

            // 2 white var
            assert.equal( result[ 1 ].variable, '$var2', 'variable is set' );
            assert.equal( result[ 1 ].value, 'white;', 'value after tab(s) set' );

            // 3 blue var
            assert.equal( result[ 2 ].variable, '$var3', 'variable is set' );
            assert.equal( result[ 2 ].value, 'blue;', 'value is set' );
            assert.equal( result[ 2 ].comment, 'inline comment', '/* inline comment */' );

            // 4 black var
            assert.equal( result[ 3 ].variable, '$var4', 'variable is set' );
            assert.equal( result[ 3 ].value, 'black;', 'value is set' );
            assert.equal( result[ 3 ].comment, 'inline comment', '// inline comment' );
        });
    });
} );