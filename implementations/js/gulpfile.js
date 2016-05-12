'use strict';

/////////// IMPORTS ///////////

var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var typescript = require('gulp-typescript');
var merge = require('merge2');

var KarmaServer = require('karma').Server;
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
// var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var reactify = require('reactify');

/////////// CONFIG ///////////

var config = {
    src: {
        root: 'src/tiip',
        toClean: 'src/tiip/**/*.js',
        indexjs: './index.js',
    },
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
    // js: {
        // // src: ['src/tiip/tiip.js', 'src/tiip/**/!(tiip)*.js'],
        // distName: 'tiip.js'
    // },
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

gulp.task('clean', function() {
    del([config.dist.files]);
    del([config.src.toClean]);
});

gulp.task('tiipTs', function() {
    var tsResult = gulp.src(config.ts.src)
        .pipe(typescript(tsProject));
    
    return merge([
        tsResult.dts
            .pipe(gulp.dest(config.ts.distTypings)),
        tsResult.js
            .pipe(gulp.dest(config.src.root))
    ]);
});

gulp.task('tiip', ['tiipTs'], function () {
    var b = browserify({
        entries: config.src.indexjs,
        debug: true,
        transform: [reactify], // defining transforms here will avoid crashing your stream
        ignoreMissing: true // For ignoring error messages. The websocket lib is using require as an argument for a function.
    });
    
    return b.bundle()
        .pipe(source('tiip.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
            // Add transformation tasks to the pipeline here.
            // .pipe(uglify())
            // .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.dist.root));
});

gulp.task('build', ['tiip']);

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
