
export const tasksOfTasklists = ( tasklists, condition = task => !!task ) => {
  let count = 0;
  if (!tasklists) { return count }
  for (let tasklist in tasklists) {
    for(let task in tasklists[tasklist].tasks) {
      if (condition(tasklists[tasklist].tasks[task])) { count += 1; }
    }
  }
  return parseInt(count);
}


export const itemOfItems = ( items ) => {
  let count = 0;
  if ( !items ) { return count }
  count = Object.keys(items).length;
  return count
}
