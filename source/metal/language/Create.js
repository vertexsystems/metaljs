/**
 * Create module.
 *
 * This module will be used if create must be supported on old browsers.
 *
 * @author Metal JS Development Team
 * @version 1.0
 */
define(
	'metal/language/Create',

	[],

	function() {

		'use strict';

		// Polyfill Object.create
		if ( typeof Object.create !== 'function' )
		{
			Object.create = ( function() {

				var Object = function() {};
				return function ( prototype ) {

					if ( arguments.length > 1 )
					{
						throw new Error( 'Second argument not supported' );
					}
					if ( typeof prototype !== 'object' )
					{
						throw new TypeError( 'Argument must be an object' );
					}
					Object.prototype = prototype;
					/* jshint ignore:start */
					var result = new Object();
					/* jshint ignore:end */
					Object.prototype = null;
					return result;
				};
			} )();
		}

		/**
		 * @constructor
		 *
		 * @since 1.0
		 */
		function Create() {}

		/**
		 * @param object
		 * @param prototype
		 *
		 * @since 1.0
		 */
		Create.createConstructor = function createConstructor( object, prototype ) {

			// Copy prototype onto object's prototype and define a JavaScript constructor.
			object.prototype = Object.create(
				prototype,
				{
					constructor: { configurable: true, writable: true, value: object }
				}
			);
		};

		return Create;
	}
);
