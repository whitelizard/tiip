'use strict';

/////////// IMPORTS ///////////

var gulp = require('gulp');
var typescript = require('gulp-typescript');
var concat = require('gulp-concat');
var del = require('del');

/////////// CONFIG ///////////

var config = {
    tiip: {
        root: 'src',
        ts: 'src/*.ts',
        js: 'src/*.js',
        distName: 'tiip.js'
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
        out: 'tsout.js',
        sortOutput: true
    }
};

/////////// COMPILE AND MOVING TASKS ///////////

gulp.task('clean', function(cb) {
    del([config.dist.files], cb);
});

gulp.task('tiipCompile', function() {
    gulp.src(config.tiip.ts)
        // .pipe(tslint)
        // .pipe(tslint.report, 'verbose')
        .pipe(typescript(config.tsConf))
        .pipe(gulp.dest(config.tiip.root));
});
        
gulp.task('tiipJs', function() {
    gulp.src(config.tiip.js)
        .pipe(concat(config.tiip.distName))
        .pipe(gulp.dest(config.dist.root));
});

gulp.task('tiip', ['tiipCompile'], function() {  // Same as tspcomJs, but with dependency to ts compile task
    gulp.src(config.tiip.js)
        .pipe(concat(config.tiip.distName))
        .pipe(gulp.dest(config.dist.root));
});

gulp.task('build', ['tiip']);  //'clean',

/////////// SERVER AND WATCH TASKS ///////////

gulp.task('watch', function() {
    gulp.watch(config.tiip.ts, ['tiip']);
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
