/**
 * Metal JS Grunt file.
 *
 * @author Chedwick Montoril <chedwick.montoril@vertex.system>
 * @version 1.0
 */
module.exports = function( grunt ) {

	'use strict';

	var project = grunt.file.readJSON( 'package.json' ),
	    pkg = project;

	project.path = {

		build: 'grunt/build/',
		release: 'grunt/release/',
		snippet: 'grunt/snippet/'
	};

	project.label = project.name;

	project.snippet = {

		banner: grunt.file.read( 'grunt/snippet/banner.js' )
			.replace( '{0}', project.version )
			.replace( '{1}', grunt.template.today( 'yyyy-mm-dd' ) ),

		help: grunt.file.read( 'grunt/snippet/help.txt' ),
		wrapper: grunt.file.read( 'grunt/snippet/wrapper.js' )
	};

	grunt.initConfig(
		{
			pkg: pkg,
			project: project,

			clean: {

				default: {

					options: {

						force: true
					},
					src: [ 'grunt/build/**/*', 'grunt/log/**/*', 'grunt/release/**/*' ]
				}
			},

			concat: {

				options: {

					separator: ''
				},

				default: {

					files: {

						// target .amd.source.js
						'<%= project.path.build %><%= project.label %>.amd.source.js': [ project.path.snippet + 'header.js', project.path.build + project.label + '.amd.source.js' ],
						// target .source.js
						'<%= project.path.build %><%= project.label %>.source.js': [ project.path.snippet + 'header.js', project.path.build + project.label + '.source.js' ]
					}
				}
			},

			requirejs: {

				options: {

					baseUrl: 'source',
					paths: {

						resource: 'resource'
					},

					include: [

						'metal/Metal'
					],
					optimize: 'none'
				},

				default: {

					options: {

						out: '<%= project.path.build %><%= project.label %>.amd.source.js'
					}
				}
			},

			vsAmdCleaner: {

				options: {

					globalModules: [ '' ],
					// A hook that allows you add your own custom logic to how each moduleName is
					// prefixed/normalized
					prefixTransform: function( postNormalizedModuleName, preNormalizedModuleName ) {
						var renormalizedModuleName = '',
							moduleNameParts = postNormalizedModuleName.replace( 'metal_', '' ).split( '_' ),
							i,
							p;
						for ( i = 0; i < moduleNameParts.length; i++ )
						{
							p = moduleNameParts[ i ];
							renormalizedModuleName += p.charAt( 0 ).toUpperCase() + p.slice( 1 );
						}

						return '' + renormalizedModuleName;
					},
					// Determines if conditional AMD checks are transformed
					// e.g. if(typeof define == 'function') {} -> if(true) {}
					transformAMDChecks: false
				},

				default: {

					src: '<%= project.path.build %><%= project.label %>.amd.source.js',
					dest: '<%= project.path.build %><%= project.label %>.source.js'
				}
			},

			uglify: {

				options: {

					banner:  project.snippet.banner,
					mangle: {
						except: ['Metal', 'metal', 'ml']
					},

					sourceMap: true
				},

				default: {

					files: {

						// target .amd.source.js
						'<%= project.path.release %><%= project.label %>.amd.js': [ '<%= project.path.build %><%= project.label %>.amd.source.js' ],
						// target .source.js
						'<%= project.path.release %><%= project.label %>.js': [ '<%= project.path.build %><%= project.label %>.source.js' ]
					}
				}
			},

			jshint: {

				options: {
					// options here to override JSHint defaults
					globals: {

						jQuery: true,
						console: true,
						module: true,
						document: true
					}
				},
				files: ['Gruntfile.js', 'source/**/*.js', 'grunt/test/**/*.js']
			},

			vsHelp: {

				generalHelp: project.snippet.help
			}
		}
	);

	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-compress' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-requirejs' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );

	grunt.registerMultiTask(
		'vsHelp',
		'Command line help.',
		function() {

			grunt.log.writeln( this.data );
		}
	);

	grunt.registerMultiTask(
		'vsAmdCleaner',
		'Convert from AMD to monolithic non-modular code.',
		function() {

			// Merge task-specific and/or target-specific options with these defaults.
			var options = this.options(
		        {
			        filePath: this.data.src || '',
				    wrap: false
		        }
		    ),
		    fs = module.require( 'fs' ),
		    amdClean = module.require( 'amdclean' ),
		    output = amdClean.clean( options );

			fs.writeFileSync(
				this.data.dest,
				project.snippet.wrapper.replace( '/*{0}*/', output )
			);
		}
	);

	grunt.registerTask( 'build', [ 'jshint', 'clean', 'requirejs', 'vsAmdCleaner', 'concat', 'uglify' ] );
	grunt.registerTask( 'default', [ 'vsHelp' ] );

	grunt.registerTask( 'release', [ 'jshint', 'concat', 'uglify' ] );
	grunt.registerTask( 'test', [ 'jshint' ] );
};
