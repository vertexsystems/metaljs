/**
 * Initialization module.
 *
 * @author Metal JS Development Team
 * @version 1.0
 */
define(
	'metal/pattern/Initialization',

	[ 'metal/core/Base', 'metal/language/Typeof' ],

	function( Metal, Typeof ) {

		'use strict';

		/**
		 * Object initialization pattern.
		 *
		 * @since 1.0
		 */
		Metal.prototype.initialization = {};

		/**
		 * Object initialization pattern.
		 *
		 * @param {Object} parameters
		 *
		 * @since 1.0
		 */
		Metal.prototype.initialize = function initialize( parameters ) {

			var parameter, prototype, initialization;

			if ( Metal.typeofObject( parameters ) )
			{
				prototype = Object.getPrototypeOf( this );
				if ( Metal.typeofObject( prototype.initialization ) )
				{
					initialization = prototype.initialization;
					for ( parameter in initialization )
					{
						this[ parameter ] = Metal.typeofUndefined( parameters[ parameter ] ) ? initialization[ parameter ] : parameters[ parameter ];
					}
				}
			}
		};

		return Metal;
	}
);
