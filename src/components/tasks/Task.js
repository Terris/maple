import React, { useState } from 'react';
import { Grid, Input } from 'semantic-ui-react';
import { db } from '../../firebase';
import { times } from '../../helpers';

const Task = ({ task, tasklist_id  }) => {
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState(task.description);

  // Mark task complete
  const onChangeComplete = () => {
    db.tasklist_task(tasklist_id, task.id).set({
      ...task,
      complete: task.complete ? false : true
    })
  }

  // Update task
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
            size="small"
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
      : <label onClick={() => setEditing(true)} style={{ cursor: 'text' }}>{task.description}</label>
    )
  }

  return (
    <Grid>
      <Grid.Column style={{ width: "30px"}}>
        <input
          type="checkbox"
          name="complete"
          value="complete"
          checked={task.complete}
          onChange={() => onChangeComplete()} />
      </Grid.Column>
      <Grid.Column width={14}>
        {!!editing
          ? renderEditing()
          : renderTask()
        }
      </Grid.Column>
    </Grid>
  )
}

export default Task;
