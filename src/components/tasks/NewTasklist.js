import React, { useState, Fragment } from 'react';
import { db } from '../../firebase';
import { Button, Input } from 'semantic-ui-react';
import { times } from '../../helpers';

const NewTasklist = ({ project_id }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    if (name !== "") {
      db.tasklists().push({
        name: name,
        project_id: project_id,
        created_at: times.now(),
      });
      setName("");
    }
    setEditing(false);
  }

  return (
    <Fragment>
      {!!editing
        ? (
          <form onSubmit={event => handleSubmit(event)} className="ui fluid">
            <Input
              fluid
              size='small'
              autoFocus
              value={name}
              placeholder="tasklist name"
              onChange={event => setName(event.target.value)}
              onBlur={event => handleSubmit(event)} />
          </form>
        ) : <Button color="green" onClick={() => setEditing(true)}>Add New List</Button>
      }
    </Fragment>
  )
}

export default NewTasklist;
