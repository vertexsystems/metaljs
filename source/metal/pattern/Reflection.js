/**
 * Reflection module.
 *
 * @author Metal JS Development Team
 * @version 1.0
 */
define(
	'metal/pattern/Reflection',

	[ 'metal/core/Base', 'metal/language/Descriptor' ],

	function( Metal ) {

		'use strict';

		/**
		 * Injector inheritance pattern.
		 *
		 * @param {Object} object
		 *
		 * @since 1.0
		 */
		Metal.within = function within( object ) {

			// Copy prototype onto object's prototype and define a JavaScript constructor.
			object.prototype = Object.create(
				this.prototype,
				{
					constructor: Metal.descriptorConstructor( object )
				}
			);

			object.within = within;
		};

		return Metal;
	}
);
