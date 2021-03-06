import React from 'react';
import Task from './Task';

const CompletedTasks = ({ tasklist, tasks }) => {
  return (
    tasks.map(task => <Task key={task.id} tasklist_id={tasklist.id} task={task} /> )
  )
}

export default CompletedTasks;
