import React, { useState } from 'react';
import { Table, Input } from 'semantic-ui-react';
import { db } from '../../firebase';
import { times } from '../../helpers';

const Task = ({ task, tasklist_id  }) => {
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState(task.description);

  const onChangeComplete = () => {
    db.tasklist_task(tasklist_id, task.id).set({
      ...task,
      complete: task.complete ? false : true
    })
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (task.description !== description && description !== "") {
      db.tasklist_task(tasklist_id, task.id).set({
        ...task,
        description: description,
        updated_at: times.now(),
      })
    }
    setEditing(false);
  }

  const renderEditing = () => {
    return (
      <label>
        <form onSubmit={event => {handleSubmit(event)}}>
          <Input
            fluid
            size="mini"
            type="text"
            value={description}
            onChange={event => {setDescription(event.target.value)}}
            onBlur={event => handleSubmit(event)} />
        </form>
      </label>
    )
  }

  const renderTask = () => {
    return (
      !!task.complete
      ? <label style={{ color: "#cccccc" }}>{task.description}</label>
      : <label onClick={() => setEditing(true)}>{task.description}</label>
    )
  }

  return (
    <Table.Row>
      <Table.Cell width={1}>
        <input
          type="checkbox"
          name="complete"
          value="complete" checked={task.complete}
          onChange={() => onChangeComplete()} />
      </Table.Cell>
      <Table.Cell>
        {!!editing
          ? renderEditing()
          : renderTask()
        }
      </Table.Cell>
    </Table.Row>
  )
}

export default Task;
