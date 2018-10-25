var gulp    = require('gulp');
var babel   = require('gulp-babel');
var mocha   = require('gulp-mocha');
var del     = require('del');

gulp.task('clean', function () {
    return del('lib');
});

gulp.task('build', gulp.series('clean', function build () {
    return gulp
        .src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('lib'));
}));

gulp.task('watch', gulp.series('build', function () {
    gulp.watch('src/*.js', 'build');
}));

gulp.task('test', gulp.series('build', function test () {
    // return gulp
    //     .src('test/**.js')
    //     .pipe(mocha({
    //         ui:       'bdd',
    //         reporter: 'spec',
    //         inspect: true,
    //         timeout:  typeof v8debug === 'undefined' ? 2000 : Infinity // NOTE: disable timeouts in debug
    //     }));
    process.exit(0);
}));

gulp.task('preview', gulp.series('build', function preview () {
    var buildReporterPlugin = require('testcafe').embeddingUtils.buildReporterPlugin;
    var pluginFactory       = require('./lib');
    var reporterTestCalls   = require('./test/utils/reporter-test-calls');
    var plugin              = buildReporterPlugin(pluginFactory);

    reporterTestCalls.forEach(function (call) {
        plugin[call.method].apply(plugin, call.args);
    });

    process.exit(0);
}));
