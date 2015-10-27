module.exports = function(grunt) {
	grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bootlint: {
        	options: {
        		relaxerror: ['W001', 'W002', 'W003', 'W005', 'E010']
        	},
        	files: ['public/**/*.html']
        },

    	concat: {
			options: {
				separator: ';'
			},
            app: {
            	files: {
					'public/app.js': [
						'public/app/**/*.js'
					],
					'public/vendor.js': [
						'bower_components/jquery/dist/jquery.js',
						'bower_components/jquery-ui/jquery-ui.js',
						'bower_components/angular/angular.js',
						'bower_components/angular-route/angular-route.js',
						'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
						'bower_components/tinymce/tinymce.js',
						'bower_components/tinymce/tinymce.jquery.js',
						'bower_components/angular-flash/angular-flash.js'
					]
				}
			}
        },

        concat_css: {
        	options: {},
        	all: {
        		src: [
        			'bower_components/bootstrap/dist/css/bootstrap.css',
        			'bower_components/bootstrap/dist/css/bootstrap-theme.css',
        			'public/css/site.css'
        		],
        		dest: 'public/css/app.css'
        	}
        },

        concurrent: {
			dev: {
				tasks: ['nodemon', 'watch'],
				options: {
					logConcurrentOutput: true
				}
			}
		},

        cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			target: {
				src: 'public/css/app.css',
				dest: 'public/css/app.min.css'
			}
		},

		githooks: {
			all: {
				'pre-commit': 'clean'
			}
		},

		jsbeautifier: {
			"default": {
				src: ['public/**/*.js', 'app/**/*.js'],
				options: {
					
				}
			},
			"git-pre-commit": { 
				src: ['public/**/*.js', 'app/**/*.js'],
				options : {
					mode:"VERIFY_ONLY"
				}
			}
		},

        jshint: {
        	ignore_warnings: {
        		options: {}
        	},
        	src: ['public/app/**/*.js']
        },

        nodemon: {
			dev: {
				script: 'server.js',
				ignore:  ['node_modules/**','bower_components/**','public/**']
			}
		},

        uglify: {
			build: {
				src: ['public/vendor.js', 'public/app.js'],
				dest: 'public/app.min.js'
			}
		},

        watch: {
        	options: {
        		livereload: true
        	},
        	css: {
        		files: ['public/css/app.css'],
        		tasks: ['concat_css', 'cssmin']
        	},
        	js: {
        		files: ['public/app/**.js', 'gruntfile.js'],
        		tasks: ['jshint', 'concat', 'uglify']
        	},
        	html: {
        		files: ['public/app/**.html', 'public/index.html'],
        		tasks: ['bootlint']
        	}
		},

    });
	
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks("grunt-jsbeautifier");
	grunt.loadNpmTasks('grunt-githooks');
	grunt.loadNpmTasks('grunt-concat-css');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-bootlint');
	
	
	grunt.registerTask('default', ['build', 'concurrent']);
	grunt.registerTask('build', ['concat', 'concat_css', 'uglify', 'cssmin', 'jshint', 'bootlint']);
	grunt.registerTask('clean', ['jsbeautifier', 'build']);
};