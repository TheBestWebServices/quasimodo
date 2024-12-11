import { task }        from 'gulp';
import { deleteAsync } from 'del';

export default function() {
  task('clean', () => deleteAsync(['public/**/*']));
}
