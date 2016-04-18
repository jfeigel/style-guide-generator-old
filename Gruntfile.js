"use strict";

module.exports = function grunt(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		// Delete compiled files before recompiling
		clean: {
			styles: ["assets/styles/custom.css"]
		},

		// converts SASS to CSS
		sass: {
			styles: {
				options: {
					style: "expanded",
					cacheLocation: "assets/styles/_src/.sass-cache"
				},
				files: {
					"assets/styles/custom.css": ["assets/styles/_src/custom.scss"]
				}
			}
		},

		postcss: {
			options: {
				map: true,
				processors: [
					require("autoprefixer")({browsers: "last 2 versions"})
				]
			},
			dist: {
				src: "assets/styles/*.css"
			}
		},

		// Watch directories for changes
		watch: {
			styles: {
				files: ["assets/styles/**/*.scss"],
				tasks: ["sass"]
			},
			livereload: {
				files: [
					"assets/styles/custom.css"
				],
				options: {
					livereload: true
				}
			}
		},

		nodemon: {
			dev: {
				script: "index.js",
				options: {
					ext: "js,hbs"
				},
				env: "local"
			}
		},

		concurrent: {
			dev: {
				tasks: ["nodemon", "watch"],
				options: {
					logConcurrentOutput: true
				}
			}
		}
	});
	// END grunt.initConfig();

	// Load Grunt dependencies
	grunt.loadNpmTasks("grunt-concurrent");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-nodemon");
	grunt.loadNpmTasks("grunt-postcss");

	grunt.registerTask("compile", ["clean", "sass", "postcss"]);

	// Default grunt task
	grunt.registerTask("default", ["compile", "concurrent"]);
};
