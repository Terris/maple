import React, { useState, Fragment} from 'react';
import { Button, Input } from 'semantic-ui-react';
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
    <Fragment>
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
        ) : <Button basic icon='plus' size="mini" onClick={() => setEditing(true)} />
      }
    </Fragment>
  )
}

export default NewTask;
