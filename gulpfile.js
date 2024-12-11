import cleanTask   from './gulp/tasks/clean.js'
import copyTask    from './gulp/tasks/copy.js'
import watchTask   from './gulp/tasks/watch.js'
import defaultTask from './gulp/tasks/default.js'

cleanTask();
copyTask();
watchTask();
defaultTask();
