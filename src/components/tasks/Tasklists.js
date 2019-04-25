import React, { Component, Fragment } from 'react';
import { Message, Loader, List, Segment, Header, } from 'semantic-ui-react';
import { db } from '../../firebase';
import { mapped } from '../../helpers';
import Tasklist from './Tasklist';
import NewTasklist from './NewTasklist';

class Tasklists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasklists: [],
      error: null,
      loading: false,
    }
  }

  componentDidMount() {
    this.onListenForTasklists();
  }

  onListenForTasklists = () => {
    this.setState({ loading: true });
    db.tasklists()
      .orderByChild('project_id')
      .equalTo(this.props.project_id)
      .on('value', snapshot => this.setState({ tasklists:  mapped.withId(snapshot.val()), loading: false }))
    console.log(this.state.tasklists);
  }

  componentWillUnmount() {
    db.tasklists().off();
  }

  render () {
    const { tasklists, error, loading } = this.state;
    return (
      <Fragment>
        {error && <Message warning>{error}</Message>}
        {loading && <Loader active />}
        {!tasklists.length &&
          <Segment placeholder>
            <Header icon>
              Add your first tasklist.
            </Header>
            <NewTasklist project_id={this.props.project_id} />
          </Segment>
        }
        <List divided>
          {tasklists && tasklists.map(tasklist => {
            return <Tasklist key={tasklist.id} tasklist={tasklist} />
          })}
          <NewTasklist project_id={this.props.project_id} />
        </List>
      </Fragment>
    )
  }
}

export default Tasklists;
