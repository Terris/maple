import React, { Fragment, Component } from 'react';
import { db } from '../../firebase';
import { Loader, Message, Table } from 'semantic-ui-react';
import { mapped } from '../../helpers';
import Timer from './Timer';
import NewTimerModal from './NewTimerModal';

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
    db.timers().off();
  }

  render() {
    const { timers, error, loading } = this.state;

    return (
      <Fragment>
        {error && <Message warning>{error}</Message>}
        {loading && <Loader />}
        <Table>
          <Table.Body>
            {timers && timers.map(timer => {
              return <Timer key={timer.id} timer={timer} />
            })}
          </Table.Body>
        </Table>
        <NewTimerModal project_id={this.props.project_id} />
      </Fragment>
    )
  }
}

export default Timers;
