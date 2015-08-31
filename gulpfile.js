'use strict';

/////////// IMPORTS ///////////

var gulp = require('gulp');
var typescript = require('gulp-typescript');

/////////// CONFIG ///////////

var config = {
    libs: {
        js: [
            'node_modules/angular/angular.min.js',
        ]
    },
    tiip: {
        root: 'src',
        ts: 'src/tiip.ts'
    },
    test: {
        conf: '\src\test\karma-conf.js',
    },
    dist: {
        root: 'dist',
        files: 'dist/**/*'
    },
    tsConf: {
        module: 'commonjs',
        target: 'ES5',
        out: 'dist/tiip.js'
    }
};

/////////// COMPILE AND MOVING TASKS ///////////

gulp.task('clean', function(cb) {
    del([config.dist.files], cb);
});

gulp.task('tiipCompile', function() {
    gulp.src(config.tiip.ts)
        .pipe(typescript(config.tsConf))
        .pipe(gulp.dest(config.dist.root));
});

gulp.task('build', ['tiipCompile']);  //'clean',

/////////// SERVER AND WATCH TASKS ///////////

gulp.task('watch', function() {
    gulp.watch(config.tiip.ts, ['tiipCompile']);
});

/////////// TESTING TASKS //////////////

// gulp.task('test', ['tiipCompile', 'watch'], function(done) {
    // new Karma({
        // configFile: __dirname  + '/src/test/karma-conf.js',
        // singleRun: false
    // }, done).start();
// });

/////////// DEFAULT TASKS ///////////

gulp.task('default', ['build', 'watch']);
