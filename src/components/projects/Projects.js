import React, { Component } from 'react';
import { Grid, Message, Loader, Segment, Header } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import Project from './Project';
import ProjectsMenu from './ProjectsMenu';
import ProjectsCards from './ProjectsCards';
import NewProjectModal from './NewProjectModal';
import { withAuthorization } from '../session';
import { db } from '../../firebase';
import { routes } from '../../constants';
import { mapped } from '../../helpers';


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
      .on('value', snapshot => this.setState({ projects: mapped.withId(snapshot.val()), loading: false }))
  };

  componentWillUnmount() {
    db.projects().off();
  }

  render() {
    const { projects, error, loading } = this.state;
    return (
      <div>
        {error && <Message warning>{error}</Message>}
        {loading && <Loader active />}
        <Grid stackable columns={2}>
          <Grid.Column width={4}>
            <ProjectsMenu projects={projects} />
            <NewProjectModal authUser={this.props.authUser} />
          </Grid.Column>
          <Grid.Column width={12}>
              {!projects.length &&
                <Segment placeholder>
                  <Header icon>
                    Add your first project.
                  </Header>
                  <Segment.Inline>
                    <NewProjectModal authUser={this.props.authUser} />
                  </Segment.Inline>
                </Segment>
              }
              <Switch>
                <Route exact path={routes.PROJECTS} component={() => <ProjectsCards projects={projects} />} />
                <Route path={routes.PROJECT} component={(props) => <Project {...props} />} />
              </Switch>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Projects);
