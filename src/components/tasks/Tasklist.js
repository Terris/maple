import React, { useState } from 'react';
import { List, Input, Button } from 'semantic-ui-react';
import Task from './Task';
import NewTask from './NewTask';
import { mapped } from '../../helpers';
import _ from 'lodash';
import { db } from '../../firebase';


const Tasklist = ({ tasklist }) => {
	const [editing, setEditing] = useState(false);
	const [name, setName] = useState(tasklist.name);
	const tasks = mapped.withId(tasklist.tasks);
	const openTasks = _.filter(tasks, {complete: false });
	const completedTasks = _.filter(tasks, { complete: true });

	const handleSubmit = event => {
		event.preventDefault();
		if (tasklist.name !== name && name !== "") {
      db.tasklist(tasklist.id).set({
        ...tasklist,
        name: name,
      })
    }
    setEditing(false);
	}

	const handleDelete = () => {
		if (window.confirm("Are you sure?")) {
			db.tasklist(tasklist.id).remove();
		}
	}

  return (
    <List.Item>
			&nbsp;
      <List.Header>
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
					): <span onClick={() => setEditing(true)}>{tasklist.name}</span>
				}
			</List.Header>
      <List.List>
				{tasklist && openTasks.map(task => {
					return (
						<Task key={task.id} tasklist_id={tasklist.id} task={task} />
					)
				})}
        <NewTask tasklist_id={tasklist.id} />
				{tasklist && completedTasks.map(task => {
          return (
            <Task key={task.id} tasklist_id={tasklist.id} task={task} />
          )
        })}
      </List.List>
    </List.Item>
  )
}

export default Tasklist;
