import { task, series } from 'gulp';

export default function() {
  task('default', series('clean', 'copy'));
}
