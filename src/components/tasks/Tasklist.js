import React, { useState } from 'react';
import _ from 'lodash';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Segment, Grid, Button } from 'semantic-ui-react';
import TasklistHeader from './TasklistHeader';
import Task from './Task';
import NewTask from './NewTask';
import CompletedTasks from './CompletedTasks';
import { mapped, sorted } from '../../helpers';
import { db } from '../../firebase';

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  // styles we need to apply on draggables
  ...draggableStyle
});

const Tasklist = ({ tasklist }) => {
	const [showArchive, setShowArchive] = useState(false);
	const tasks = mapped.withId(tasklist.tasks);
	const openTasks = sorted.byKey(_.filter(tasks, {complete: false }), "order");
	const completedTasks = sorted.byKey(_.filter(tasks, { complete: true }), "created_at");

	function onDragEnd(result) {
		let source = result.source.index;
		let destination = result.destination.index;
    // dropped outside the list
    if (!result.destination) {
      return;
    }

		// Update displaced tasks
		if ( source < destination) {
			for(let i = source; i <= destination; i++) {
		  	db.tasklist_task(tasklist.id, openTasks[i].id).update({ order: openTasks[i].order - 1 });
		  }
		} else {
		  for(let i = destination; i < source; i++) {
		  	db.tasklist_task(tasklist.id, openTasks[i].id).update({ order: openTasks[i].order + 1 });
		  }
		}
		// Update dragged task
		db.tasklist_task(tasklist.id, result.draggableId).update({ order: result.destination.index });
	}

  return (
    <Segment.Group>
			<Segment>
				<TasklistHeader tasklist={tasklist} />
			</Segment>
			<Segment>
				<DragDropContext onDragEnd={(result) => onDragEnd(result)}>
					<Droppable droppableId="droppable">
						{(provided, snapshot) => (
							<div {...provided.droppableProps} ref={provided.innerRef}>
								{tasklist && openTasks.map((task, index) => (
									<Draggable key={task.id} draggableId={task.id} index={index}>
										{(provided, snapshot) => (
											<div
	                      ref={provided.innerRef}
	                      {...provided.draggableProps}
	                      {...provided.dragHandleProps}
	                      style={getItemStyle( snapshot.isDragging, provided.draggableProps.style)}
	                    >
												<Task tasklist_id={tasklist.id} task={task} />
											</div>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</Segment>
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
