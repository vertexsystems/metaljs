/**
 * Factory wrapper.
 *
 * @author Metal JS Development Team
 * @version 1.0
 */
( function( environment, factory ) {

	'use strict';

	// CommonJS module is defined.
	if ( typeof module === 'object' && typeof module.exports === 'object' )
	{
		module.exports = factory();
	}
	// AMD module is defined.
	else if ( typeof define === 'function' && define.amd )
	{
		define(
			'vs-metal',
			[],
			function() {
				return factory();
			}
		);
	}
	// Expose to the global scope.
	else
	{
		factory( environment, true );
	}
} )( typeof window === 'undefined' ? this : window , function( environment, global ) {

/*{0}*/

	// Export Metal instance to the current environment.
	if ( global )
	{
		environment.Metal = environment.ml = Metal;
	}

	return Metal;
} );