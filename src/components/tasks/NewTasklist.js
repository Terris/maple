import React, { useState } from 'react';
import { db } from '../../firebase';
import { Button, List, Input } from 'semantic-ui-react';

const NewTasklist = ({ project_id }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    if (name !== "") {
      db.tasklists().push({
        name: name,
        project_id: project_id,
      });
    }
    setEditing(false);
    setName("");
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
              value={name}
              placeholder="tasklist name"
              onChange={event => setName(event.target.value)}
              onBlur={event => handleSubmit(event)} />
          </form>
        ) : <Button color="green" onClick={() => setEditing(true)} style={{ marginTop: "1em"}}>Add New List</Button>
      }
    </List.Item>
  )
}

export default NewTasklist;
