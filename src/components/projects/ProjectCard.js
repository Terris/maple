import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { db } from '../../firebase';
import { routes } from '../../constants';
import { counted } from '../../helpers';

class ProjectCard extends Component {

  state = {
    tasks: {},
    notes: {},
    timers: {},
  }

  componentDidMount() {
    this.onSnapshotTasks();
    this.onSnapshotNotes();
    this.onSnapshotTimers();
  }

  onSnapshotTasks = () => {
    db.tasklists()
      .orderByChild('project_id')
      .equalTo(this.props.project.id)
      .once('value', snapshot => this.setState({ tasks: snapshot.val(), loading: false }))
  }
  onSnapshotNotes = () => {
    db.notes()
      .orderByChild('project_id')
      .equalTo(this.props.project.id)
      .once('value', snapshot => this.setState({ notes: snapshot.val(), loading: false }))
  }
  onSnapshotTimers = () => {
    db.timers()
      .orderByChild('project_id')
      .equalTo(this.props.project.id)
      .once('value', snapshot => this.setState({ timers: snapshot.val(), loading: false }))
  }

  render() {
    const { project } = this.props;
    const { tasks, notes, timers } = this.state;
    return (
      <Card key={project.id} href={`${routes.PROJECTS}/${project.id}`}>
        <Card.Content
          header={project.name}
          description={project.description}
        />
        <Card.Content extra>
          <Icon name='tasks' /> {counted.tasksOfTasklists(tasks, task => !task.complete)} tasks &nbsp;&nbsp;
          <Icon name='sticky note' /> {counted.itemOfItems(notes)} notes &nbsp;&nbsp;
          <Icon name='clock' /> {counted.itemOfItems(timers)} timers
        </Card.Content>
      </Card>
    )
  }
}

export default ProjectCard;
