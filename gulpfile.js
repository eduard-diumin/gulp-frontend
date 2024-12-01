import gulp from 'gulp';
import browserSync from 'browser-sync';

import { paths } from './gulp/config/paths.js';
import { clean } from './gulp/tasks/clean.js';
import { svgSprites } from './gulp/tasks/sprite.js';
import { styles } from './gulp/tasks/styles.js';
import { scripts } from './gulp/tasks/scripts.js';
import { resources } from './gulp/tasks/resources.js';
import { images } from './gulp/tasks/images.js';
import { webpImages } from './gulp/tasks/webp.js';
import { htmlInclude } from './gulp/tasks/html-include.js';

global.app = {
  gulp,
  isProd: process.argv.includes('--build'),
  paths,
}

const watcher = () => {
  browserSync.init({
    server: {
      baseDir: `${app.paths.base.build}`
    },
    notify: false,
    port: 8000,
  });

  gulp.watch(app.paths.srcScss, styles);
  gulp.watch(app.paths.srcFullJs, scripts);
  gulp.watch(`${app.paths.srcPartialsFolder}/*.html`, htmlInclude);
  gulp.watch(`${app.paths.base.src}/*.html`, htmlInclude);
  gulp.watch(`${app.paths.resourcesFolder}/**`, resources);
  gulp.watch(`${app.paths.srcImgFolder}/**/**.{jpg,jpeg,png,svg}`, images);
  gulp.watch(`${app.paths.srcImgFolder}/**/**.{jpg,jpeg,png}`, webpImages);
  gulp.watch(app.paths.srcSvg, svgSprites);
}

const dev = gulp.series(clean, htmlInclude, scripts, styles, resources, images, webpImages, svgSprites, watcher);
const build = gulp.series(clean, htmlInclude, scripts, styles, resources, images, webpImages, svgSprites);

export { dev }
export { build }

gulp.task('default', dev);
