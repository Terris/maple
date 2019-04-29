import React, {useState} from 'react';
import { Table, Button, Input } from 'semantic-ui-react';
import { db } from '../../firebase';
import { times } from '../../helpers';

const NewTask = ({ tasklist_id }) => {
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    if (description !== "") {
      db.tasklist_tasks(tasklist_id).push({
        description: description,
        complete: false,
        created_at: times.now(),
      });
      setDescription("");
    }
    setEditing(false);
  }

  return (
    <Table.Row>
      <Table.Cell colSpan={2}>
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
          ) : <Button fluid icon='plus' size="mini" content='Add Task' onClick={() => setEditing(true)} />
        }
      </Table.Cell>
    </Table.Row>
  )
}

export default NewTask;
