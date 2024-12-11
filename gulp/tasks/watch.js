import { task, watch, series } from 'gulp';

export default function() {
  task('watch', () => {
    watch(['src/**'], series('default'))
  });
}
