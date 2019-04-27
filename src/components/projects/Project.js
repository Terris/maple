import React, { Component } from 'react';
import { Loader, Divider, Tab } from 'semantic-ui-react';
import  { db } from '../../firebase';

import EditProjectModal from './EditProjectModal';
import { Tasklists } from '../tasks';
import { Notes } from '../notes';
import { Timers } from '../timers';

class Project extends Component {
  constructor(props) {
    super(props);

    this.state = {
      project: null,
      loading: false,
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

  renderTabs = () => {
    const panes = [
      { menuItem: 'Tasks', render: () => <Tab.Pane as="div"><Tasklists project_id={this.props.match.params.id} /></Tab.Pane> },
      { menuItem: 'Notes', render: () => <Tab.Pane as="div"><Notes project_id={this.props.match.params.id} /></Tab.Pane> },
      { menuItem: 'Timers', render: () => <Tab.Pane as="div"><Timers project_id={this.props.match.params.id} /></Tab.Pane> },
    ]
    return <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
  }

  render() {
    const { project, loading } = this.state;
    return (
      <div>
        {loading && <Loader active />}
        {!project && <h2>Select a Project</h2>}
        {project &&
          <div>
            <h2 className="ui left floated header">{project.name}</h2>
            <EditProjectModal project={project} project_id={this.props.match.params.id} />
            <Divider clearing />
            {this.renderTabs()}
          </div>
        }
      </div>
    )
  }
}

export default Project;
