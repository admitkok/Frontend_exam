import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import webp from 'imagemin-webp';

gulp.task('images', () =>
    gulp.src('./assets/images/**/*.{jpg,png}')
        .pipe(imagemin([
            webp({ quality: 75 })
        ]))
        .pipe(gulp.dest('./assets/images'))
);
