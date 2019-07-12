// Подключение модулей галпа
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer'),
	cleanCSS = require('gulp-clean-css'),
	uglify = require('gulp-uglify'),
	del = require('del'),
	browserSync = require('browser-sync').create();

//Порядок подключения css файлов
const cssFiles = [
	'./src/css/header.css', 
	'./src/css/slider.css',
	'./src/css/category.css',
	'./src/css/products.css',
	'./src/css/footer.css',
	'./src/css/media.css'
]

//Порядок подключения js файлов
const jsFiles = [
'./src/js/lib.js', 
'./src/js/main.js'
]

// Task(задача) на стили CSS

function styles() {
	//Шаблон для поиска файлов CSS
	//Все файлы по шаблону './src/css/**/*.css'
	return gulp.src(cssFiles)

	//Объединяет файлы из cssFiles в один файл style.css
	.pipe(concat('home.css'))

	.pipe(autoprefixer({
		browsers: ['last 2 version'],
		cascade: false
	}))

	//Минификация css файла
	.pipe(cleanCSS({
		level: 2
	}))

	//Выводящая папка для стилей	
	.pipe(gulp.dest('./build/css'))
	//Обновляет страницу
	.pipe(browserSync.stream());
}

// Task(задача) на скрипты JS
function scripts() {
	//Шаблон для поиска файлов JS
	//Все файлы по шаблону './src/js/**/*.js'
	return gulp.src(jsFiles)

	//Объединяет файлы из jsFiles в один файл script.js
	.pipe(concat('script.js'))

	//Минификация js файла 
	.pipe(uglify({
		toplevel: true
	}))

	//Выводящая папка для скриптов	
	.pipe(gulp.dest('./build/js'))
	//Обновляет страницу
	.pipe(browserSync.stream());
}


//Удалить всё в указанной папке
function clean() {
	return del(['build/*'])
}


//Просматривать файлы
function watch() {
	browserSync.init({
        server: {
            baseDir: "./"
        },
        browser: 'firefox'
    });
     gulp.watch('./src/css/**/*.css', styles)
    //Следить за JS файлами
    gulp.watch('./src/js/**/*.js', scripts)
    //При изменении HTML запустить синхронизацию и обновит страницу
    gulp.watch("./index.html").on('change', browserSync.reload);
}




//Task вызывающий функцию styles; таски вызываются по названию(то что написано в кавычках)
gulp.task('styles', styles);

//Task вызывающий функцию scripts
gulp.task('scripts', scripts);

//Task вызывающий функцию claen
gulp.task('del', clean);
//Tack для отслеживания изменений
gulp.task('watch', watch);
//Tack для удаления файлов в папке build и запуск styles и scripts
gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts)));
//Tack последовательно запускает build и watch 
gulp.task('dev', gulp.series('build', 'watch'))

