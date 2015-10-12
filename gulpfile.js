'use strict';

/////////// IMPORTS ///////////

var gulp = require('gulp');
var typescript = require('gulp-typescript');
var concat = require('gulp-concat');
var del = require('del');
var merge = require('merge2');
var KarmaServer = require('karma').Server;

/////////// CONFIG ///////////

var config = {
    ts: {
        // src: ['src/tiip/tiip.ts', 'src/tiip/**/!(tiip)*.ts'],
        src: 'src/tiip/**/*.ts',
        distTypings: 'dist',
        conf: {
            module: 'commonjs',
            target: 'ES5',
            sortOutput: true,
            declaration : true,
            removeComments: true
        }
    },
    js: {
        // src: ['src/tiip/tiip.js', 'src/tiip/**/!(tiip)*.js'],
        distName: 'tiip.js'
    },
    test: {
        conf: '/src/karma-conf.js',
    },
    dist: {
        root: 'dist',
        files: 'dist/**/*'
    }
};

var tsProject = typescript.createProject(config.ts.conf);

/////////// COMPILE AND MOVING TASKS ///////////

gulp.task('clean', function(cb) {
    del(config.dist.files, cb);
});

gulp.task('ts', function() {
    var tsResult = gulp.src(config.ts.src)
        .pipe(typescript(tsProject));
    
    return merge([
        tsResult.dts.pipe(gulp.dest(config.ts.distTypings)),
        tsResult.js
            .pipe(concat(config.js.distName))
            .pipe(gulp.dest(config.dist.root))
    ]);
});
        
// gulp.task('tiipJs', function() {
    // gulp.src(config.src.js)
        // .pipe(concat(config.src.distName))
        // .pipe(gulp.dest(config.dist.root));
// });

// gulp.task('tiip', ['tiipCompile'], function() {  // Same as xxxJs, but with dependency to ts compile task
    // gulp.src(config.src.js)
        // .pipe(concat(config.src.distName))
        // .pipe(gulp.dest(config.dist.root));
// });

gulp.task('build', ['ts']);

/////////// SERVER AND WATCH TASKS ///////////

gulp.task('watch', function() {
    gulp.watch(config.ts.src, ['build']);
});

/////////// TESTING TASKS //////////////

gulp.task('test', ['build'], function (done) {
  new KarmaServer({
    configFile: __dirname + config.test.conf,
    singleRun: true
  }, done).start();
});

/////////// DEFAULT TASK ///////////

gulp.task('default', ['test']);
