import React, { useState } from 'react';
import _ from 'lodash';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Segment, Grid, Icon, Divider } from 'semantic-ui-react';
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
		// dropped outside the list
    if (!result.destination) {
      return;
    }
    let source = result.source.index;
		let destination = result.destination.index;

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
    <Segment basic vertical>
			<TasklistHeader tasklist={tasklist} />
			{!!openTasks.length
        ? (
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
        ) : ( <p>Create your first task.</p> )
      }
			<NewTask tasklist_id={tasklist.id} last_order={openTasks.length} />
			<Divider hidden />
      <Icon link name='archive' onClick={() => setShowArchive(showArchive ? false : true)} />
      <Divider hidden />
			{showArchive &&
				<CompletedTasks tasklist={tasklist} tasks={completedTasks} />
			}
		</Segment>
  )
}

export default Tasklist;
