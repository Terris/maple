import React, { useState, Fragment } from 'react';
import { Header, Input, Button } from 'semantic-ui-react';
import { db } from '../../firebase';
import { times } from '../../helpers';
const TasklistHeader = ({ tasklist }) => {

  const [editing, setEditing] = useState(false);
	const [name, setName] = useState(tasklist.name);

  // Update Task List
	const handleSubmit = event => {
		event.preventDefault();
		if (tasklist.name !== name && name !== "") {
      db.tasklist(tasklist.id).set({
        ...tasklist,
        name: name,
				updated_at: times.now(),
      })
    }
    setEditing(false);
	}

	// Delete Task List
	const handleDelete = () => {
		if (window.confirm("Are you sure?")) {
			db.tasklist(tasklist.id).remove();
		}
	}

  return (
    <Fragment>
      {!!editing
        ? (
          <div>
            <Button
              floated="right"
              size="small"
              icon="delete"
              color="red"
              onClick={() => handleDelete()} />
            <form onSubmit={event => {handleSubmit(event)}}>
              <Input
                fluid
                size="small"
                type="text"
                value={name}
                onChange={event => {setName(event.target.value)}}
                onBlur={event => handleSubmit(event)} />
            </form>
          </div>
        ): <Header as="h4" onClick={() => setEditing(true)}>{tasklist.name}</Header>
      }
    </Fragment>
  )
}

export default TasklistHeader;
