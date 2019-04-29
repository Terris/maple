import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Loader, Divider, Menu } from 'semantic-ui-react';
import  { db } from '../../firebase';
import { routes } from '../../constants';

import EditProjectModal from './EditProjectModal';
import { Tasklists } from '../tasks';
import { Notes } from '../notes';
import { Timers } from '../timers';

const ProjectOverview = () => {
  return (
    <h1>Project Overview</h1>
  )
}

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: null,
      loading: false,
      activeItem: this.props.location.pathname.split('/')[3],
    }
  }

  componentDidMount() {
    this.onListenForProject();
  }

  onListenForProject = () => {
    this.setState({ loading: true });
    db.project(this.props.match.params.id)
      .on('value', snapshot => this.setState({ project: snapshot.val(), loading: false }))
  }

  componentWillUnmount() {
    db.project(this.props.match.params.id).off();
  }

  render() {
    const { project, loading, activeItem } = this.state;
    const { match, history } = this.props;
    return (
      <div>
        {loading && <Loader active />}
        {!project && <h2>Select a Project</h2>}
        {project &&
          <div>
            <h2 className="ui left floated header">{project.name}</h2>
            <EditProjectModal project={project} />
            <Divider clearing />
            <Menu pointing secondary>
              <Menu.Item name='overview' active={!activeItem}
                onClick={() => history.push(`${routes.PROJECTS}/${match.params.id}`)} />
              <Menu.Item name='tasks' active={activeItem === 'tasks'}
                onClick={() => history.push(`${routes.PROJECTS}/${match.params.id}/tasks`)} />
              <Menu.Item name='notes' active={activeItem === 'notes'}
                onClick={() => history.push(`${routes.PROJECTS}/${match.params.id}/notes`)}/>
              <Menu.Item name='timers' active={activeItem === 'timers'}
                onClick={() => history.push(`${routes.PROJECTS}/${match.params.id}/timers`)} />
            </Menu>
            <Switch>
              <Route exact path={routes.PROJECT} component={() => <ProjectOverview />} />
              <Route path={routes.PROJECT_TASKS} component={() => <Tasklists project_id={match.params.id} />} />
              <Route path={routes.PROJECT_NOTES} component={() => <Notes project_id={match.params.id} />} />
              <Route path={routes.PROJECT_TIMERS} component={() => <Timers project_id={match.params.id} />} />
            </Switch>
          </div>
        }
      </div>
    )
  }
}

export default withRouter(Project);
