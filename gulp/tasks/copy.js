import { dest, src, task } from 'gulp';
import gulpDebug           from 'gulp-debug';

export default function() {
  task('copy', () => {
    return src(['src/**'], { encoding: false })
      .pipe(gulpDebug({ 'title': 'copying files...' }))
      .pipe(dest('public'));
  });
}
