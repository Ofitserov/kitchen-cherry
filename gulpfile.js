var gulp = require('gulp'),
    reporter = require('postcss-reporter'),
    watch = require('gulp-watch'),
    postcss = require('gulp-postcss'),
    prefixer = require('gulp-autoprefixer'),
    clean = require('postcss-clean'),
    sprites = require('postcss-sprites'),
    //mqpacker = require('css-mqpacker'), // works incorrect...
    //uglify = require('gulp-uglify'),
    minify = require('gulp-minify'),
    //pump = require('pump'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    jpegtran = require('imagemin-jpegtran'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    run = require('run-sequence'),
    rename = require('gulp-rename'),
    browserify = require('gulp-browserify');

var spriteOpts = {
    stylesheetPath: './dist',
    spritePath: './dist/images/'
};

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/',
        php: 'build/php'
    },
    src: { //Пути откуда брать исходники
        html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/js/main.js',//В стилях и скриптах нам понадобятся только main файлы
        style: 'src/style/main.less',
        img: 'src/img/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'src/fonts/**/*.*',
        sprite: 'src/icons/*.png',
        php: 'src/php/**/*.php'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.less',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        php: 'src/php/**/*.php'
    },
    clean: './build'
};
// Конфигурация сервера
var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 8080,
    logPrefix: "Vlad Ofitserov"
};
// spritesConfig
var spritesConfig = {
  stylesheetPath: path.build.css,
  spritePath: path.build.img,
  filterBy: function(image) {
  // Allow only png files
    if (!/\.png$/.test(image.url))
    {
      return Promise.reject();
    }
    return Promise.resolve();
    }
  };

gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(rigger()) //Прогоним через rigger
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        
        .pipe(minify())
      //  .pipe(uglify()) //Сожмем наш js
        .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
});

gulp.task('style:build', function () {
    gulp.src(path.src.style) //Выберем наш main.less
        .pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(less()) //Скомпилируем
        .pipe(prefixer())
        .pipe(postcss( [ sprites(spritesConfig), clean(), reporter() ]))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            use: [jpegtran(), pngquant()],
            interlaced: true,
            svgoPlugins: [{removeViewBox: false}], //сжатие .svg
            optimizationLevel: 7 //степень сжатия от 0 до 7
        }))
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('php:build', function() {
    gulp.src(path.src.php)
        .pipe(gulp.dest(path.build.php))
});

gulp.task('build', function(fn){
  run('html:build',
      'js:build',
      'style:build',
      'image:build',
      'fonts:build',
      'php:build',
      fn);
});

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
    watch([path.watch.php], function(event, cb) {
        gulp.start('php:build');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('start', function(fn){
  run('build',
      'webserver',
      'watch',
      fn);
});
