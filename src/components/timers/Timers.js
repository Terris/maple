import React, { Fragment, Component } from 'react';
import { db } from '../../firebase';
import { Loader, Message, Button } from 'semantic-ui-react';
import { mapped } from '../../helpers';
import Timer from './Timer';

class Timers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timers: [],
      loading: false,
      error: null,
    }
  }

  componentDidMount() {
    this.onListenForTimers();
  }

  onListenForTimers = () => {
    this.setState({ loading: true });
    db.timers()
      .orderByChild('project_id')
      .equalTo(this.props.project_id)
      .on('value', snapshot => this.setState({ timers: mapped.withId(snapshot.val()), loading: false }))
  }

  componentWillUnmount() {
    db.tasklists().off();
  }

  render() {
    const { timers, error, loading } = this.state;

    return (
      <Fragment>
        {error && <Message warning>{error}</Message>}
        {loading && <Loader />}
        {timers && timers.map(timer => {
          return <Timer key={timer.id} timer={timer} />
        })}
        <Button color="green">Add New Timer</Button>
      </Fragment>
    )
  }
}

export default Timers;
