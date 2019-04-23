import React, {useState} from 'react';
import { List, Button, Input } from 'semantic-ui-react';
import { db } from '../../firebase';

const NewTask = ({ tasklist_id }) => {
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    if (description !== "") {
      db.tasklist_tasks(tasklist_id).push({
        description: description,
        complete: false,
      });
    }
    setEditing(false);
  }

  return (
    <List.Item>
      {!!editing
        ? (
          <form onSubmit={event => handleSubmit(event)}>
            <Input
              fluid
              size='mini'
              autoFocus
              value={description}
              placeholder="task description"
              onChange={event => setDescription(event.target.value)}
              onBlur={event => handleSubmit(event)} />
          </form>
        ) : <Button basic icon='plus' size="mini" onClick={() => setEditing(true)} />
      }

    </List.Item>
  )
}

export default NewTask;
