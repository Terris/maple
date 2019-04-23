import React, { Component, Fragment } from 'react';
import { Message, Loader, List, } from 'semantic-ui-react';
import { db } from '../../firebase';
import Tasklist from './Tasklist';
import NewTasklist from './NewTasklist';

class Tasklists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasklists: {},
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
      .on('value', snapshot => this.setState({ tasklists: snapshot.val(), loading: false }))
  }

  componentWillUnmount() {
    db.tasklists().off();
  }

  render () {
    const { tasklists, error, loading } = this.state;
    return (
      <Fragment>
        {error && <Message warning>{error}</Message>}
        {loading && <Loader />}
        <List>
          {tasklists && Object.keys(tasklists).map(key => {
            return <Tasklist key={key} tasklist_id={key} tasklist={tasklists[key]} />
          })}
          <NewTasklist project_id={this.props.project_id} />
        </List>
      </Fragment>
    )
  }
}

export default Tasklists;
