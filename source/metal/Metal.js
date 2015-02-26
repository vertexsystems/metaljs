/**
 * Metal JS main module.
 *
 * @author Metal JS Development Team
 * @version 1.0
 */
define(
	'metal/Metal',

	[
		'metal/core/Base',
		/*'metal/core/Create',*/
		'metal/language/Descriptor',
		'metal/language/Typeof',
		'metal/pattern/Reflection',
		'metal/pattern/Initialization'
	],

	function( Metal ) {

		'use strict';

		return Metal;
	}
);
