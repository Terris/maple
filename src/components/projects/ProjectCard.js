import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Item, Icon } from 'semantic-ui-react';
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
      <Item key={project.id} onClick={() => this.props.history.push(`${routes.PROJECTS}/${project.id}`)}>
        <Item.Content>
          <Item.Header>{project.name}</Item.Header>
          <Item.Extra floated='right'>
            <Icon name='tasks' /> {counted.tasksOfTasklists(tasks, task => !task.complete)} tasks &nbsp;&nbsp;
            <Icon name='sticky note' /> {counted.itemOfItems(notes)} notes &nbsp;&nbsp;
            <Icon name='clock' /> {counted.itemOfItems(timers)} timers
          </Item.Extra>
        </Item.Content>
      </Item>
    )
  }
}

export default withRouter(ProjectCard);
