module.exports = function(config){
    config.set({
    //  root path location that will be used to resolve all relative paths in files and exclude sections, should be the root of your project
    basePath : '../',
 
    // files to include, ordered by dependencies
    files : [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'src/*.js',
      'test/*.js'
      // include relevant Angular files and libs
      // 'app/lib/angular/angular.js',
      // 'test/lib/angular/angular-mocks.js',
 
      // include js files
      // 'app/js/app.js',
 
      // include unit test specs
      // 'test/unit/*.js'
    ],
    
    // karma has its own autoWatch feature but Grunt watch can also do this
    autoWatch : true,
 
    // testing framework, be sure to install the karma plugin
    frameworks: ['jasmine'],
 
    // browsers to test against, be sure to install the correct karma browser launcher plugin
    // browsers : ['Chrome', 'PhantomJS', 'Firefox'],
    browsers : ['Chrome'],
 
    // progress is the default reporter
    reporters: ['progress'],
 
    // map of preprocessors that is used mostly for plugins
    preprocessors: {
 
    },
 
    // list of karma plugins
    plugins : [
        'karma-junit-reporter',
        'karma-chrome-launcher',
        'karma-jasmine'
    ]
})}