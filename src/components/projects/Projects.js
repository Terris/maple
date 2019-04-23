import React, { Component } from 'react';
import { Grid, Message, Loader, Segment } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import NewProjectModal from './NewProjectModal';
import ProjectsMenu from './ProjectsMenu';
import Project from './Project';
import { withAuthorization } from '../session';
import { db } from '../../firebase';
import { routes } from '../../constants';

const ProjectPlaceholder = () => {
  return <h2>Select a project</h2>
}

class Projects extends Component {

  constructor(props) {
    super(props);
    this.state = {
      projects: {},
      error: null,
      loading: false,
    }
  }

  componentDidMount() {
    this.onListenForProjects();
  }

  onListenForProjects = () => {
    this.setState({ loading: true });
    db.projects()
      .orderByChild('user_id')
      .equalTo(this.props.authUser.uid)
      .on('value', snapshot => this.setState({ projects: snapshot.val(), loading: false }))
  };

  componentWillUnmount() {
    db.projects().off();
  }

  render() {
    const { projects, error, loading } = this.state;
    return (
      <div>
        <h1>Projects</h1>
        {error && <Message warning>{error}</Message>}
        {loading && <Loader />}
        <Grid stackable columns={2}>
          <Grid.Column width={4}>
            <ProjectsMenu projects={projects} />
            <NewProjectModal authUser={this.props.authUser} />
          </Grid.Column>
          <Grid.Column width={12}>
            <Segment>
              <Switch>
                <Route exact path={routes.PROJECT} component={(props) => <Project {...props} />} />
                <Route exact path={routes.PROJECTS} component={() => <ProjectPlaceholder />} />
              </Switch>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Projects);