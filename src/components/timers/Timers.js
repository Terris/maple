import React, { Fragment, Component } from 'react';
import { db } from '../../firebase';
import { Loader, Message, Table, Segment, Header } from 'semantic-ui-react';
import { mapped, times } from '../../helpers';
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
    let lastHeader = null;
    return (
      <Fragment>
        {error && <Message warning>{error}</Message>}
        {loading && <Loader active />}
        {!timers.length &&
          <Segment placeholder>
            <Header icon>
              Add your first timer.
            </Header>
            <Segment.Inline>
              <NewTimerModal project_id={this.props.project_id} />
            </Segment.Inline>
          </Segment>
        }
        {!!timers.length &&
          <Fragment>
            <Table>
              <Table.Body>
                {timers.map(timer => {
                  let withHeader = (!lastHeader || lastHeader !== times.niceDate(timer.date)) ? true : false
                  lastHeader = times.niceDate(timer.date);
                  return <Timer key={timer.id} timer={timer} withHeader={withHeader} />
                })}
              </Table.Body>
            </Table>
            <NewTimerModal project_id={this.props.project_id} />
          </Fragment>
        }
      </Fragment>
    )
  }
}

export default Timers;