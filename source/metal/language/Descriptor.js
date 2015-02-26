/**
 * Descriptor module.
 *
 * Future code implementation for Descriptor objects could be optimized.
 *
 *   Explicit creation:
 *
 * 	 Object.defineProperty(
 * 	   object,
 * 	   'key',
 * 	   {
 *       enumerable: false,
 *       configurable: false,
 *       writable: false,
 *       value: 'static'
 *     }
 *   );
 *
 *   Caching objects or primitive for CPU heavy operations:
 *
 *   function f( value ) {
 *
 *     var cached = f.cached || (
 *       f.cached = {
 *
 *         enumerable: false,
 *         writable: false,
 *         configurable: false,
 *         value: null
 *       }
 *     );
 *
 *     cached.value = value;
 *
 *     return cached;
 *   }
 *
 * @author Metal JS Development Team
 * @version 1.0
 */
define(
	'metal/language/Descriptor',

	[ 'metal/core/Base' ],

	function( Metal ) {

		'use strict';

		var descriptorConstructorObject = { configurable: true, writable: true, value: null };

		/**
		 * @param object
		 * @return {Object}
		 *
		 * @since 1.0
		 */
		Metal.descriptorConstructor = function descriptorConstructor( object ) {

			descriptorConstructorObject.value = object;
			return descriptorConstructorObject;
		};

		return Metal;
	}
);
