import React, { Fragment, useState } from 'react';
import { db } from '../../firebase';
import { Table, Button, Input } from 'semantic-ui-react';

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
      setName("");
    }
    setEditing(false);
  }

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan={2}>
            {!!editing
              ? (
                <form onSubmit={event => handleSubmit(event)} className="ui fluid">
                  <Input
                    fluid
                    size='mini'
                    autoFocus
                    value={name}
                    placeholder="tasklist name"
                    onChange={event => setName(event.target.value)}
                    onBlur={event => handleSubmit(event)} />
                </form>
              ) : <Button color="green" onClick={() => setEditing(true)}>Add New List</Button>
            }
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    </Table>
  )
}

export default NewTasklist;
