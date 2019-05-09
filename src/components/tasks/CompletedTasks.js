import React from 'react';
import { Table } from 'semantic-ui-react';
import Task from './Task';

const CompletedTasks = ({ tasklist, tasks }) => {
  return (
    tasks.map(task => {
      return (
        <Table.Row key={task.id}>
          <Task tasklist_id={tasklist.id} task={task} />
        </Table.Row>
      )
    })
  )
}

export default CompletedTasks;
