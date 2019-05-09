import React, { useState, Fragment } from 'react';
import _ from 'lodash';
import { Segment, Grid, Button } from 'semantic-ui-react';
import TasklistHeader from './TasklistHeader';
import Task from './Task';
import NewTask from './NewTask';
import CompletedTasks from './CompletedTasks';
import { mapped, sorted } from '../../helpers';

const Tasklist = ({ tasklist }) => {
	const [showArchive, setShowArchive] = useState(false);
	const tasks = mapped.withId(tasklist.tasks);
	const openTasks = sorted.byKey(_.filter(tasks, {complete: false }), "order");
	const completedTasks = sorted.byKey(_.filter(tasks, { complete: true }), "created_at");

  return (
    <Segment.Group>
			<Segment>
				<TasklistHeader tasklist={tasklist} />
			</Segment>
			{tasklist && openTasks.map(task => {
				return (
					<Fragment key={task.id}>
						<Segment key={task.id}>
							<Task tasklist_id={tasklist.id} task={task} />
						</Segment>
					</Fragment>
				)
			})}
			<Segment>
				<Grid>
					<Grid.Column floated='left' width={12}>
						<NewTask tasklist_id={tasklist.id} />
					</Grid.Column>
					<Grid.Column floated='right' width={2} textAlign="right">
						<Button icon='checkmark box' size='mini' active={showArchive ? true : false} onClick={() => setShowArchive(showArchive ? false : true)} />
					</Grid.Column>
				</Grid>
			</Segment>
			{showArchive &&
				<Segment>
					<CompletedTasks tasklist={tasklist} tasks={completedTasks} />
				</Segment>
			}
		</Segment.Group>
  )
}

export default Tasklist;
