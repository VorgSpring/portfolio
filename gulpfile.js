'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const server = require('browser-sync').create();
const pug = require('gulp-pug');
const minify = require('gulp-csso');
const rename = require('gulp-rename');
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const spritesmith = require('gulp.spritesmith');
const replace = require('gulp-replace');
const gulpIf = require('gulp-if');
const cheerio = require('gulp-cheerio');
const del = require('del');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const webpack = require('gulp-webpack');
const named = require('vinyl-named');
const path = require('path');
const prettify = require('gulp-html-prettify');

// Собирает sass в css, добавляет карту и префиксы
gulp.task('style', () => {
    return gulp.src('sass/style.scss')
        .pipe(plumber({
            errorHandler: notify.onError(err => ({
                title: 'Styles',
                message: err.message
            }))
        }))
        //.pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: require('node-normalize-scss').includePaths,
            outputStyle: 'expanded'
        }))
        .pipe(autoprefixer({
            browsers: ['last 3 version', '> 1%', 'ie 8', 'ie 9', 'Opera 12.1'],
            cascade: false
        }))
        //.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("css"))
        .pipe(server.reload({stream: true}));
});

// Собирает pug в html
gulp.task('pug', () => {
    return gulp.src('pug/*.pug')
        .pipe(plumber({
            errorHandler: notify.onError(err => ({
                title: 'Pug',
                message: err.message
            }))
        }))
        .pipe(pug())
        .pipe(prettify({indent_char: '\t', indent_size: 1}))
        .pipe(gulp.dest('./'))
});

// Собирает js модули, в каждом модуле автоматически переписывает весь код в ES5
// gulp.task('webpack', () => {
//     return gulp.src('js/src/*.js')
//         .pipe(plumber({
//             errorHandler: notify.onError(err => ({
//                 title: 'Webpack',
//                 message: err.message
//             }))
//         }))
//         .pipe(named())
//         .pipe(webpack({
//             watch:   false,
//             devtool: 'source-map',
//             module:  {
//                 loaders: [{
//                     test:    /\.js$/,
//                     include: path.join(__dirname, './'),
//                     loader:  'babel?presets[]=es2015'
//                 }]
//             }
//         }))
//         .pipe(gulp.dest('js'));
// });

// Запускает локальный сервер
gulp.task('serve', () => {
    server.init({
        server: ".",
        notify: false,
        open: true,
        ui: false
    });

    server.watch(['*.html', 'js/**/*.js']).on('change', server.reload);
});

// Отчищает папку с production версией проекта
gulp.task('clean', () => {
    return del('build');
});

// Собирает SVG спрайт и минифицирует его
gulp.task('sprite:svg', () => {
    return gulp.src('icons/*.svg')
        .pipe(plumber({
            errorHandler: notify.onError(err => ({
                title: 'SVG sprite',
                message: err.message
            }))
        }))
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(cheerio({
            run: ($) => {
                $('[fill]').removeAttr('fill');
                $('[style]').removeAttr('style');
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(replace('&gt;', '>'))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "../sprite.svg"
                }
            }
        }))
        .pipe(gulp.dest('image'));
});

// Собирает PNG спрайт
gulp.task('sprite:png', () => {
    return gulp.src('icons/*.png')
        .pipe(plumber({
            errorHandler: notify.onError(err => ({
                title: 'PNG sprite',
                message: err.message
            }))
        }))
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.scss',
            algorithm: 'top-down',
            imgPath: '../image/sprite.png',
            padding: 20
        }))
        .pipe(gulpIf('*.scss', gulp.dest('sass/global'), gulp.dest('image')));
});

// Минифицирует css и js
gulp.task('minify', () => {
    return gulp.src(['css/style.css', 'js/*.js', '!js/*.min.js'])
        .pipe(plumber({
            errorHandler: notify.onError(err => ({
                title: 'minify',
                message: err.message
            }))
        }))
        .pipe(gulpIf('*css', minify(), uglify()))
        .pipe(rename((path) => {
            path.basename +='.min';
        }))
        .pipe(gulpIf('*css', gulp.dest('css'), gulp.dest('js')))
});

// Копирует шрифты, изображения, разметку, минифицированные стили и скрипты в папку с production версией проекта
gulp.task('copy', () => {
    return gulp.src([
            'fonts/**/*.{woff,woff2,ttf}',
            'image/**',
            'js/*.min.js',
            'css/style.min.css',
            '*.html'
        ], {
            base: "."
        })
        .pipe(plumber({
            errorHandler: notify.onError(err => ({
                title: 'Copy',
                message: err.message
            }))
        }))
        .pipe(gulp.dest('build'));
});

// Опримизирует изображения
gulp.task('images', () => {
    return gulp.src('build/image/**/*.{png,jpg,gif}')
        .pipe(imagemin([
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.jpegtran({progressive: true})
        ]))
        .pipe(gulp.dest('build/image'));
});

// Запускает отслеживание изменений scss, pug и js файлов
gulp.task('watch', () => {
    gulp.watch('sass/**/*.{sass,scss}', gulp.series('style'));
    gulp.watch('pug/**/*.pug', gulp.series('pug'));
    // gulp.watch('js/src/*.js', gulp.series('webpack'));
});

// Сборка development версии проекта , 'webpack'
gulp.task('build', gulp.parallel('pug', 'style'));

// Запуск сервера, сборки development и отслеживание
gulp.task('start', gulp.series('build', gulp.parallel('serve', 'watch')));

// Сборка production версии проекта
gulp.task('build:production', gulp.series('clean', 'build', 'minify', 'copy', 'images'));
