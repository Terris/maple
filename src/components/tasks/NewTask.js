import React, { useState } from 'react';
import { Input, Grid } from 'semantic-ui-react';
import { db } from '../../firebase';
import { times } from '../../helpers';

const NewTask = ({ tasklist_id, last_order }) => {
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    if (description !== "") {
      db.tasklist_tasks(tasklist_id).push({
        description: description,
        complete: false,
        created_at: times.now(),
        order: last_order,
      });
      setDescription("");
    }
    setEditing(false);
  }

  return (
    <Grid>
      <Grid.Column style={{ width: "30px"}}>
        <input
          type="checkbox"
          disabled
       />
      </Grid.Column>
      <Grid.Column width={14}>
        {!!editing
          ? (
            <form onSubmit={event => handleSubmit(event)}>
              <Input
                fluid
                size='small'
                autoFocus
                value={description}
                placeholder="task description"
                onChange={event => setDescription(event.target.value)}
                onBlur={event => handleSubmit(event)} />
            </form>
          ) : <label onClick={() => setEditing(true)} style={{ fontStyle: 'italic', cursor: 'text', color: "#cccccc" }}>Create a new task</label>
        }
      </Grid.Column>
    </Grid>
  )
}

export default NewTask;
