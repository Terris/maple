import React, { Fragment, Component } from 'react';
import { db } from '../../firebase';
import { Loader, Message, Table, Segment, Header, Grid } from 'semantic-ui-react';
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

  totals = () => {
    let total = 0;
    let billableTotal = 0;
    for (let timer of this.state.timers) {
      total += timer.total_time;
      if ( timer.billable ) {
        billableTotal += timer.total_time;
      }
    }
    return parseFloat(billableTotal).toFixed(2) + " / " + parseFloat(total).toFixed(2) + " hrs";
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
            <Segment>
              <Grid>
                <Grid.Column width={7}>
                  Total:
                </Grid.Column>
                <Grid.Column width={4}>
                  {this.totals()}
                </Grid.Column>
              </Grid>
            </Segment>
            <NewTimerModal project_id={this.props.project_id} />
          </Fragment>
        }
      </Fragment>
    )
  }
}

export default Timers;
