/* node_modules */
import babelify from 'babelify';
import browserSync from 'browser-sync';
const reload = browserSync.reload;
import browserify from 'browserify';
import gulp from 'gulp';
import prefixer from 'gulp-autoprefixer';
import imagemin from 'gulp-imagemin';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import rigger from 'gulp-rigger';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import watch from 'gulp-watch';
import jpegtran from 'imagemin-jpegtran';
import pngquant from 'imagemin-pngquant';
import clean from 'postcss-clean';
import sprites from 'postcss-sprites';
import run from 'run-sequence';
import rimraf from 'rimraf';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

/* gulpconfig */
import path from './src/js/gulpconfig/path';
import mapError from './src/js/gulpconfig/map-error';
import serverConfig from './src/js/gulpconfig/server-config';
import spritesConfig from './src/js/gulpconfig/sprites-config';

/* tasks */
gulp.task('html:build', () => {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});

gulp.task('js:build', () => {
  const bundler = browserify(path.src.js).transform(babelify, { presets: ["es2015"] })
  return bundler.bundle()
    .on('error', mapError)
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(rename('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream: true}));
})

gulp.task('style:build', () => {
    gulp.src(path.src.style) //Выберем наш main.less
        .pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(less()) //Скомпилируем
        .pipe(prefixer())
        .pipe(postcss( [ sprites(spritesConfig), clean() ]))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(reload({stream: true}));
});

gulp.task('image:build', () => {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            use: [ jpegtran(), pngquant() ],
            interlaced: true,
            svgoPlugins: [{removeViewBox: false}], //сжатие .svg
            optimizationLevel: 7 //степень сжатия от 0 до 7
        }))
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', () => {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('php:build', () => {
    gulp.src(path.src.php)
        .pipe(gulp.dest(path.build.php))
});

gulp.task('build', (fn) => {
  run('html:build',
      'js:build',
      'style:build',
      'image:build',
      'fonts:build',
      'php:build',
      fn);
});

gulp.task('watch', () => {
    watch([path.watch.html], (event, cb) => {
        gulp.start('html:build');
    });
    watch([path.watch.style], (event, cb) => {
        gulp.start('style:build');
    });
    watch([path.watch.js], (event, cb) => {
        gulp.start('js:build');
    });
    watch([path.watch.img], (event, cb) => {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], (event, cb) => {
        gulp.start('fonts:build');
    });
    watch([path.watch.php], (event, cb) => {
        gulp.start('php:build');
    });
});

gulp.task('webserver', () => {
    browserSync(serverConfig);
});

gulp.task('clean', (cb) => {
    rimraf(path.clean, cb);
});

gulp.task('start', (fn) => {
  run('build',
      'webserver',
      'watch',
      fn);
});
