/**
 * Typeof module.
 *
 * @author Metal JS Development Team
 * @version 1.0
 */
define(
	'metal/language/Typeof',

	[ 'metal/core/Base' ],

	function( Metal ) {

		'use strict';

		// Primitive data types:
		var TYPEOF_ARRAY     = 'array',
		    TYPEOF_FUNCTION  = 'function',
		    TYPEOF_NULL      = null,
		    TYPEOF_NUMBER    = 'number',
		    TYPEOF_OBJECT    = 'object',
		    TYPEOF_STRING    = 'string',
		    TYPEOF_UNDEFINED = 'undefined';

		// Polyfill for isArray.
		if ( ! Array.isArray )
		{
			Array.isArray = function typeofArray( value ) {

				return Object.prototype.toString.call( value ) === '[object Array]';
			};
		}

		/**
		 * @param value
		 * @return {boolean}
		 *
		 * @since 1.0
		 */
		Metal.typeofArray = Array.isArray;

		/**
		 * @param value
		 * @return {boolean}
		 *
		 * @since 1.0
		 */
		Metal.typeofFunction = function typeofFunction( value ) {

			return typeof value === TYPEOF_FUNCTION;
		};

		/**
		 * @param value
		 * @return {boolean}
		 *
		 * @since 1.0
		 */
		Metal.typeofNull = function typeofNull( value ) {

			return value === TYPEOF_NULL;
		};

		/**
		 * @param value
		 * @return {boolean}
		 *
		 * @since 1.0
		 */
		Metal.typeofNumber = function typeofNumber( value ) {

			return typeof value === TYPEOF_NUMBER;
		};

		/**
		 * Note that JavaScript arrays are objects.
		 *
		 * @param value
		 * @return {boolean}
		 *
		 * @since 1.0
		 */
		Metal.typeofObject = function typeofObject( value ) {

			// http://jsperf.com/isobject4
			return value !== TYPEOF_NULL && typeof value === TYPEOF_OBJECT;
		};

		/**
		 * @param value
		 * @return {boolean}
		 *
		 * @since 1.0
		 */
		Metal.typeofString = function typeofString( value ) {

			return typeof value === TYPEOF_STRING;
		};

		/**
		 * @param value
		 * @return {boolean}
		 *
		 * @since 1.0
		 */
		Metal.typeofUndefined = function typeofUndefined( value ) {

			return typeof value === TYPEOF_UNDEFINED;
		};

		return Metal;
	}
);
